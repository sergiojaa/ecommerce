import axios from "axios";

export const checkTokenValidity = async (token: string): Promise<boolean> => {
    try {
        const res = await axios.get('http://localhost:3001/auth/check-token', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (res.status === 200) {
            return true
        } else {
            return false
        }
    } catch {
        return false;
    }
};
