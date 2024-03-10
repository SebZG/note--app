import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import './ReauthenticationModal.css';

const ReauthenticationModal = ({
   showReauthenticate,
   handleCloseReauthenticate,
   handleReauthenticateInputChange,
   handleSubmitReauthenticate,
   credentials,
   isInvalidEmail,
   isInvalidPassword,
}) => {
   return (
      <Modal className='reauthenticate__modal' show={showReauthenticate} onHide={handleCloseReauthenticate} backdrop="static">
         <Modal.Header closeButton>
            <Modal.Title>Enter Credentials</Modal.Title>
         </Modal.Header>
         <Modal.Body>
            <Form>
               <Form.Group className="mb-3" >
                  <Form.Label>Current Email</Form.Label>
                  <Form.Control
                     onChange={handleReauthenticateInputChange}
                     value={credentials.email}
                     name="email"
                     type="email"
                     autoFocus
                  />
               </Form.Group>

               {isInvalidEmail && <Form.Text className="text-danger">Enter Email</Form.Text>}

               <Form.Group className="mb-3" >
                  <Form.Label>Current Password</Form.Label>
                  <Form.Control
                     onChange={handleReauthenticateInputChange}
                     value={credentials.password}
                     name="password"
                     type="password"
                     autoFocus
                  />
               </Form.Group>

               {isInvalidPassword && <Form.Text className="text-danger">Enter Password</Form.Text>}

            </Form>
         </Modal.Body>
         <Modal.Footer>
            <Button variant='secondary' onClick={handleCloseReauthenticate}>
               Cancel
            </Button>
            <Button variant='primary' onClick={handleSubmitReauthenticate}>
               Submit
            </Button>
         </Modal.Footer>
      </Modal>
   );
};

export default ReauthenticationModal;