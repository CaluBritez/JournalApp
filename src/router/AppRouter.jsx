import { Routes, Route, Navigate } from 'react-router-dom';
import { useCheckAuth } from '../hooks/useCheckAuth.js';

import { AuthRoutes } from '../auth/routes/AuthRoutes.jsx';
import { JournalRoutes } from '../journal/routes/JournalRoutes.jsx';
import { CheckingAuth } from '../ui/components/CheckingAuth.jsx';


export const AppRouter = () => {

    const status  = useCheckAuth();

    if( status === 'checking' ){
        return <CheckingAuth />
    }
    console.log("soy el log principal: "+status);

    return (
        <Routes>

            {
            (status === "authenticated")
                ? <Route path="/*" element={<JournalRoutes />} />
                : <Route path="/auth/*" element={<AuthRoutes />} />
            }

            <Route path="/*" element={<Navigate to="/auth/login" />} />

        </Routes>

    )
}
