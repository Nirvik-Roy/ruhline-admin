import axios from "axios";
import toast from "react-hot-toast";

export const getWorkingDays = async () => {
    const Token = localStorage.getItem('token');
    if (Token) {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/admin/working-day`, {
                headers: {
                    'Authorization': `Bearer ${Token}`
                }
            });
            if (res.data?.success) {
                return res.data.data;
            } else {
                toast.error(res.data?.message || 'Error fetching working days');
                return null;
            }
        } catch (err) {
            toast.error(err.response?.data?.message || 'Unexpected Error Occured');
            console.log(err?.response?.data);
            return err?.response?.data;
        }
    }
    return null;
};

export const updateWorkingDays = async (data) => {
    const Token = localStorage.getItem('token');
    if (Token && data && Array.isArray(data.working_days)) {
        try {
            const res = await axios.put(`${import.meta.env.VITE_BASE_URL}/admin/working-day`, data, {
                headers: {
                    'Authorization': `Bearer ${Token}`
                }
            });
            if (res.data?.success) {
                toast.success(res.data?.message || 'Working days updated successfully');
                return res.data.data;
            } else {
                toast.error(res.data?.message || 'Error updating working days');
                return null;
            }
        } catch (err) {
            toast.error(err.response?.data?.message || 'Unexpected Error Occurred');
            console.log(err?.response?.data);
            return null;
        }
    }
    return null;
};
