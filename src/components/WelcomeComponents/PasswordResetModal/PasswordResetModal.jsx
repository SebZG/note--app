// import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

import './PasswordResetModal.css';

const PasswordResetModal = ({ show, handleClose, handleSubmit, handleCancel, handleInputChange, email, invalidEmail }) => {
    return (
        <Modal className="rest-password__modal" show={show} onHide={handleClose} backdrop="static" >
            <Modal.Header closeButton>
                <Modal.Title>Reset Email</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            onChange={handleInputChange}
                            value={email}
                            name="email"
                            type="email"
                            autoFocus
                        />
                        {invalidEmail && <Form.Text className="text-danger">Please enter your email</Form.Text>}
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCancel}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Submit
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default PasswordResetModal;
