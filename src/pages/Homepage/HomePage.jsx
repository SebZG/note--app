import {
   getAuth,
   onAuthStateChanged,
   updateProfile
} from 'firebase/auth';
import {
   addDoc,
   collection,
   deleteDoc,
   doc,
   getDocs,
   query,
   updateDoc,
   where
} from 'firebase/firestore';

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import CreateNoteModal from '../../components/HomepageComponents/CreateNoteModal';
import NavbarComponent from "../../components/HomepageComponents/Navbar";
import CreateNoteButton from "../../components/HomepageComponents/CreateNoteButton";
import NotesList from "../../components/HomepageComponents/NotesList";
import UpdateNoteModal from '../../components/HomepageComponents/UpdateNoteModal';
import { db } from "../../firebase/init";
import FullPageLoader from '../../components/FullPageLoader';

import Col from 'react-bootstrap/Col';
import Container from "react-bootstrap/Container";
import Row from 'react-bootstrap/Row';

import './HomePage.css';

const auth = getAuth();
const user = auth.currentUser;

const HomePage = () => {
   // States
   const [isLoading, setIsLoading] = useState(true);
   const [notes, setNotes] = useState([]);
   const [showCreate, setShowCreate] = useState(false);
   const [newNote, setNewNote] = useState({ title: "", content: "", });
   const [showUpdate, setShowUpdate] = useState(false);
   const [updatedNote, setUpdatedNote] = useState({ title: "", content: "", });
   const [isTitleInvalid, setIsTitleInvalid] = useState(false);
   const [isContentInvalid, setIsContentInvalid] = useState(false);
   const [fistTimeLogin, setFistTimeLogin] = useState(true);
   const [userProfile, setUserProfile] = useState({});

   // Other hooks
   const navigate = useNavigate();

   // Helper functions/variables
   let invalidTitle = false;
   let invalidContent = false;

   const resetTitleInvalid = () => {
      setIsTitleInvalid(false);
   }

   const resetContentInvalid = () => {
      setIsContentInvalid(false);
   }

   const resetErrors = () => {
      resetTitleInvalid();
      resetContentInvalid();
   }

   // Event handlers
   const handleShowCreate = () => setShowCreate(true);
   const handleCloseCreate = () => {
      resetErrors();
      setShowCreate(false);
   };
   const handleDiscardCreate = () => {
      resetErrors();
      setNewNote({ title: "", content: "", });
      setShowCreate(false);
   };

   const handleShowUpdate = (id) => {
      setShowUpdate(true);
      const selectedNote = notes.find(note => note.id === id);
      setUpdatedNote(selectedNote);
   };
   const handleCloseUpdate = () => {
      resetErrors();
      setShowUpdate(false);
   };
   const handleDiscardUpdate = () => {
      resetErrors();
      setShowUpdate(false);
   };

   const handleCreateInputChange = (e) => {
      if (newNote.title.length >= 0) {
         resetTitleInvalid();
      }
      if (newNote.content.length >= 0) {
         resetContentInvalid();
      }
      const { name, value } = e.target;
      setNewNote({ ...newNote, [name]: value });
   };

   const handleUpdateInputChange = (e) => {
      if (updatedNote.title.length >= 0) {
         resetTitleInvalid();
      }
      if (updatedNote.content.length >= 0) {
         resetContentInvalid();
      }
      const { name, value } = e.target;
      setUpdatedNote({ ...updatedNote, [name]: value });
   };

   // Effects
   useEffect(() => {
      onAuthStateChanged(auth, (user) => {

         if (user && !user.emailVerified) {
            navigate("/");
         } else if (user && user.emailVerified) {
            navigate("/homepage");
            setUserProfile({
               displayName: user.displayName,
               email: user.email,
               photoURL: user.photoURL,
               emailVerified: user.emailVerified,
               uid: user.uid
            });
         } else {
            navigate("/");
         }

         getNotesByUid(user.uid);
         setInterval(() => {
            setIsLoading(false);
         }, 500);
      });
   }, []);

   // Firebase functions
   const getNotesByUid = async (uid) => {
      const postCollectionUidRef = query(collection(db, "posts"), where("uid", "==", uid));
      const { docs } = await getDocs(postCollectionUidRef);
      const notes = docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setNotes(notes);
   };

   const createNote = () => {

      if (!newNote.title) {
         invalidTitle = true;
      }
      if (!newNote.content) {
         invalidContent = true;
      }
      if (invalidTitle) {
         setIsTitleInvalid(invalidTitle);
         return;
      }
      if (invalidContent) {
         setIsContentInvalid(invalidContent);
         return;
      }

      const note = {
         ...newNote,
         uid: auth.currentUser.uid
      };
      addDoc(collection(db, "posts"), note)
         .then(() => getNotesByUid(auth.currentUser.uid));
      setNewNote({
         title: "",
         content: "",
      });
      handleCloseCreate();
   };

   const updateNote = async () => {

      if (!updatedNote.title) {
         invalidTitle = true;
      }
      if (!updatedNote.content) {
         invalidContent = true;
      }
      if (invalidTitle) {
         setIsTitleInvalid(invalidTitle);
         return;
      }
      if (invalidContent) {
         setIsContentInvalid(invalidContent);
         return;
      }

      const { id, ...rest } = updatedNote;
      const docRef = doc(db, "posts", id);
      await updateDoc(docRef, rest);
      await getNotesByUid(auth.currentUser.uid);
      handleCloseUpdate();
   };

   const deleteNote = async (id) => {
      const docRef = doc(db, "posts", id);
      await deleteDoc(docRef);
      const newNotes = notes.filter(note => note.id !== id);
      setNotes(newNotes);
   };

   return (
      <>

         <NavbarComponent />

         {isLoading && <FullPageLoader />}

         <Container className="homepage">
            <Row className="justify-content-center">
               <Col xs md="1"></Col>

               <Col md="10">
                  <p>{userProfile.displayName ? `Welcome, ${userProfile.displayName}` : `Welcome`}</p>

                  <CreateNoteButton handleShowCreate={handleShowCreate} />

                  {/* Notes List */}
                  <NotesList notes={notes} handleShowUpdate={handleShowUpdate} deleteNote={deleteNote} />
               </Col>

               <Col xs md="1"></Col>
            </Row>
         </Container>

         {/* Create Note Modal */}
         <CreateNoteModal {...{
            showCreate,
            handleCloseCreate,
            handleCreateInputChange,
            createNote,
            newNote,
            isTitleInvalid,
            isContentInvalid,
            handleDiscardCreate
         }} />

         {/* Update Note Modal */}
         <UpdateNoteModal {...{
            showUpdate,
            handleCloseUpdate,
            handleUpdateInputChange,
            updateNote,
            updatedNote,
            isTitleInvalid,
            isContentInvalid,
            handleDiscardUpdate
         }} />

      </>

   )
}
export default HomePage;