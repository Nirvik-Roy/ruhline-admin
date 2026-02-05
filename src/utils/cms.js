import axios from "axios";
import toast from "react-hot-toast";
export const postSiteDetails = async (data) => {
    const Token = localStorage.getItem('token');
    if (Token && data) {
        try {
            const res = await axios.put(`${import.meta.env.VITE_BASE_URL}/admin/site-setting`, data, {
                headers: {
                    'Authorization': `Bearer ${Token}`
                }
            },);
            if (res.data.success == true) {
                toast.success(res.data?.message || 'Coupon Added success');
                return res.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err.response.data.errors
        }
    }
}

export const getSiteDetails = async () => {
    const Token = localStorage.getItem('token');
    if (Token) {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/admin/site-setting`, {
                headers: {
                    'Authorization': `Bearer ${Token}`
                }
            },);
            if (res.data.success == true) {
                return res.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err.response.data.errors
        }
    }
}


export const postArticleCategories = async (data) => {
    const Token = localStorage.getItem('token');
    if (Token && data) {
        try {
            const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/admin/article/article-category`, data, {
                headers: {
                    'Authorization': `Bearer ${Token}`
                }
            },);
            if (res.data.success == true) {
                toast.success(res.data?.message || 'Coupon Added success');
                return res.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err.response.data.errors
        }
    }
}


export const editArticleCategories = async (data, id) => {
    const Token = localStorage.getItem('token');
    if (Token && data && id) {
        try {
            const res = await axios.put(`${import.meta.env.VITE_BASE_URL}/admin/article/article-category/${id}`, data, {
                headers: {
                    'Authorization': `Bearer ${Token}`
                }
            },);
            if (res.data.success == true) {
                toast.success(res.data?.message || 'Article updated succesfully');
                return res.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err.response.data.errors
        }
    }
}


export const getAllCmsData = async (url) => {
    const Token = localStorage.getItem('token');
    if (Token && url) {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}${url}`, {
                headers: {
                    'Authorization': `Bearer ${Token}`
                }
            },);
            if (res.data.success == true) {
                return res.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err.response.data.errors
        }
    }
}


export const getAllSingleCmsData = async (url, id) => {
    const Token = localStorage.getItem('token');
    if (Token && id && url) {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}${url}/${id}`, {
                headers: {
                    'Authorization': `Bearer ${Token}`
                }
            },);
            if (res.data.success == true) {
                return res.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err.response.data.errors
        }
    }
}

export const deleteCmsData = async (url, id) => {
    const Token = localStorage.getItem('token')
    if (id && Token && url) {
        try {
            const res = await axios.delete(`${import.meta.env.VITE_BASE_URL}${url}/${id}`, {
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

export const postAllCmsData = async (url,data) => {
    const Token = localStorage.getItem('token');
    console.log('hello')
    if (Token && data && url) {
        try {
            const res = await axios.post(`${import.meta.env.VITE_BASE_URL}${url}`, data, {
                headers: {
                    'Authorization': `Bearer ${Token}`
                }
            },);
            if (res.data.success == true) {
                toast.success(res.data?.message || 'Coupon Added success');
                return res.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err.response.data.errors
        }
    }else{
        toast.error('Plz provide all the info..')
    }
}

export const putAllCmsData = async (url, data) => {
    const Token = localStorage.getItem('token');
    console.log('hello')
    if (Token && data && url) {
        try {
            const res = await axios.put(`${import.meta.env.VITE_BASE_URL}${url}`, data, {
                headers: {
                    'Authorization': `Bearer ${Token}`
                }
            },);
            if (res.data.success == true) {
                toast.success(res.data?.message || 'Coupon Added success');
                return res.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err.response.data.errors
        }
    } else {
        toast.error('Plz provide all the info..')
    }
}

export const editAllCmsData = async (url,data, id) => {
    const Token = localStorage.getItem('token');
    if (Token && data && id && url) {
        try {
            const res = await axios.put(`${import.meta.env.VITE_BASE_URL}${url}/${id}`, data, {
                headers: {
                    'Authorization': `Bearer ${Token}`
                }
            },);
            if (res.data.success == true) {
                toast.success(res.data?.message || 'Article updated succesfully');
                return res.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err.response.data.errors
        }
    }
}