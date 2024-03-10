import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import './PasswordResetConfirmationModal.css';

const PasswordResetConfirmationModal = ({ showPasswordResetConfirmation, handleClosePasswordResetConfirmation }) => {
  return (
    <Modal
      className="reset-password-confirmation__modal"
      show={showPasswordResetConfirmation}
      onHide={handleClosePasswordResetConfirmation}
      size="sm"
      backdrop="static"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Password reset sent!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        You should receive an email to reset your password shortly.
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClosePasswordResetConfirmation}>
          Ok
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PasswordResetConfirmationModal;