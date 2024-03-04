import Button from 'react-bootstrap/Button';

import './AuthButtons.css';

const AuthButtons = ({ selected, setSelected }) => {
   return (
      <div className="d-flex justify-content-evenly gap-5 mb-4">
         <Button
            className="login__btn"
            variant={`${selected === "Login" ? "outline-primary" : ""}`}
            onClick={() => setSelected("Login")}
         >
            Login
         </Button>
         <Button
            className="signup__btn"
            variant={`${selected === "Signup" ? "outline-primary" : ""}`}
            onClick={() => setSelected("Signup")}
         >
            Signup
         </Button>
      </div>
   )
}
export default AuthButtons;