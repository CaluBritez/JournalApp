import { collection, doc, setDoc, deleteDoc } from 'firebase/firestore/lite';
import { firebaseDB } from '../../firebase/config.js';
import { addNewEmptyNote, setActiveNote, savingNewNote, setNotes, setSaving, updateNote, setPhotosToActiveNote, deleteNoteById } from './journalSlice.js';
import { loadNotes } from '../../helpers/loadNotes.js';
import { fileUpload } from '../../helpers/fileUpload.js';

export const startNewNote = () => {
    return async( dispatch, getState ) => {

        dispatch( savingNewNote() );

        const { uid } = getState().auth;

        const newNote = {   
            title: '',
            body: '',
            date: new Date().getTime(),
        }   

        const newDoc = doc(collection( firebaseDB, `${uid}/journal/notes`));

        await setDoc( newDoc, newNote );

        newNote.id = newDoc.id;
        
        dispatch( addNewEmptyNote( newNote ));
        dispatch( setActiveNote( newNote ));
    }
}

export const startLoadingNotes = () => {
    return async( dispatch, getState ) => {

        const { uid } = getState().auth;
        if ( !uid ) throw new Error('El UID del usuario no existe');

        const notes = await loadNotes( uid );

        dispatch( setNotes( notes ) );
    }
}

export const startSaveNote = () => {
    return async( dispatch, getState ) => {
        
        dispatch( setSaving() );

        const { uid } = getState().auth;
        const { active: note } = getState().journal;

        const noteToFireStore = { ...note };
        delete noteToFireStore.id;
        console.log(noteToFireStore);

        const docRef = doc( firebaseDB, `${uid}/journal/notes/${note.id}` );
        await setDoc( docRef, noteToFireStore, { merge: true });

        dispatch( updateNote( note ));
    }
}

export const startUploadingFiles = (files = []) => {
    return async( dispatch, getState ) => {
        dispatch( setSaving() );

        //await fileUpload( files[0] );
        const fileUploadPromises = [];

        for (const file of files) {
            fileUploadPromises.push( fileUpload( file ) );
        }

        const photosUrls = await Promise.all( fileUploadPromises );
        dispatch(setPhotosToActiveNote(photosUrls));
        
    }
}

export const startDeletingNote = () => {
    return async( dispatch, getState) => {

        const { uid } = getState().auth;
        const { active: note } = getState().journal;

        const docRef = doc( firebaseDB, `${ uid }/journal/notes/${ note.id }`);
        await deleteDoc( docRef );

        dispatch( deleteNoteById(note.id) );

    }
}