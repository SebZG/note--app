import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import './EmailVerificationModal.css';

const EmailVerificationModal = ({ showEmailVerification, handleCloseEmailVerification }) => {
   return (
      <Modal
         className="reset-password-confirmation__modal"
         show={showEmailVerification}
         onHide={handleCloseEmailVerification}
         size="sm"
         backdrop="static"
         centered
      >
         <Modal.Header closeButton>
            <Modal.Title>Email Verification</Modal.Title>
         </Modal.Header>
         <Modal.Body>
            If an account exists with that email, you should receive an email to verify your email shortly.
         </Modal.Body>
         <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseEmailVerification}>
               Ok
            </Button>
         </Modal.Footer>
      </Modal>
   )
}
export default EmailVerificationModal;