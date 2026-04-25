import toast from "react-hot-toast"
import axios from "axios";
export const UpdateuserProfile = async (data) => {
    const Token = localStorage.getItem('token');
    if (Token && data) {
        const formData = new FormData()
        formData.append("first_name", data.firstName);   // text
        formData.append("last_name", data.lastName);
        if (data.file instanceof File) {
            formData.append("profile_photo", data.file);
        }     // text
        try {
            const res = await axios.put(`${import.meta.env.VITE_BASE_URL}/admin/profile`, formData, {
                headers: {
                    'Authorization': `Bearer ${Token}`
                }
            },);
            if (res.data.success == true) {
                toast.success(res.data?.message || 'Profile Updated Successfully');
                return res.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
        }


    }
}

export const Changeuserpassword = async (data) => {
    const Token = localStorage.getItem('token');
    if (Token && data) {
        try {
            const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/admin/change-password`, data, {
                headers: {
                    'Authorization': `Bearer ${Token}`
                }
            },);
            if (res.data.success == true) {
                toast.success(res.data?.message || 'Password Update Successfully');
                return res.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err.response.data.errors
        }
    }
}

export const getUserDetails = async () => {
    const Token = localStorage.getItem('token');
    if (Token) {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/admin/profile`, {
                headers: {
                    'Authorization': `Bearer ${Token}`
                }
            });
            if (res.data?.success) {
                return res.data.data
            }
        } catch (err) {
            toast.error('Error fetching admin details');
            console.log(err?.response?.data)
            return err.response.data
        }
    }
}