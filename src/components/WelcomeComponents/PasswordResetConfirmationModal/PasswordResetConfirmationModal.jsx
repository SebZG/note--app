import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import './PasswordResetConfirmationModal.css';

const PasswordResetConfirmationModal = ({showPasswordReset, handleClosePasswordReset}) => {
   return (
      <Modal
         className="reset-password-confirmation__modal"
         show={showPasswordReset}
         onHide={handleClosePasswordReset}
         size="sm"
         backdrop="static"
         centered
      >
         <Modal.Header closeButton>
            <Modal.Title>Password reset sent!</Modal.Title>
         </Modal.Header>
         <Modal.Body>
            If an account exists with that email, you should receive an email to reset your password shortly.
         </Modal.Body>
         <Modal.Footer>
            <Button variant="secondary" onClick={handleClosePasswordReset}>
               Ok
            </Button>
         </Modal.Footer>
      </Modal>
   )
}
export default PasswordResetConfirmationModal;