import {
   getAuth,
   onAuthStateChanged,
   reauthenticateWithCredential,
   sendPasswordResetEmail,
   updateProfile,
   verifyBeforeUpdateEmail
} from 'firebase/auth';

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AccountForm from '../../components/AccountComponents/AccountForm/AccountForm';
import PasswordResetConfirmationModal from '../../components/AccountComponents/PasswordResetConfirmationModal/PasswordResetConfirmationModal';
import ReauthenticationModal from '../../components/AccountComponents/ReauthenticationModal/ReauthenticationModal';
import ResetPasswordForm from '../../components/AccountComponents/ResetPasswordForm/ResetPasswordForm';
import FullPageLoader from '../../components/FullPageLoader';
import NavbarComponent from "../../components/HomepageComponents/Navbar";

import Col from 'react-bootstrap/Col';
import Container from "react-bootstrap/Container";
import Row from 'react-bootstrap/Row';

const auth = getAuth();
const user = auth.currentUser;

const Account = () => {
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
                  <AccountForm
                     updatedProfile={updatedProfile}
                     userProfile={userProfile}
                     handleProfileInputChange={handleProfileInputChange}
                     handleEditDisplayName={handleEditDisplayName}
                     handleEditEmail={handleEditEmail}
                     handleCancelDisplayName={handleCancelDisplayName}
                     handleCancelEmail={handleCancelEmail}
                     isDisplayNameReadOnly={isDisplayNameReadOnly}
                     isEmailReadOnly={isEmailReadOnly}
                     displayButton={displayButton}
                     emailButton={emailButton}
                     isInvalidDisplayName={isInvalidDisplayName}
                     isInvalidEmail={isInvalidEmail}
                  />

                  {/* Reset Password */}
                  <ResetPasswordForm
                     handleShowPasswordReset={handleShowPasswordReset}
                  />

               </Col>

               <Col xs md="1"></Col>
            </Row>
         </Container >

         {/* Password Reset Confirmation Modal */}
         <PasswordResetConfirmationModal
            showPasswordResetConfirmation={showPasswordResetConfirmation}
            handleClosePasswordResetConfirmation={handleClosePasswordResetConfirmation}
         />

         {/* Re-authentication Modal */}
         <ReauthenticationModal
            showReauthenticate={showReauthenticate}
            handleCloseReauthenticate={handleCloseReauthenticate}
            handleCancelReauthenticate={handleCancelReauthenticate}
            handleSubmitReauthenticate={handleSubmitReauthenticate}
            handleReauthenticateInputChange={handleReauthenticateInputChange}
            credentials={credentials}
            isInvalidPassword={isInvalidPassword}
            isInvalidEmail={isInvalidEmail}
         />
      </>
   )
}
export default Account;