import { Button, Form, Modal } from 'react-bootstrap';

const UpdateNoteModal = ({ showUpdate, handleCloseUpdate, handleUpdateInputChange, updateNote, updatedNote, isTitleInvalid, isContentInvalid, handleDiscardUpdate }) => {
   return (
      <Modal className="update-note__modal" show={showUpdate} onHide={handleCloseUpdate} backdrop="static" >
         <Modal.Header closeButton>
            <Modal.Title>Updating Note...</Modal.Title>
         </Modal.Header>
         <Modal.Body>
            <Form>
               <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                     onChange={handleUpdateInputChange}
                     value={updatedNote.title}
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
                     onChange={handleUpdateInputChange}
                     value={updatedNote.content}
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
               Cancel
            </Button>
            <Button variant="primary" onClick={updateNote}>
               Save
            </Button>
         </Modal.Footer>
      </Modal>
   );
};

export default UpdateNoteModal;
