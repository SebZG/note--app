// import { createContext, useContext, useEffect, useState } from "react";
// import { auth } from "../../firebase/init";
// import { onAuthStateChanged } from "firebase/auth";

// const AuthContext = createContext();

// export const useAuth = () => {
//    return useContext(AuthContext);
// }

// export const AuthProvider = ({ children }) => {
//    const [currentUser, setCurrentUser] = useState(null);
//    const [loggedIn, setLoggedIn] = useState(false);
//    const [loading, setLoading] = useState(true);

//    const values = {
//       currentUser,
//       loggedIn,
//       loading
//    }

//    const initializedUser = async (user) => {
//       if (user) {
//          setCurrentUser({ ...user });
//          setLoggedIn(true);
//       } else {
//          setCurrentUser(null);
//          setLoggedIn(false);
//       }
//       setLoading(false);
//    }

//    useEffect(() => {
//       const unSubscribe = onAuthStateChanged(auth, initializedUser);
//       return unSubscribe;
//    }, []);

//    return (
//       <AuthContext.Provider value={values}>
//          {!loading && children}
//       </AuthContext.Provider>
//    )
// }