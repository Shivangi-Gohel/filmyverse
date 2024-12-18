import React, { createContext, useState, useEffect } from 'react';
import Header from './Header.jsx';
import { Outlet } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase/firebase.jsx';
import { AuthProvider } from '../contexts/authContext/index.jsx';

const AppState = createContext();

function Layout({ children }) {
    const [login, setLogin] = useState(false);
    const [username, setUsername] = useState("");
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {

                setUser(user);
                setLogin(true);
                setUsername(user.displayName || user.email);
                console.log("User is signed in:", user);
            } else {
                setUser(null);
                setLogin(false);
                setUsername("");
                console.log("No user is signed in.");
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <AuthProvider>
            <AppState.Provider value={{ login, username, setLogin, setUsername }}>
                <div className="flex flex-col min-h-screen">
                    <Header />
                    <main className='flex-grow'>
                        <Outlet />
                    </main>
                    <Footer />
                </div>
            </AppState.Provider>
        </AuthProvider>
    );
}

export default Layout;
export { AppState };