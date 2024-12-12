import { useContext, useEffect, useState, createContext} from "react";
import { getAuth, onAuthStateChanged, setPersistence, browserLocalPersistence } from "firebase/auth";

const AuthContext = createContext();

// export function useAuth() {
//     return useContext(AuthContext);
// }

export function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState(null);
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const auth = getAuth();

    useEffect(() => {
        setPersistence(auth, browserLocalPersistence)
            .then(() => {

                const unsubscribe = onAuthStateChanged(auth, (user) => {
                    setUser(user);
                    console.log(user ? "User signed in:" : "User signed out:", user);
                });

                return () => unsubscribe();
            })
            .catch((error) => {
                console.error("Error setting persistence:", error);
            });
    },[auth])

    // async function initializeUser(user) {
    //     if(user) {
    //         setCurrentUser({...user});
    //         setUserLoggedIn(true);
    //     } else{
    //         setCurrentUser(null);
    //         setUserLoggedIn(false);
    //     }
    //     setLoading(false);
    // }

    // const value = {
    //     currentUser,
    //     userLoggedIn,
    //     loading
    // }

    return(
        <AuthContext.Provider value={{user}}>
            {children}
        </AuthContext.Provider>
    );
};
export const useAuth = () => useContext(AuthContext);