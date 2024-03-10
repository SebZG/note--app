import {
   getAuth,
   onAuthStateChanged,
   updateProfile,
   updateEmail,
   sendEmailVerification,
   reauthenticateWithCredential,
   verifyBeforeUpdateEmail,
   signInWithEmailAndPassword,
   sendPasswordResetEmail,

} from 'firebase/auth';

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


import NavbarComponent from "../../components/HomepageComponents/Navbar";
import FullPageLoader from '../../components/FullPageLoader';


import Col from 'react-bootstrap/Col';
import Container from "react-bootstrap/Container";
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const auth = getAuth();
const user = auth.currentUser;

const Account = () => {
   // const auth = getAuth();
   // const user = auth.currentUser;

   // States
   const [showReauthenticate, setShowReauthenticate] = useState(false);
   const [credentials, setCredentials] = useState({ password: "", email: "" });
   const [isLoading, setIsLoading] = useState(true);
   const [displayButton, setDisplayButton] = useState("Edit");
   const [emailButton, setEmailButton] = useState("Edit");
   const [isDisplayNameReadOnly, setIsDisplayNameReadOnly] = useState(true);
   const [isEmailReadOnly, setIsEmailReadOnly] = useState(true);
   const [isInvalidDisplayName, setIsInvalidDisplayName] = useState(false);
   const [isInvalidPassword, setIsInvalidPassword] = useState(false);
   const [isInvalidEmail, setIsInvalidEmail] = useState(false);
   const [showPasswordResetConfirmation, setShowPasswordResetConfirmation] = useState(false);
   const [userProfile, setUserProfile] = useState({});
   const [updatedProfile, setUpdatedProfile] = useState({
      displayName: "",
      photoURL: "",
      email: "",
   });

   // Other hooks
   const navigate = useNavigate();

   // Helper functions/variables
   const resetInvalidDisplayName = () => {
      setIsInvalidDisplayName(false);
   }

   const resetInvalidEmail = () => {
      setIsInvalidEmail(false);
   }

   const resetInvalidPassword = () => {
      setIsInvalidPassword(false);
   }

   // Event handlers
   const handleProfileInputChange = (e) => {
      if (updatedProfile.displayName?.length >= 0) {
         resetInvalidDisplayName();
      }
      if (updatedProfile.email?.length >= 0) {
         resetInvalidEmail();
      }
      const { name, value } = e.target;
      setUpdatedProfile({ ...updatedProfile, [name]: value });
   }

   const handleEditDisplayName = () => {
      if (displayButton === "Edit") {
         setIsDisplayNameReadOnly(false);
         setDisplayButton("Save");
      } else if (displayButton === "Save") {
         if (!updatedProfile.displayName) {
            setIsInvalidDisplayName(true);
            return;
         }

         setIsDisplayNameReadOnly(true);
         setDisplayButton("Edit");
         setUserProfile({
            ...userProfile, displayName: updatedProfile.displayName
         });
         handleUpdateDisplayName();
      } else if (displayButton === "Cancel") {
         setIsDisplayNameReadOnly(true);
      }
   }

   const handleEditEmail = () => {
      if (emailButton === "Edit") {
         setIsEmailReadOnly(false);
         setEmailButton("Save");
      } else if (emailButton === "Save") {
         if (!updatedProfile.email) {
            setIsInvalidEmail(true);
            return;
         }

         setIsEmailReadOnly(true);
         // setEmailButton("Edit");
         setUserProfile({
            ...userProfile, email: updatedProfile.email
         });
         handleUpdateEmail();
      } else if (emailButton === "Cancel") {
         setIsEmailReadOnly(true);
      }
   }

   const handleCancelDisplayName = () => {
      resetInvalidDisplayName();
      setUpdatedProfile({
         ...updateProfile, displayName: ""
      });
      setDisplayButton("Edit");
      setIsDisplayNameReadOnly(true);
   }

   const handleCancelEmail = () => {
      resetInvalidEmail();
      setUpdatedProfile({
         ...updateProfile, email: ""
      });
      setEmailButton("Edit");
      setIsEmailReadOnly(true);
   }

   const handleReauthenticateInputChange = (e) => {
      if (credentials.email.length >= 0) {
         setIsInvalidEmail(false);
      }
      if (credentials.password.length >= 0) {
         setIsInvalidPassword(false);
      }

      const { name, value } = e.target;
      setCredentials({ ...credentials, [name]: value });
   }

   const handleShowReauthenticate = () => {
      setShowReauthenticate(true);
   }

   const handleCloseReauthenticate = () => {
      resetInvalidPassword();

      setCredentials({ password: "", email: "" });
      setShowReauthenticate(false);
   }

   const handleCancelReauthenticate = () => {
      resetInvalidPassword();

      setCredentials({ password: "", email: "" });
      setShowReauthenticate(false);
   }

   const handleSubmitReauthenticate = () => {
      if (!credentials.email) {
         setIsInvalidEmail(true);
         return;
      }
      if (!credentials.password) {
         setIsInvalidPassword(true);
         return;
      }

      reauthenticateWithCredential(user, credentials)
         .then(() => {
            console.log("User reauthenticated");
         }).catch((error) => {
            console.log(error);
         });

      // resetInvalidPassword();
      setCredentials({ password: "", email: "" });
      setShowReauthenticate(false);
      setEmailButton("Edit");
   }

   const handleShowPasswordReset = () => {
      sendPasswordResetEmail(auth, userProfile.email);

      setShowPasswordResetConfirmation(true);
   }
   
	const handleClosePasswordResetConfirmation = () => {
		setShowPasswordResetConfirmation(false);
	}


   // Effects
   useEffect(() => {
      onAuthStateChanged(auth, (user) => {

         if (user && !user.emailVerified) {
            navigate("/");
         } else if (user && user.emailVerified) {
            navigate("/account");
            setUserProfile({
               displayName: user?.displayName,
               email: user.email,
               photoURL: user.photoURL,
               emailVerified: user.emailVerified,
               uid: user.uid
            });
         } else {
            navigate("/");
         }

         setInterval(() => {
            setIsLoading(false);
         }, 500);
      });
   }, []);

   // Firebase functions
   const handleUpdateDisplayName = () => {
      updateProfile(auth.currentUser, { displayName: updatedProfile.displayName })
         .then(() => {
            console.log("Profile updated");
         })
         .catch((error) => {
            console.log(error);
         });
   }

   const handleUpdateEmail = () => {
      handleShowReauthenticate();

      verifyBeforeUpdateEmail(user, updatedProfile.email)
         .then(() => {
            console.log("Verification email sent to the new email address.");
         }).catch((error) => {
            console.log(error);
         });
   }

   return (
      <>

         <NavbarComponent />

         {isLoading && <FullPageLoader />}

         <Container className="homepage">
            <Row className="justify-content-center">
               <Col xs md="1"></Col>

               <Col md="10" className="bg-primary p-5">

                  <h2 className='text-center'>Account</h2>

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
                           {
                              displayButton === "Edit" ?
                                 <Button variant="outline-warning" onClick={handleEditDisplayName}>Edit</Button>
                                 :
                                 <div>
                                    <Button variant="outline-warning" onClick={handleEditDisplayName}>Save</Button>
                                    <Button variant="outline-warning" onClick={handleCancelDisplayName}>Cancel</Button>
                                 </div>
                           }
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
                           {
                              emailButton === "Edit" ?
                                 <Button variant="outline-warning" onClick={handleEditEmail}>Edit</Button>
                                 :
                                 <div>
                                    <Button variant="outline-warning" onClick={handleEditEmail}>Save</Button>
                                    <Button variant="outline-warning" onClick={handleCancelEmail}>Cancel</Button>
                                 </div>
                           }
                        </InputGroup>
                     </Form.Group>

                     {isInvalidEmail && <Form.Text className="text-danger">Email is required</Form.Text>}
                  </Form>

                  {/* Reset Password */}
                  <Form className='mt-5 w-75 mx-auto'>
                     <Form.Group>
                        <Form.Label className="text-white mb-3"><b>Reset Password</b></Form.Label>
                        <InputGroup>
                           <Button
                              onClick={handleShowPasswordReset}
                              variant='outline-warning'
                              className='w-100'>
                              Send reset email
                           </Button>
                        </InputGroup>
                     </Form.Group>
                  </Form>

               </Col>

               <Col xs md="1"></Col>
            </Row>
         </Container >


         {/* Password Reset Confirmation Modal */} 
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

         {/* Re-authentication Modal */}
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

                  {isInvalidPassword && <Form.Text className="text-danger">Enter Password</Form.Text>}

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
               <Button variant='secondary' onClick={handleCancelReauthenticate}>
                  Cancel
               </Button>
               <Button variant='primary' onClick={handleSubmitReauthenticate}>
                  Submit
               </Button>
            </Modal.Footer>
         </Modal>
      </>
   )
}
export default Account;