import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';

import { AuthRoutes } from '../auth/routes/AuthRoutes.jsx';
import { JournalRoutes } from '../journal/routes/JournalRoutes.jsx';
import { CheckingAuth } from '../ui/components/CheckingAuth.jsx';
import { firebaseAuth } from '../firebase/config.js';
import { login, logout } from '../store/auth/authSlice.js';


export const AppRouter = () => {

    const {status} = useSelector( state => state.auth );

    const dispatch = useDispatch();

    useEffect(() => {
        
        onAuthStateChanged( firebaseAuth, async ( user ) => {
            if( !user ) return dispatch( logout() );

            const { uid, displayName, email, photoURL } = user;

            dispatch( login({ uid, displayName, email, photoURL }) )
            
        })
    }, [])

    if( status === 'checking' ){
        return <CheckingAuth />
    }

    return (
        <Routes>

            {
            (status === 'authenticated')
                ? <Route path="/*" element={<JournalRoutes />} />
                : <Route path="/auth/*" element={<AuthRoutes />} />
            }

            <Route path="/*" element={<Navigate to="/auth/login" />} />

        </Routes>

    )
}
