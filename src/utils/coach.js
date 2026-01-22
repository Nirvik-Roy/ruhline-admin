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


export const addNewCoach = async (data, file) => {
    const Token = localStorage.getItem('token');
    if (data && Token) {
        const formData = new FormData()
        formData.append("profile_image", file)
        formData.append("first_name", data.first_name);
        formData.append("last_name", data?.last_name);
        formData.append("gender", data?.gender);
        formData.append("password", data?.password);
        formData.append("password_confirmation", data?.password_confirmation);
        formData.append("phone", data?.phone);
        formData.append("phone_country_code_id", data?.phone_country_code_id)
        formData.append("email", data?.email);
        formData.append("coach_type", data?.coach_type);
        try {
            const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/admin/coach`, formData, {
                headers: {
                    'Authorization': `Bearer ${Token}`
                }
            })
            if (res.data.success == true) {
                toast.success(res.data?.message || 'Coach Added succesfully');
                return res.data;
            }
        } catch (err) {
            console.log(err.response?.data?.errors)
            return err.response?.data?.errors;

        }
    }
}


export const deleteCoach = async (id) => {
    const Token = localStorage.getItem('token')
    if (id && Token) {
        try {
            const res = await axios.delete(`${import.meta.env.VITE_BASE_URL}/admin/coach/${id}`, {
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


export const getSingleCoach = async (id) => {
    const Token = localStorage.getItem('token')
    if (id && Token) {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/admin/coach/${id}`, {
                headers: {
                    'Authorization': `Bearer ${Token}`
                }
            });
            if (res?.data?.success == true) {
                return res.data.data;
            }

        } catch (err) {
            toast.error(err.response?.data?.message || 'Unexpected Error Occured');
            return err?.response?.data
        }
    }
}

export const updateCoach = async (id, data) => {
    const Token = localStorage.getItem('token')
    if (id && Token && data) {
        try {
            const res = await axios.put(`${import.meta.env.VITE_BASE_URL}/admin/coach/${id}`, data, {
                headers: {
                    'Authorization': `Bearer ${Token}`
                }
            })
            if (res?.data?.success == true) {
                toast.success(res.data?.message || 'Coach Updated Successfully');
                return res.data;

            }
        } catch (err) {
            console.log(err.response)
            return err.response?.data?.errors;
        }
    }
}