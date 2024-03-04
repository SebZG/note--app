import './PasswordReset.css'

const PasswordReset = ({ handlePasswordReset }) => {
   return (
      <p onClick={handlePasswordReset} className="text-center">forgot password?</p>
   );
};

export default PasswordReset;