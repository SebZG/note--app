import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import './CredentialsForm.css';

const CredentialForm = ({ userCredentials, selected, handleCredentials, handleLogin, handleSignup, error }) => {
   return (
      <Form className="d-flex flex-column">
         <Form.Group>
            <Form.Label className="text-primary"><b>Email</b></Form.Label>
            <Form.Control
               className="mb-3"
               value={userCredentials.email}
               type="email"
               name="email"
               placeholder="Enter Email..."
               onChange={(e) => handleCredentials(e)}
            />
         </Form.Group>
         <Form.Group>
            <Form.Label className="text-primary"><b>Password</b></Form.Label>
            <Form.Control
               className="mb-3"
               value={userCredentials.password}
               type="password"
               name="password"
               placeholder="Enter Password..."
               onChange={(e) => handleCredentials(e)}
            />
         </Form.Group>
         {selected === "Login" ?
            (
               <Button
                  className="d-block w-100 mb-3"
                  onClick={(e) => handleLogin(e)}
               >
                  Log In
               </Button>
            ) : (
               <Button
                  className="d-block w-100 mb-3"
                  onClick={(e) => handleSignup(e)}
               >
                  Sign Up
               </Button>
            )
         }

         {error && <div className="error text-center mb-3">{error}</div>}

      </Form>
   );
};

export default CredentialForm;