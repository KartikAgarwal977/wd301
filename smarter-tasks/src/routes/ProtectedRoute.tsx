import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children }: { children: React.JSX.Element }) {
    const {pathname} = useLocation()
    const authenticated = !!localStorage.getItem("authToken");
    if (authenticated) {
        return <>
            {children}
        </>;
    } else {
        return <Navigate to="/signin" replace state={{referrer: pathname}}/>;
    }
}
