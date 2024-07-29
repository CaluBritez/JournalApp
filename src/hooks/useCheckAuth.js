import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';


import { firebaseAuth } from '../firebase/config.js';
import { login, logout } from '../store/auth/authSlice.js';
import { startLoadingNotes } from '../store/journal/thunks.js';

export const useCheckAuth = () => {

    const {status} = useSelector( state => state.auth );

        const dispatch = useDispatch();

        useEffect(() => {
            
            onAuthStateChanged( firebaseAuth, async ( user ) => {
                if( !user ) return dispatch( logout() );

                const { uid, displayName, email, photoURL } = user;

                dispatch( login({ uid, displayName, email, photoURL }) );
                dispatch( startLoadingNotes());
                
            })
        }, [])
    
    return status;
}
