import { configureStore } from '@reduxjs/toolkit';

import { authSlice } from './auth/authSlice.js';
import { journalSlice } from './journal/journalSlice.js';

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        journal: journalSlice.reducer
    },
})