import toast from "react-hot-toast";
import axios from "axios";
export const addCustomer = async (data) => {
    const Token = localStorage.getItem('token');
    if (Token && data) {
        try {
            const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/admin/customer`, data, {
                headers: {
                    'Authorization': `Bearer ${Token}`
                }
            },);
            if (res.data.success == true) {
                toast.success(res.data?.message || 'Customer added success');
                return res.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err.response.data.errors
        }
    }
}


export const getAllCutomer = async () => {
    const Token = localStorage.getItem('token');
    if (Token) {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/admin/customer`, {
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

export const getSingleCustomer = async (id) => {
    const Token = localStorage.getItem('token');
    if (Token && id) {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/admin/customer/${id}`, {
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

export const editProfile = async (data) => {
    const Token = localStorage.getItem('token');
    if (Token && data) {
        try {
            const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/customer/update-profile`, data, {
                headers: {
                    'Authorization': `Bearer ${Token}`
                }
            },);
            if (res.data.success == true) {
                toast.success(res.data?.message || 'Customer Edited Successfully');
                return res.data.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err.response.data.errors
        }
    }
}

export const deleteCustomer = async (id) => {
    const Token = localStorage.getItem('token')
    if (id && Token) {
        try {
            const res = await axios.delete(`${import.meta.env.VITE_BASE_URL}/admin/customer/${id}`, {
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