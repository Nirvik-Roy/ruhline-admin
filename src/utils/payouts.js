import axios from "axios"
import toast from "react-hot-toast"

export const getPayoutList = async () => {
    const Token = localStorage.getItem('token')
    if (Token) {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/admin/payout`, {
                headers: {
                    'Authorization': `Bearer ${Token}`
                }
            });
            if (res.data.success == true) {
                // toast.success(res.data?.message || 'Password Update Successfully');
                return res.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message)
        }
    } else {
        toast.error('Token not found...')
    }
}


export const getPayoutFrequency = async () => {
    const Token = localStorage.getItem('token')
    if (Token) {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/admin/payout/settings`, {
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
    } else {
        toast.error('Token not found...')
    }
}

export const postPayoutFrequency = async (data) => {
    const Token = localStorage.getItem('token');
    if (Token && data) {
        try {
            const res = await axios.put(`${import.meta.env.VITE_BASE_URL}/admin/payout/settings`, data, {
                headers: {
                    'Authorization': `Bearer ${Token}`
                }
            },);
            if (res.data.success == true) {
                toast.success(res.data?.message || 'Commission added Success..');
                return res.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            console.log(err)
            return err.response.data.errors
        }
    }
}

export const getSinglePayout = async (id) => {
    const Token = localStorage.getItem('token')
    if (Token && id) {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/admin/payout/${id}`, {
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
    } else {
        toast.error('Token not found...')
    }
}

export const updatePayoutStatus = async (id,data) => {
    const Token = localStorage.getItem('token')
    if (Token && id && data) {
        try {
            const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/admin/payout/${id}/status`, data,{
                headers: {
                    'Authorization': `Bearer ${Token}`
                }
            });
            if (res.data.success == true) {
                toast.success(res.data?.message || 'Status Updated Successfully');
                return res.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message)
        }
    } else {
        toast.error('Token not found...')
    }
}