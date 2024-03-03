import { Button, Form, Modal } from 'react-bootstrap';

const CreateNoteModal = ({ showCreate, handleCloseCreate, handleCreateInputChange, createNote, newNote, isTitleInvalid, isContentInvalid, handleDiscardCreate }) => {
   return (
      <Modal className="create-note__modal" show={showCreate} onHide={handleCloseCreate} backdrop="static" >
         <Modal.Header closeButton>
            <Modal.Title>New Note</Modal.Title>
         </Modal.Header>
         <Modal.Body>
            <Form>
               <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                     onChange={handleCreateInputChange}
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
                     onChange={handleCreateInputChange}
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
               Save
            </Button>
         </Modal.Footer>
      </Modal>
   );
};

export default CreateNoteModal;
