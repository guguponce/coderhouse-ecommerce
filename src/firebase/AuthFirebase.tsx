// import { auth } from "./firebase";
// import {
//   Auth,
//   signOut,
//   onAuthStateChanged,
//   signInWithEmailAndPassword,
//   User,
// } from "firebase/auth";
// import { createContext, useEffect, useState } from "react";

// export const signIn = (email: string, password: string): Promise<string> => {
//   return signInWithEmailAndPassword(auth, email, password)
//     .then((userCredential) => {
//       const user = userCredential.user;

//       return user;
//     })
//     .then((user: User) => user.email)
//     .catch((error) => {
//       console.log(error.message);
//       return error.message;
//     });
// };

// export const logOut = () => {
//   signOut(auth);
// };

// export const AuthContext = createContext<iAuthContext>({
//   signIn,
//   logged: false,
//   logOut,
// });

// export default function AuthProvider({ children }: { children: JSX.Element }) {
//   const [logged, toggleLogged] = useState<boolean>(false);
//   const [userID, setUserID] = useState<string>("");

//   useEffect(() => {
//     onAuthStateChanged(auth, (user) => {
//       if (user) {
//         const uid = user.email;

//         toggleLogged(true);
//         setUserID(uid ? uid : "");
//         // ...
//       } else {
//         toggleLogged(false);
//         setUserID("");
//       }
//     });
//   }, []);
//   return (
//     <AuthContext.Provider value={{ signIn, logOut, logged, userID }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }
