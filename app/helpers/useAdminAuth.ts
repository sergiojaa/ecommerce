import axios from 'axios'

const useAdminAuth = async (): Promise<boolean> => {
    try {
        const token = localStorage.getItem('token')

        const response = await axios.get('https://trulaila-api-production.up.railway.app/account', { headers: { Authorization: `Bearer ${token}` } })

        return response.data.admin;
    } catch (err) {
        console.log(err)
        return false
    }
}

export default useAdminAuth;