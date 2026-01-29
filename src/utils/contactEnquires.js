import toast from "react-hot-toast";
import axios from "axios";

export const getAllContactEnquires = async () => {
    const Token = localStorage.getItem('token');
    if (Token) {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/admin/contact`, {
                headers: {
                    'Authorization': `Bearer ${Token}`
                }
            },);
            if (res.data.success == true) {
                return res.data.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err.response.data.errors
        }
    }
}

export const getSingleContactEnquires = async (id) => {
    const Token = localStorage.getItem('token');
    if (Token && id) {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/admin/contact/${id}`, {
                headers: {
                    'Authorization': `Bearer ${Token}`
                }
            },);
            if (res.data.success == true) {
                return res.data.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err.response.data.errors
        }
    }
}


export const deleteContactEnquires = async (id) => {
    const Token = localStorage.getItem('token')
    if (id && Token) {
        try {
            const res = await axios.delete(`${import.meta.env.VITE_BASE_URL}/admin/contact/${id}`, {
                headers: {
                    'Authorization': `Bearer ${Token}`
                }
            });
            toast.success(res.data?.message || 'Contact inquiry deleted succesfully');
            return res.data
        } catch (err) {
            console.log(err.response.data)
            toast.error(err.response?.data?.message || 'Unexpected Error Occured');
        }
    }
}