import {
   createUserWithEmailAndPassword,
   onAuthStateChanged,
   sendPasswordResetEmail,
   signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../firebase/init";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import FullPageLoader from "../../components/FullPageLoader";
import AuthButtons from "../../components/WelcomeComponents/AuthButtons";
import CredentialForm from "../../components/WelcomeComponents/CredentialsForm";
import PasswordReset from "../../components/WelcomeComponents/PasswordReset";
import WelcomeHeader from "../../components/WelcomeComponents/WelcomeHeader";

import './Welcome.css';

const Welcome = () => {
   // States
   const [isLoading, setIsLoading] = useState(true);
   const [userCredentials, setUserCredentials] = useState({});
   const [selected, setSelected] = useState("Login");
   const [error, setError] = useState("");

   // Other hooks
   const navigate = useNavigate();

   // Event handlers
   const handleCredentials = (e) => {
      setError("");
      setUserCredentials({ ...userCredentials, [e.target.name]: e.target.value });
   };

   // Effects
   useEffect(() => {
      onAuthStateChanged(auth, (user) => {
         if (user) {
            navigate("/homepage");
         } else {
            navigate("/");
         }
         setInterval(() => {
            setIsLoading(false);
         }, 500);
      });
   }, []);

   // Firebase functions
   const handleSignup = (e) => {
      e.preventDefault();
      // setError("");
      createUserWithEmailAndPassword(auth, userCredentials.email, userCredentials.password)
         .then((userCred) => {
            // const user = userCred.user;
            // console.log(user);
            navigate("/homepage");
         })
         .catch((error) => {
            setError(error.code);
         });
   };

   const handleLogin = (e) => {
      e.preventDefault();
      // setError("");
      signInWithEmailAndPassword(auth, userCredentials.email, userCredentials.password)
         .then((userCred) => {
            // const user = userCred.user;
            // console.log(user);
            navigate("/homepage");
         })
         .catch((error) => {
            setError(error.code);
         });
   };

   const handlePasswordReset = () => {
      const email = prompt("Please enter your email");
      if (!email) return;
      sendPasswordResetEmail(auth, email);
      alert("Email sent! Check your inbox for further instructions.");
   };

   return (
      <Container>
         <Row>
            <Col>

               <div className="d-flex flex-column mx-auto my-5 align-items-center">

                  {isLoading && <FullPageLoader />}

                  <WelcomeHeader />

                  <AuthButtons selected={selected} setSelected={setSelected} />

                  <CredentialForm
                     selected={selected}
                     handleCredentials={handleCredentials}
                     handleLogin={handleLogin}
                     handleSignup={handleSignup}
                     error={error}
                  />

                  <PasswordReset handlePasswordReset={handlePasswordReset} />

               </div >

            </Col >
         </Row >
      </Container >
   )
}
export default Welcome;