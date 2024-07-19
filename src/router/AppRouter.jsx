import { Routes, Route } from 'react-router-dom';

import { AuthRoutes } from '../auth/routes/AuthRoutes.jsx';
import { JournalRoutes } from '../journal/routes/JournalRoutes.jsx';

export const AppRouter = () => {
    return (
        <Routes>

            {/* Login y Registro */}
            <Route path="/auth/*" element={<AuthRoutes />} />

            {/* JournalApp */}
            <Route path="/*" element={<JournalRoutes />} />


        </Routes>

    )
}
