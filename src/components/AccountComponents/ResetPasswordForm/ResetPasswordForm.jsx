import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import './ResetPasswordForm.css';

const ResetPasswordForm = ({ handleShowPasswordReset }) => {
  return (
    <Form className='mt-5 w-75 mx-auto'>
      <Form.Group>
        <Form.Label className="text-white mb-3"><b>Reset Password</b></Form.Label>
        <Form.Group>
          <Button
            onClick={handleShowPasswordReset}
            variant='outline-warning'
            className='w-100'>
            Send reset email
          </Button>
        </Form.Group>
      </Form.Group>
    </Form>
  );
};

export default ResetPasswordForm;