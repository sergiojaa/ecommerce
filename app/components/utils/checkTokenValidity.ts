import axios from "axios";

export const checkTokenValidity = (token: string): boolean => {
    axios.get('http://localhost:3001/auth/check-token', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .then((res) => {
            if (res.data.validity === "false") {
                return false
            }

            if (res.data.validity === "true") {
                return true
            }

        })
        .catch((err) => {
            console.log(err)
            return false
        })
    return true
};
