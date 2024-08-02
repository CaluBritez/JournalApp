import { signInWithGoogle, registerUserWhitEmailPassword, loginWithEmailPassword, logoutFirebase } from '../../firebase/providers.js';
import { checkingCredentials, logout, login } from './authSlice.js';
import { clearNotesLogout } from '../journal/journalSlice.js';

import { useNavigate } from 'react-router-dom';

export const checkingAuthentication = () => {

    return async( dispatch ) => {
        dispatch( checkingCredentials() );
    }
}

export const startGoogleSignIn = () => {

    return async( dispatch ) => {
        dispatch( checkingCredentials() );

        const result = await signInWithGoogle()

        if( !result.ok ) return dispatch( logout( result.errorMessage ) );

        dispatch( login( result ) );
        const navigate = useNavigate();
    }
}

export const startCreatingUserWithEmailPassword = ({ email, password, displayName }) => {

    return async( dispatch ) => {
        dispatch( checkingCredentials() );

        const { ok, uid, photoURL, errorMessage } = await registerUserWhitEmailPassword({ email, password, displayName });
        
        if( !ok ) return dispatch( logout({ errorMessage }) );

        dispatch( login({ uid, photoURL, email, displayName }) );
    }
}

export const startLoginWithEmailPassword = ({email, password}) => {

    return async( dispatch ) => {
        dispatch( checkingCredentials() );

        const result = await loginWithEmailPassword({email, password});
        console.log(result);


        if( !result.ok ) return dispatch( logout({ errorMessage: result.errorMessage }));    
        dispatch( login( result ) );
    }

}
export const startLogout = () => {
    return async( dispatch ) => {
        
        await logoutFirebase();

        dispatch( clearNotesLogout() );
        dispatch( logout() );

    }
}