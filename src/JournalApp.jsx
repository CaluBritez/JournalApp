import { AppRouter } from "./router/AppRouter";
import { AppTheme } from "./theme/AppTheme.jsx";


export const JournalApp = () => {
    return (
        <>
            <AppTheme>
                <AppRouter />
            </AppTheme>

        </>
    )
}