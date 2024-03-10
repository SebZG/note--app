import {
	createUserWithEmailAndPassword,
	getAuth,
	onAuthStateChanged,
	sendEmailVerification,
	sendPasswordResetEmail,
	signInWithEmailAndPassword,
	signOut
} from "firebase/auth";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import FullPageLoader from "../../components/FullPageLoader";
import AuthButtons from "../../components/WelcomeComponents/AuthButtons";
import CredentialForm from "../../components/WelcomeComponents/CredentialsForm";
import EmailVerificationModal from "../../components/WelcomeComponents/EmailVerificationModal/EmailVerificationModal";
import PasswordReset from "../../components/WelcomeComponents/PasswordReset";
import PasswordResetConfirmationModal from "../../components/WelcomeComponents/PasswordResetConfirmationModal";
import PasswordResetModal from "../../components/WelcomeComponents/PasswordResetModal";
import WelcomeHeader from "../../components/WelcomeComponents/WelcomeHeader";

import './Welcome.css';

const auth = getAuth();
const user = auth.currentUser;

const Welcome = () => {
	// States
	const [isLoading, setIsLoading] = useState(true);
	const [userCredentials, setUserCredentials] = useState({ email: "", password: "" });
	const [selected, setSelected] = useState("Login");
	const [error, setError] = useState("");

	const [showPasswordReset, setShowPasswordReset] = useState(false);
	const [showEmailVerification, setShowEmailVerification] = useState(false);
	const [invalidEmail, setInvalidEmail] = useState(false);
	const [email, setEmail] = useState("");

	const [showPasswordResetConfirmation, setShowPasswordResetConfirmation] = useState(false);

	// Other hooks
	const navigate = useNavigate();

	// Event handlers
	const handleCredentials = (e) => {
		setError("");
		const { name, value } = e.target;
		setUserCredentials({ ...userCredentials, [name]: value });
	};

	const handleShowPasswordReset = () => {
		setShowPasswordReset(true);
	}

	const handleClosePasswordReset = () => {
		setInvalidEmail(false);
		setShowPasswordReset(false);
	}

	const handleCancelPasswordReset = () => {
		setInvalidEmail(false);
		setEmail("");
		setShowPasswordReset(false);
	}

	const handlePasswordResetInputChange = (e) => {
		setInvalidEmail(false);
		const { value } = e.target;
		setEmail(value);
	}

	const handleClosePasswordResetConfirmation = () => {
		setShowPasswordResetConfirmation(false);
	}

	const handleCloseEmailVerification = () => {
		setShowEmailVerification(false);
	}

	// Effects
	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user && !user.emailVerified) {
				// navigate("/");
				sendEmailVerification(user)
					.then(() => {
						setShowEmailVerification(true);
						signOut(auth);
					});

			} else if (user && user.emailVerified) {
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

		createUserWithEmailAndPassword(auth, userCredentials.email, userCredentials.password)
			.then((userCred) => {
				// const user = userCred.user;
				navigate("/homepage");
				setSelected("Login");
			})
			.catch((error) => {
				setError(error.code);
			});

	};

	const handleLogin = (e) => {
		e.preventDefault();

		signInWithEmailAndPassword(auth, userCredentials.email, userCredentials.password)
			.then((userCred) => {
				// const user = userCred.user;
				navigate("/homepage");
			})
			.catch((error) => {
				setError(error.code);
			});
	};

	const handleSubmitPasswordReset = () => {

		if (!email) {
			setInvalidEmail(true);
			return;
		}

		sendPasswordResetEmail(auth, email);
		setEmail({ email: "" });
		setShowPasswordReset(false);
		setShowPasswordResetConfirmation(true);
	}

	return (
		<>

			<Container>
				<Row>
					<Col>

						<div className="d-flex flex-column mx-auto my-5 align-items-center">

							{isLoading && <FullPageLoader />}

							<WelcomeHeader />

							<AuthButtons
								selected={selected}
								setSelected={setSelected}
							/>

							{/* Login / Signup form */}
							<CredentialForm
								userCredentials={userCredentials}
								selected={selected}
								handleCredentials={handleCredentials}
								handleLogin={handleLogin}
								handleSignup={handleSignup}
								error={error}
							/>

							<PasswordReset handleShowPasswordReset={handleShowPasswordReset} />

						</div >

					</Col >
				</Row >
			</Container >

			{/* Reset Password Modal */}
			<PasswordResetModal
				show={showPasswordReset}
				handleClose={handleClosePasswordReset}
				handleSubmit={handleSubmitPasswordReset}
				handleCancel={handleCancelPasswordReset}
				handleInputChange={handlePasswordResetInputChange}
				email={email}
				invalidEmail={invalidEmail}
			/>

			{/* Email Verification Modal */}
			<EmailVerificationModal
				showEmailVerification={showEmailVerification}
				handleCloseEmailVerification={handleCloseEmailVerification}
			/>

			{/* Password Reset Confirmation Modal */}
			<PasswordResetConfirmationModal
				showPasswordReset={showPasswordResetConfirmation}
				handleClosePasswordReset={handleClosePasswordResetConfirmation}
			/>

		</>

	)
}
export default Welcome;