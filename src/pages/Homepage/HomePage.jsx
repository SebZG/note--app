import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase/init";
import NavbarComponent from "../../components/Navbar/NavbarComponent";
import {
   onAuthStateChanged,
} from 'firebase/auth';
import {
   addDoc,
   collection,
   deleteDoc,
   doc,
   getDoc,
   getDocs,
   query,
   updateDoc,
   where
} from 'firebase/firestore';

import './HomePage.css';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Container from "react-bootstrap/Container";

const HomePage = () => {
   const [loading, setLoading] = useState(true);
   const [notes, setNotes] = useState([]);
   const [newNote, setNewNote] = useState({
      title: "",
      content: "",
   });

   const [showCreate, setShowCreate] = useState(false);
   const handleCloseCreate = () => setShowCreate(false);
   const handleShowCreate = () => setShowCreate(true);
   const handleDiscardCreate = () => {
      setNewNote({ title: "", content: "", });
      setShowCreate(false)
   };

   const [updatedNote, setUpdatedNote] = useState({
      title: "",
      content: "",
   });
   const [showUpdate, setShowUpdate] = useState(false);
   const handleCloseUpdate = () => setShowUpdate(false);
   const handleDiscardUpdate = () => {
      setNewNote({ title: "", content: "", });
      setShowUpdate(false);
   };
   const handleShowUpdate = (id) => {
      setShowUpdate(true);
      getNoteById(id);
   };
   // const handleShowUpdate = (id) => {
   //    setShowUpdate(true);
   //    const selectedNote = notes.find(note => note.id === id);
   //    setNewNote(selectedNote); // Set the selected note to the newNote state
   // };
   
   const [isTitleInvalid, setIsTitleInvalid] = useState(false);
   const [isContentInvalid, setIsContentInvalid] = useState(false);

   const navigate = useNavigate();

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

   const handleInputChange = (e) => {
      const { name, value } = e.target;
      setNewNote({ ...newNote, [name]: value });
   };

   const getNotesByUid = async (uid) => {
      const postCollectionUidRef = await query(
         collection(db, "posts"),
         where("uid", "==", uid)
      );
      const { docs } = await getDocs(postCollectionUidRef);
      const notes = docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setNotes(notes);
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

   const getNoteById = async (id) => {
      const docRef = doc(db, "posts", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
         const post = docSnap.data();
         console.log(post);
         // setUpdatedNote(post);
         // console.log(updatedNote);
      }
   };

   const updateNote = async (id) => {
      const docRef = doc(db, "posts", id);
      const note = await getNoteById(id);
      // const newNote = {|
      //    ...note,
      //    title: "This is an update!",
      //    // content: "I updated this post!"
      // };
      // console.log(newNote);
      setUpdatedNote({
         ...note,
      })
      updateDoc(docRef, updatedNote);
      getNotesByUid(auth.currentUser.uid);
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
                  <Row xs={1} md={2} className="g-4">
                     {notes.map((note, i) => {
                        // console.log(note)
                        return (
                           <Col key={i}>
                              <Card bg={"warning"} style={{ width: '18rem', height: '14rem', margin: "1rem auto" }}>
                                 <Card.Body >
                                    <div className="d-flex justify-content-between">
                                       <Card.Title className="note-title">{note.title}</Card.Title>
                                       <div className="d-flex">
                                          <i onClick={() => handleShowUpdate(note.id)} className="fa-solid fa-pen-nib me-2"></i>
                                          <i onClick={() => deleteNote(note.id)} className="fa-regular fa-trash-can"></i>
                                       </div>
                                    </div>
                                    <hr />
                                    <Card.Text className="note-content">{note.content}</Card.Text>
                                 </Card.Body>
                              </Card>
                           </Col>
                        )
                     })}
                  </Row>
               </Col>

               <Col xs md="1"></Col>
            </Row>
         </Container>

         {/* Create Note Modal */}
         <Modal className="create-note__modal" show={showCreate} onHide={handleCloseCreate} backdrop="static" >
            <Modal.Header closeButton>
               <Modal.Title>New Note</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <Form>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                     <Form.Label>Title</Form.Label>
                     <Form.Control
                        onChange={handleInputChange}
                        value={newNote.title}
                        name="title"
                        type="text"
                        autoFocus
                     />
                     {isTitleInvalid && <Form.Text className="text-danger">Title is required</Form.Text>}
                  </Form.Group>
                  <Form.Group
                     className="mb-3"
                     controlId="exampleForm.ControlTextarea1"
                  >
                     <Form.Label>Content</Form.Label>
                     <Form.Control
                        onChange={handleInputChange}
                        value={newNote.content}
                        name="content"
                        as="textarea"
                        rows={3}
                     />
                     {isContentInvalid && <Form.Text className="text-danger">Content is required</Form.Text>}
                  </Form.Group>
               </Form>
            </Modal.Body>
            <Modal.Footer>
               <Button variant="secondary" onClick={handleDiscardCreate}>
                  Discard
               </Button>
               <Button variant="primary" onClick={createNote}>
                  Save Note
               </Button>
            </Modal.Footer>
         </Modal>

         {/* Update Note Modal */}
         <Modal className="update-note__modal" show={showUpdate} onHide={handleCloseUpdate} backdrop="static" >
            <Modal.Header closeButton>
               <Modal.Title>Updating Note...</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <Form>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                     <Form.Label>Title</Form.Label>
                     <Form.Control
                        onChange={handleInputChange}
                        value={newNote.title}
                        name="title"
                        type="text"
                        autoFocus
                     />
                     {isTitleInvalid && <Form.Text className="text-danger">Title is required</Form.Text>}
                  </Form.Group>
                  <Form.Group
                     className="mb-3"
                     controlId="exampleForm.ControlTextarea1"
                  >
                     <Form.Label>Content</Form.Label>
                     <Form.Control
                        onChange={handleInputChange}
                        value={newNote.content}
                        name="content"
                        as="textarea"
                        rows={3}
                     />
                     {isContentInvalid && <Form.Text className="text-danger">Content is required</Form.Text>}
                  </Form.Group>
               </Form>
            </Modal.Body>
            <Modal.Footer>
               <Button variant="secondary" onClick={handleDiscardUpdate}>
                  Discard
               </Button>
               <Button variant="primary" onClick={updateNote}>
                  Save Note
               </Button>
            </Modal.Footer>
         </Modal>

      </>

   )
}
export default HomePage;