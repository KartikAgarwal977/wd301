import React, { useEffect, useState } from "react";

const UserData: React.FC = () => {
    const [user, setuser] = useState({ id: "", name: "", email: "" });
    useEffect(() => {
        const userdata = localStorage.getItem("userData");
        if (userdata) {
            setuser(JSON.parse(userdata));
        }
    }, [])
    return (
        <>
            <p>User Name: { user.name}</p>
            <p>User id: { user.id}</p>
            <p>User email: { user.email}</p>
        </>
    )
}
export default UserData;