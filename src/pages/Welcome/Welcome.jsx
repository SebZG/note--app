import {
   createUserWithEmailAndPassword,
   onAuthStateChanged,
   sendPasswordResetEmail,
   signInWithEmailAndPassword,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/init";
import './Welcome.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Welcome = () => {
   const [userCredentials, setUserCredentials] = useState({});
   const [selected, setSelected] = useState("Login");
   const [error, setError] = useState("");

   const navigate = useNavigate();

   const handleCredentials = (e) => {
      setUserCredentials({ ...userCredentials, [e.target.name]: e.target.value });
   }

   const handleSignup = (e) => {
      e.preventDefault();
      setError("");
      createUserWithEmailAndPassword(auth, userCredentials.email, userCredentials.password)
         .then((userCred) => {
            const user = userCred.user;
            navigate("/homepage");
         })
         .catch((error) => {
            setError(error.code);
         });
   };

   const handleLogin = (e) => {
      e.preventDefault();
      setError("");
      signInWithEmailAndPassword(auth, userCredentials.email, userCredentials.password)
         .then((userCred) => {
            const user = userCred.user;
            console.log(user);
            navigate("/homepage");
         })
         .catch((error) => {
            setError(error.code);
         });
   };

   // const handlePasswordReset = () => {
   //    const email = prompt("Please enter your email");
   //    if (!email) return;
   //    sendPasswordResetEmail(auth, email);
   //    alert("Email sent! Check your inbox for further instructions.");
   // }

   useEffect(() => {
      onAuthStateChanged(auth, (user) => {
         if (user) {
            navigate("/homepage");
         } else {
            navigate("/")
         }
      });
   }, []);

   return (
      <Container>
         <Row>
            <Col>

               <div className="d-flex flex-column mx-auto align-items-center ">

                  <h1 className="text-center my-5 text-warning" >Notes App</h1>

                  <div className="d-flex justify-content-evenly gap-5 mb-4">
                     <Button className="login__btn" variant={`${selected === "Login" ? "outline-primary" : ""}`} onClick={() => setSelected("Login")}
                     >
                        Login
                     </Button>
                     <Button className="signup__btn" variant={`${selected === "Signup" ? "outline-primary" : ""}`} onClick={() => setSelected("Signup")}
                     >
                        Signup
                     </Button>
                  </div>

                  <Form className="d-flex flex-column">
                     <Form.Group>
                        <Form.Label className="text-primary"><b>Email</b></Form.Label>
                        <Form.Control className=" mb-3" type="email" name="email" onChange={(e) => handleCredentials(e)} placeholder="Enter Email..." />
                     </Form.Group>
                     <Form.Group>
                        <Form.Label className="text-primary"><b>Password</b></Form.Label>
                        <Form.Control className=" mb-3" type="password" name="password" onChange={(e) => handleCredentials(e)} placeholder="Enter Password..." />
                     </Form.Group>
                     {selected === "Login" ?
                        (
                           <Button className="d-block w-100 mb-3" onClick={(e) => handleLogin(e)}
                           >
                              Log In
                           </Button>
                        ) : (
                           <Button className="d-block w-100 mb-3" onClick={(e) => handleSignup(e)}
                           >
                              Sign Up
                           </Button>
                        )
                     }

                     {error && <div className="error mb-3">{error}</div>}

                     {/* <p onClick={handlePasswordReset} className="forgot-password">forgot password?</p> */}

                  </Form>

               </div>

            </Col>
         </Row>
      </Container>
   )
}
export default Welcome;