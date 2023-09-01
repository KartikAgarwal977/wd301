import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }: { children: React.JSX.Element }) {
    const authenticated = localStorage.getItem("authenticated");
    if (authenticated === 'true') {
        return <>
            {children}
        </>;
    } else {
        return <Navigate to="/signin" />;
    }
}
