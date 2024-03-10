import React from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

import './AccountForm.css';

const AccountForm = ({
  updatedProfile,
  userProfile,
  handleProfileInputChange,
  handleEditDisplayName,
  handleEditEmail,
  handleCancelDisplayName,
  handleCancelEmail,
  isDisplayNameReadOnly,
  isEmailReadOnly,
  displayButton,
  emailButton,
  isInvalidDisplayName,
  isInvalidEmail,
}) => {
  return (
    <>
      {/* Update Display Name Form */}
      <Form className='mt-5 w-75 mx-auto'>
        <Form.Group>
          <Form.Label className="text-white mb-3"><b>Display Name</b></Form.Label>
          <InputGroup>
            <Form.Control
              className="displayName-input"
              value={updatedProfile.displayName}
              type="displayName"
              name="displayName"
              placeholder={userProfile.displayName}
              onChange={(e) => handleProfileInputChange(e)}
              readOnly={isDisplayNameReadOnly}
            />
            {displayButton === "Edit" ? (
              <Button variant="outline-warning" onClick={handleEditDisplayName}>Edit</Button>
            ) : (
              <div>
                <Button variant="outline-warning" onClick={handleEditDisplayName}>Save</Button>
                <Button variant="outline-warning" onClick={handleCancelDisplayName}>Cancel</Button>
              </div>
            )}
          </InputGroup>
        </Form.Group>

        {isInvalidDisplayName && <Form.Text className="text-danger">Display name is required</Form.Text>}
      </Form>

      {/* Update Email Form */}
      <Form className='mt-5 w-75 mx-auto'>
        <Form.Group>
          <Form.Label className="text-white mb-3"><b>Email</b></Form.Label>
          <InputGroup>
            <Form.Control
              className="email-input"
              value={updatedProfile.email}
              type="email"
              name="email"
              placeholder={userProfile.email}
              onChange={(e) => handleProfileInputChange(e)}
              readOnly={isEmailReadOnly}
            />
            {emailButton === "Edit" ? (
              <Button variant="outline-warning" onClick={handleEditEmail}>Edit</Button>
            ) : (
              <div>
                <Button variant="outline-warning" onClick={handleEditEmail}>Save</Button>
                <Button variant="outline-warning" onClick={handleCancelEmail}>Cancel</Button>
              </div>
            )}
          </InputGroup>
        </Form.Group>

        {isInvalidEmail && <Form.Text className="text-danger">Email is required</Form.Text>}
      </Form>
    </>
  );
};

export default AccountForm;