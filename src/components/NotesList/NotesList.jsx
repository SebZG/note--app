import { Card, Col, Row } from 'react-bootstrap';

const NoteList = ({ notes, handleShowUpdate, deleteNote }) => {
   return (
      <Row xs={1} md={2} className="g-4">
         {notes.map((note, i) => (
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
         ))}
      </Row>
   );
};

export default NoteList;
