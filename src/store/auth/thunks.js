import { signInWithGoogle, registerUserWhitEmailPassword } from '../../firebase/providers.js';
import { checkingCredentials, logout, login } from './authSlice.js';

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
    }
}

export const startCreatingUserWithEmailPassword = ({ email, password, displayName }) => {

    return async( dispatch ) => {
        dispatch( checkingCredentials() );

        const resp = await registerUserWhitEmailPassword({ email, password, displayName });
        console.log(resp);
    }
}
