import axios from "axios"
import toast from "react-hot-toast"

export const getAllCoaches = async () => {
    const Token = localStorage.getItem('token')
    try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/admin/coach`, {
            headers: {
                'Authorization': `Bearer ${Token}`
            }
        });
        if (res.data.success == true) {
            // toast.success(res.data?.message || 'Password Update Successfully');
            return res.data.data
        }
    } catch (err) {
        toast.error(err.response?.data?.message)
    }
}


export const addNewCoach = async (data) => {

    const Token = localStorage.getItem('token');
    if (data && Token) {
        try {
            const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/admin/coach`, data, {
                headers: {
                    'Authorization': `Bearer ${Token}`
                }
            })
            if (res.data.success == true) {
                toast.success(res.data?.message || 'Coach Added succesfully');
                return res.data.data;
            }
        } catch (err) {
            return err.response?.data?.errors;

            // toast.error(err.response?.data?.message || 'Unexpected Error Occured');
        }
    }
}


export const deleteCoach = async (id) => {
    const Token = localStorage.getItem('token')
    if (id && Token) {
        try {
            const res = axios.delete(`${import.meta.env.VITE_BASE_URL}/admin/coach/${id}`, {
                headers: {
                    'Authorization': `Bearer ${Token}`
                }
            });
            toast.success(res.data?.message || 'Coach Deleted Successfully');
            return res.data
        } catch (err) {
            console.log(err.response.data)
            toast.error(err.response?.data?.message || 'Unexpected Error Occured');
        }
    }
}