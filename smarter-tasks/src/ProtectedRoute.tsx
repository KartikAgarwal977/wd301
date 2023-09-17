import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }: { children: React.JSX.Element }) {
    const authenticated = !!localStorage.getItem("authToken");
    if (authenticated) {
        return <>
            {children}
        </>;
    } else {
        return <Navigate to="/signin" />;
    }
}
