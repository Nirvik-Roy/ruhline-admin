import axios from "axios";
import toast from "react-hot-toast";

export const getDashboardDataApi = async () => {
  const Token = localStorage.getItem("token");
  if (Token) {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/admin/dashboard?recent_orders_limit=10`,
        {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        },
      );
      if (res?.data?.success == true) {
        return res?.data;
      }
    } catch (err) {
      toast.error(err.response?.data?.message);
      return err.response?.data?.errors;
    }
  }
};
