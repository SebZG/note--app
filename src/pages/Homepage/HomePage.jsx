import {
   onAuthStateChanged,
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
import NavbarComponent from "../../components/Navbar";
import NotesList from "../../components/NotesList";
import { auth, db } from "../../firebase/init";

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from "react-bootstrap/Container";
import Row from 'react-bootstrap/Row';

import CreateNoteModal from '../../components/CreateNoteModal';
import UpdateNoteModal from '../../components/UpdateNoteModal';
import './HomePage.css';

const HomePage = () => {
   const [loading, setLoading] = useState(true);
   const [notes, setNotes] = useState([]);
   const [newNote, setNewNote] = useState({ title: "", content: "", });
   const [showCreate, setShowCreate] = useState(false);
   const [updatedNote, setUpdatedNote] = useState({ title: "", content: "", });
   const [showUpdate, setShowUpdate] = useState(false);
   const [isTitleInvalid, setIsTitleInvalid] = useState(false);
   const [isContentInvalid, setIsContentInvalid] = useState(false);
   const navigate = useNavigate();

   const handleCloseCreate = () => setShowCreate(false);
   const handleShowCreate = () => setShowCreate(true);
   const handleDiscardCreate = () => {
      setNewNote({ title: "", content: "", });
      setShowCreate(false)
   };

   const handleCloseUpdate = () => setShowUpdate(false);
   const handleDiscardUpdate = () => {
      setShowUpdate(false);
   };
   const handleShowUpdate = (id) => {
      setShowUpdate(true);
      const selectedNote = notes.find(note => note.id === id);
      setUpdatedNote(selectedNote);
   };


   useEffect(() => {
      onAuthStateChanged(auth, (user) => {
         setLoading(false);
         if (!user) {
            navigate("/");
         } else {
            navigate("/homepage");
         }
         getNotesByUid(user.uid);
      });
   }, []);

   const getNotesByUid = async (uid) => {
      const postCollectionUidRef = query(collection(db, "posts"), where("uid", "==", uid));
      const { docs } = await getDocs(postCollectionUidRef);
      const notes = docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setNotes(notes);
   };

   const handleUpdateInputChange = (e) => {
      const { name, value } = e.target;
      setUpdatedNote({ ...updatedNote, [name]: value });
   };

   const handleCreateInputChange = (e) => {
      const { name, value } = e.target;
      setNewNote({ ...newNote, [name]: value });
   };

   const createNote = () => {
      let isTitleInvalid = false;
      let isContentInvalid = false;

      if (!newNote.content) {
         isContentInvalid = true;
      }
      if (!newNote.title) {
         isTitleInvalid = true;
      }

      if (isTitleInvalid || isContentInvalid) {
         setIsTitleInvalid(isTitleInvalid);
         setIsContentInvalid(isContentInvalid);
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
      let isTitleInvalid = false;
      let isContentInvalid = false;

      if (!updatedNote.content) {
         isContentInvalid = true;
      }
      if (!updatedNote.title) {
         isTitleInvalid = true;
      }

      if (isTitleInvalid || isContentInvalid) {
         setIsTitleInvalid(isTitleInvalid);
         setIsContentInvalid(isContentInvalid);
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

         <Container className="homepage">
            <Row className="justify-content-center">
               <Col xs md="1"></Col>

               <Col md="10">
                  <p>{loading ? "Loading..." : `Hello: ${auth.currentUser.email}`}</p>

                  <div className="create-note__btn-wrapper mb-5">
                     <Button onClick={handleShowCreate} variant="outline-primary" >
                        Create Post
                     </Button>
                  </div>

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