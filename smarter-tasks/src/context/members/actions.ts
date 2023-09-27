import { API_ENDPOINT } from '../../config/constants';
export const fetchUsers = async (dispatch: any) => {
  const token = localStorage.getItem("authToken") ?? "";
    try {
        dispatch({ type: "FETCH_USERS_REQUEST" });
        const response = await fetch(`${API_ENDPOINT}/users`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', "Authorization": `Bearer ${token}` },
        
        })
        const data = await response.json();
        dispatch({ type: "FETCH_USERS_SUCCESS", payload: data });
    } catch (err) {
        console.error("Error in getting user", err);
        dispatch({ type: "FETCH_USERS_FAILURE", payload: 'Unable to load projects' });
        
    }  
}
export const addUser = async (dispatch: any, args: any) => {
    try {
        const token = localStorage.getItem("authToken") ?? "";
        const response = await fetch(`${API_ENDPOINT}/users`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', "Authorization": `Bearer ${token}` },
            body: JSON.stringify(args),
        })
        if (!response.ok) {
            throw new Error('Failed to create project');
        }
        const data = await response.json();
        if (data.errors && data.error.length > 0) {
            return { ok: false, error: data.error[0].message }
        }
        dispatch({ type: "ADD_USERS_SUCCESS" });
        return { ok: true }
    }
    catch (err) {
        console.log(`addUser failed with the following errors :${JSON.stringify(err)}`);
        return { ok: false, err }
    }
};

export const deleteUser = async (dispatch: any, id: number) => {
    const token = localStorage.getItem('authToken') ?? "";
    try {
        dispatch({ type: "DELETE_USER_REQUEST" })
        const res = await fetch(`${API_ENDPOINT}/users/${id}`, {
            method: 'delete',
            headers: {
                'content-type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        if (!res.ok) {
            throw new Error("Failed to delete user");
        }

        dispatch({ type: "DELETE_USER_SUCCESS", payload: id });
        return { ok: true };

    }
    catch (err) {
        console.error('Operation failed:', err);
        // Dialogue 5: And for error I'll return status called "ok", with value `false`.
        return { ok: false, err }
    }
};