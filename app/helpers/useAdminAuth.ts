import axios from 'axios'

const useAdminAuth = async (): Promise<boolean> => {
    try {
        const token = localStorage.getItem('token')

        const response = await axios.get('http://localhost:3001/account', { headers: { Authorization: `Bearer ${token}` } })

        return response.data.admin;
    } catch (err) {
        return false
    }
}

export default useAdminAuth;