import axios from "axios";
import toast from "react-hot-toast";

export const getAllPhoneCountry = async () =>{
     try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/location/phone-country-codes`);
        if (res.data.success == true) {
            // toast.success(res.data?.message || 'Password Update Successfully');
            return res.data.data
        }
    } catch (err) {
        toast.error(err.response?.data?.message)
    }
}