import './PasswordReset.css'

const PasswordReset = ({ handleShowPasswordReset }) => {
   return (
      <p onClick={handleShowPasswordReset} className="forgot-password text-center">forgot password?</p>
   );
};

export default PasswordReset;