import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { auth, db } from './firebase/init';
import HomePage from './pages/Homepage/HomePage';
import Welcome from './pages/Welcome/Welcome';


function App() {
  // const [user, setUser] = useState({});
  // const [loading, setLoading] = useState(true);

  // // CRUD OPERATIONS

  // const getAllPosts = async () => {
  //   const { docs } = await getDocs(collection(db, "posts"));
  //   console.log(docs);
  //   const posts = docs.map(doc => ({ ...doc.data(), id: doc.id }));
  //   console.log(posts);
  // }

  // const createPost = () => {
  //   const post = {
  //     title: "This is my fifth post",
  //     content: "Yeahh!",
  //     uid: user.uid
  //   };
  //   addDoc(collection(db, "posts"), post)
  // }

  // const updatePost = async (id) => {
  //   const hardCodedId = ""
  //   const docRef = doc(db, "posts", hardCodedId);
  //   const post = await getPostById(hardCodedId);
  //   console.log(post);
  //   const newPost = {
  //     ...post,
  //     title: "This is my updated post again!",
  //     // content: "I updated this post!"
  //   };
  //   console.log(newPost);
  //   updateDoc(docRef, newPost);
  // }

  // const getPostById = async (id) => {
  //   // const hardCodedId = ""
  //   const docRef = doc(db, "posts", id);
  //   // console.log(docRef);
  //   const docSnap = await getDoc(docRef);

  //   if (docSnap.exists()) {
  //     const post = docSnap.data();
  //     console.log(post);
  //   }
  // }

  // const getPostByUid = async (uid) => {
  //   const postCollectionUidRef = await query(
  //     collection(db, "posts"),
  //     where("uid", "==", uid)
  //   );
  //   const { docs } = await getDocs(postCollectionUidRef);
  //   // console.log(docs);
  //   const posts = docs.map(doc => ({ ...doc.data(), id: doc.id }));
  //   console.log(posts);
  // }

  // const deletePost = async (id) => {
  //   const hardCodedId = ""
  //   const docRef = doc(db, "posts", hardCodedId);
  //   await deleteDoc(docRef);
  // }

  // // AUTHENTICATION METHODS
  // const register = () => {
  //   // const [email, setEmail ] = useState("");

  //   console.log("register");
  //   createUserWithEmailAndPassword(auth, "email@email.com", "email123")
  //     .then(userCredentials => {
  //       console.log(userCredentials);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     })
  // }

  // const logIn = () => {
  //   console.log("login");

  //   signInWithEmailAndPassword(auth, "email@email.com", "email123")
  //     .then(({ user }) => {
  //       setUser(user);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     })
  // }

  // const logOut = () => {
  //   signOut(auth);
  //   setUser({});
  // }

  // // TRACK USERS SIGNED IN STATE
  // useEffect(() => {
  //   onAuthStateChanged(auth, user => {
  //     setLoading(false); 
  //     if (user) {
  //       setUser(user);
  //     }
  //   })
  // }, []);

  return (
    <div className='App'>
      {/* <button onClick={register}>Register</button>
      <button onClick={logIn}>Login</button>
      <button onClick={logOut}>Logout</button>
      <p>
        {loading ? "Loading..." : user.email}
      </p>
      <button onClick={createPost}>Create Post</button>
      <button onClick={getAllPosts}>Get All Posts</button>
      <button onClick={getPostById}>Get Post By Id</button>
      <button onClick={getPostByUid}>Get Post By Uid</button>
      <button onClick={updatePost}>Update Post</button>
      <button onClick={deletePost}>Delete Post</button> */}
      <Router>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/homepage" element={<HomePage />} />
        </Routes>
      </Router>
    </div>

  )
}

export default App
