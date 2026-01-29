import axios from "axios";
import toast from "react-hot-toast";

export const getShifts = async () => {
    const Token = localStorage.getItem('token');
    if (Token) {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/admin/shift`, {
                headers: {
                    'Authorization': `Bearer ${Token}`
                }
            });
            if (res.data?.success) {
                return res.data.data;
            }
        } catch (err) {
            toast.error(err.response?.data?.message || 'Error fetching shifts');
            console.log(err?.response?.data);
            return null;
        }
    }
    return null;
};

export const createShift = async (data) => {
    const Token = localStorage.getItem('token');
    if (Token && data) {
        try {
            const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/admin/shift`, data, {
                headers: {
                    'Authorization': `Bearer ${Token}`
                }
            });
            if (res.data?.success) {
                toast.success(res.data?.message || 'Shift created successfully');
                return res.data.data;
            }
        } catch (err) {
            toast.error(err.response?.data?.message || 'Error creating shift');
            console.log(err?.response?.data);
            return null;
        }
    }
    return null;
};

export const getShiftById = async (id) => {
    const Token = localStorage.getItem('token');
    if (Token && id) {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/admin/shift/${id}`, {
                headers: {
                    'Authorization': `Bearer ${Token}`
                }
            });
            if (res.data?.success) {
                return res.data.data;
            }
        } catch (err) {
            toast.error(err.response?.data?.message || 'Error fetching shift');
            console.log(err?.response?.data);
            return null;
        }
    }
    return null;
};

export const deleteShift = async (id) => {
    const Token = localStorage.getItem('token');
    if (Token && id) {
        try {
            const res = await axios.delete(`${import.meta.env.VITE_BASE_URL}/admin/shift/${id}`, {
                headers: {
                    'Authorization': `Bearer ${Token}`
                }
            });
            if (res.data?.success) {
                toast.success(res.data?.message || 'Shift deleted successfully');
                return true;
            }
        } catch (err) {
            toast.error(err.response?.data?.message || 'Error deleting shift');
            console.log(err?.response?.data);
            return false;
        }
    }
    return false;
};

export const updateShift = async (id, data) => {
    const Token = localStorage.getItem('token');
    if (Token && id && data) {
        try {
            const res = await axios.put(`${import.meta.env.VITE_BASE_URL}/admin/shift/${id}`, data, {
                headers: {
                    'Authorization': `Bearer ${Token}`
                }
            });
            if (res.data?.success) {
                toast.success(res.data?.message || 'Shift updated successfully');
                return res.data.data;
            }
        } catch (err) {
            toast.error(err.response?.data?.message || 'Error updating shift');
            console.log(err?.response?.data);
            return null;
        }
    }
    return null;
};
