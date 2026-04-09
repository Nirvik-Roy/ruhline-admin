import axios from "axios";
import toast from "react-hot-toast";

export const getAllDisputes = async () => {
    const Token = localStorage.getItem('token');
    if (Token) {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/admin/dispute`, {
                headers: {
                    'Authorization': `Bearer ${Token}`
                }
            },);
            if (res?.data?.success == true) {
                return res.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err.response.data
        }
    }
}


export const getSingleDisputes = async (id) => {
    const Token = localStorage.getItem('token');
    if (Token && id) {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/admin/dispute/${id}`, {
                headers: {
                    'Authorization': `Bearer ${Token}`
                }
            },);
            if (res?.data?.success == true) {
                return res.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err.response.data
        }
    }
}


export const markDisputeStatus = async (data, id) => {
    const Token = localStorage.getItem('token');
    if (Token && id && data) {
        try {
            const res = await axios.patch(`${import.meta.env.VITE_BASE_URL}/admin/dispute/${id}/status`, data, {
                headers: {
                    'Authorization': `Bearer ${Token}`
                }
            },);
            if (res?.data?.success == true) {
                toast.success('Status updated succesfully..')
                return res?.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err.response.data
        }
    }
}