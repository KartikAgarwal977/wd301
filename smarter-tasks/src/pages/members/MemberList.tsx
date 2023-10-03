import React, { useEffect } from "react";
import { useMembersDispatch } from "../../context/members/context";
import { fetchUsers } from "../../context/members/actions";
import MemberListItems from "./MemberListItems";

const MemberList: React.FC = () => {
    const dispatchMember = useMembersDispatch();
    useEffect(() => {
        fetchUsers(dispatchMember);
    }, []);
    return (
        <div>
            <MemberListItems />
        </div>
    )
}
export default MemberList;