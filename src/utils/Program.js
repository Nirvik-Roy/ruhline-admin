import axios from "axios";
import toast from "react-hot-toast";
// Here you may have a small confusion regarding the functions name of the programs .. Few of them are of program categories... But I named the functions as simple Program.. So plz check the urls .. The endpoints of program category will be program-category//
export const getAllPrograms = async () => {
    const Token = localStorage.getItem('token');
    if (Token) {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/admin/program-category`, {
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

export const postPrograms = async (data) => {
    const Token = localStorage.getItem('token');
    if (Token && data) {
        try {
            const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/admin/program-category`, data, {
                headers: {
                    'Authorization': `Bearer ${Token}`
                }
            },);
            if (res.data.success == true) {
                toast.success(res.data?.message || 'Program Added success');
                return res.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err.response.data.errors
        }
    }
}

export const editPrograms = async (data, id) => {
    const Token = localStorage.getItem('token');
    if (Token && data && id) {
        try {
            const res = await axios.put(`${import.meta.env.VITE_BASE_URL}/admin/program-category/${id}`, data, {
                headers: {
                    'Authorization': `Bearer ${Token}`
                }
            },);
            if (res.data.success == true) {
                toast.success(res.data?.message || 'Program Added success');
                return res.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err.response.data.errors
        }
    }
}

export const getSingleProgram = async (id) => {
    const Token = localStorage.getItem('token');
    if (Token && id) {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/admin/program-category/${id}`, {
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


export const deleteCategories = async (id) => {
    const Token = localStorage.getItem('token')
    if (id && Token) {
        try {
            const res = await axios.delete(`${import.meta.env.VITE_BASE_URL}/admin/program-category/${id}`, {
                headers: {
                    'Authorization': `Bearer ${Token}`
                }
            });
            toast.success(res.data?.message || 'Category Deleted Successfully');
            return res.data
        } catch (err) {
            console.log(err.response.data)
            toast.error(err.response?.data?.message || 'Unexpected Error Occured');
        }
    }
}

export const postQuoteCategory = async (data) => {
    const Token = localStorage.getItem('token');
    if (Token && data) {
        try {
            const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/admin/quote-category`, data, {
                headers: {
                    'Authorization': `Bearer ${Token}`
                }
            },);
            if (res.data.success == true) {
                toast.success(res.data?.message || 'Quote Added Success..');
                return res.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err.response.data.errors
        }
    }
}

export const getAllquoteCategory = async () => {
    const Token = localStorage.getItem('token');
    if (Token) {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/admin/quote-category`, {
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


export const editQuoteCategory = async (data, id) => {
    const Token = localStorage.getItem('token');
    if (Token && data && id) {
        try {
            const res = await axios.put(`${import.meta.env.VITE_BASE_URL}/admin/quote-category/${id}`, data, {
                headers: {
                    'Authorization': `Bearer ${Token}`
                }
            },);
            if (res.data.success == true) {
                toast.success(res.data?.message || 'Quote edited succesfully');
                return res.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err.response.data.errors
        }
    }
}

export const getSingleQuoteCategory = async (id) => {
    const Token = localStorage.getItem('token');
    if (Token && id) {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/admin/quote-category/${id}`, {
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

export const getAllQuotes = async (id) => {
    const Token = localStorage.getItem('token');
    if (Token && id) {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/admin/quote-category/quotes?quote_category_id=${id}`, {
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


export const postQuote = async (data) => {
    const Token = localStorage.getItem('token');
    if (Token && data) {
        try {
            const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/admin/quote-category/quotes`, data, {
                headers: {
                    'Authorization': `Bearer ${Token}`
                }
            },);
            if (res.data.success == true) {
                toast.success(res.data?.message || 'Quote Added Success..');
                return res.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err.response.data.errors
        }
    }
}


export const editQuote = async (data, id) => {
    const Token = localStorage.getItem('token');
    if (Token && data && id) {
        try {
            const res = await axios.put(`${import.meta.env.VITE_BASE_URL}/admin/quote-category/quotes/${id}`, data, {
                headers: {
                    'Authorization': `Bearer ${Token}`
                }
            },);
            if (res.data.success == true) {
                toast.success(res.data?.message || 'Quote edited succesfully');
                return res.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err.response.data.errors
        }
    }
}


export const getSingleQuote = async (id) => {
    const Token = localStorage.getItem('token');
    if (Token && id) {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/admin/quote-category/quotes/${id}`, {
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




export const postCardCategory = async (data) => {
    const Token = localStorage.getItem('token');
    if (Token && data) {
        try {
            const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/admin/card-category`, data, {
                headers: {
                    'Authorization': `Bearer ${Token}`
                }
            },);
            if (res.data.success == true) {
                toast.success(res.data?.message || 'Card Added Success..');
                return res.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err.response.data.errors
        }
    }
}

export const editCardCategory = async (data, id) => {
    const Token = localStorage.getItem('token');
    if (Token && data && id) {
        try {
            const res = await axios.put(`${import.meta.env.VITE_BASE_URL}/admin/card-category/${id}`, data, {
                headers: {
                    'Authorization': `Bearer ${Token}`
                }
            },);
            if (res.data.success == true) {
                toast.success(res.data?.message || 'Quote edited succesfully');
                return res.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err.response.data.errors
        }
    }
}
export const getAllCardCategory = async () => {
    const Token = localStorage.getItem('token');
    if (Token) {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/admin/card-category`, {
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


export const getSingleCardCategory = async (id) => {
    const Token = localStorage.getItem('token');
    if (Token && id) {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/admin/card-category/${id}`, {
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


export const getAllcards = async (id) => {
    const Token = localStorage.getItem('token');
    if (Token && id) {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/admin/card-category/cards?card_category_id=${id}`, {
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


export const postCard = async (data) => {
    const Token = localStorage.getItem('token');
    if (Token && data) {
        try {
            const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/admin/card-category/cards`, data, {
                headers: {
                    'Authorization': `Bearer ${Token}`
                }
            },);
            if (res.data.success == true) {
                toast.success(res.data?.message || 'Quote Added Success..');
                return res.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err.response.data.errors
        }
    }
}


export const editCard = async (data, id) => {
    const Token = localStorage.getItem('token');
    if (Token && data && id) {
        try {
            const res = await axios.put(`${import.meta.env.VITE_BASE_URL}/admin/card-category/cards/${id}`, data, {
                headers: {
                    'Authorization': `Bearer ${Token}`
                }
            },);
            if (res.data.success == true) {
                toast.success(res.data?.message || 'Quote edited succesfully');
                return res.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err.response.data.errors
        }
    }
}


export const getSingleCard = async (id) => {
    const Token = localStorage.getItem('token');
    if (Token && id) {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/admin/card-category/cards/${id}`, {
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


export const getAllGoalTypes = async () => {
    const Token = localStorage.getItem('token');
    if (Token) {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/admin/goal-type`, {
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


export const postGoalType = async (data) => {
    const Token = localStorage.getItem('token');
    if (Token && data) {
        try {
            const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/admin/goal-type`, data, {
                headers: {
                    'Authorization': `Bearer ${Token}`
                }
            },);
            if (res.data.success == true) {
                toast.success(res.data?.message || 'Goal added Added Success..');
                return res.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err.response.data.errors
        }
    }
}


export const getSingleGoal = async (id) => {
    const Token = localStorage.getItem('token');
    if (Token && id) {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/admin/goal-type/${id}`, {
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


export const editGoalTypes = async (data, id) => {
    const Token = localStorage.getItem('token');
    if (Token && data && id) {
        try {
            const res = await axios.put(`${import.meta.env.VITE_BASE_URL}/admin/goal-type/${id}`, data, {
                headers: {
                    'Authorization': `Bearer ${Token}`
                }
            },);
            if (res.data.success == true) {
                toast.success(res.data?.message || 'Quote edited succesfully');
                return res.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err.response.data.errors
        }
    }
}



export const getAllHabitTypes = async () => {
    const Token = localStorage.getItem('token');
    if (Token) {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/admin/habit-type`, {
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


export const postHabitType = async (data) => {
    const Token = localStorage.getItem('token');
    if (Token && data) {
        try {
            const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/admin/habit-type`, data, {
                headers: {
                    'Authorization': `Bearer ${Token}`
                }
            },);
            if (res.data.success == true) {
                toast.success(res.data?.message || 'Quote Added Success..');
                return res.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err.response.data.errors
        }
    }
}


export const getSingleHabitType = async (id) => {
    const Token = localStorage.getItem('token');
    if (Token && id) {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/admin/habit-type/${id}`, {
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


export const editHabitTypes = async (data, id) => {
    const Token = localStorage.getItem('token');
    if (Token && data && id) {
        try {
            const res = await axios.put(`${import.meta.env.VITE_BASE_URL}/admin/habit-type/${id}`, data, {
                headers: {
                    'Authorization': `Bearer ${Token}`
                }
            },);
            if (res.data.success == true) {
                toast.success(res.data?.message || 'Quote edited succesfully');
                return res.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err.response.data.errors
        }
    }
}


export const postYMethod = async (data) => {
    const Token = localStorage.getItem('token');
    if (Token && data) {
        try {
            const res = await axios.put(`${import.meta.env.VITE_BASE_URL}/admin/intermediate-steps/y-method`, data, {
                headers: {
                    'Authorization': `Bearer ${Token}`
                }
            },);
            if (res.data.success == true) {
                toast.success(res.data?.message || 'Y method added success');
                return res.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err.response.data.errors
        }
    }
}


export const getYMethod = async () => {
    const Token = localStorage.getItem('token');
    if (Token) {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/admin/intermediate-steps/y-method`, {
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



export const postEachGoal = async (data) => {
    const Token = localStorage.getItem('token');
    if (Token && data) {
        try {
            const res = await axios.put(`${import.meta.env.VITE_BASE_URL}/admin/intermediate-steps/questions-goal-why`, data, {
                headers: {
                    'Authorization': `Bearer ${Token}`
                }
            },);
            if (res.data.success == true) {
                toast.success(res.data?.message || 'Goal Added Success..');
                return res.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err.response.data.errors
        }
    }
}


export const getEachGoal = async () => {
    const Token = localStorage.getItem('token');
    if (Token) {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/admin/intermediate-steps/questions-goal-why`, {
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


export const postGoalSettings = async (data) => {
    const Token = localStorage.getItem('token');
    if (Token && data) {
        try {
            const res = await axios.put(`${import.meta.env.VITE_BASE_URL}/admin/intermediate-steps/goal-settings`, data, {
                headers: {
                    'Authorization': `Bearer ${Token}`
                }
            },);
            if (res.data.success == true) {
                toast.success(res.data?.message || 'Goal settings added Success..');
                return res.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err.response.data.errors
        }
    }
}

export const getGoalSettings = async () => {
    const Token = localStorage.getItem('token');
    if (Token) {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/admin/intermediate-steps/goal-settings`, {
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


export const postCommonMistakes = async (data) => {
    const Token = localStorage.getItem('token');
    if (Token && data) {
        try {
            const res = await axios.put(`${import.meta.env.VITE_BASE_URL}/admin/intermediate-steps/eight-most-common-mistakes`, data, {
                headers: {
                    'Authorization': `Bearer ${Token}`
                }
            },);
            if (res.data.success == true) {
                toast.success(res.data?.message || 'Mistakes added Success..');
                return res.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err.response.data.errors
        }
    }
}


export const getCommonMistakes = async () => {
    const Token = localStorage.getItem('token');
    if (Token) {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/admin/intermediate-steps/eight-most-common-mistakes`, {
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


export const postValuesIntermediate = async (data) => {
    const Token = localStorage.getItem('token');
    if (Token && data) {
        try {
            const res = await axios.put(`${import.meta.env.VITE_BASE_URL}/admin/intermediate-steps/values`, data, {
                headers: {
                    'Authorization': `Bearer ${Token}`
                }
            },);
            if (res.data.success == true) {
                toast.success(res.data?.message || 'Values added Success..');
                return res.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err.response.data.errors
        }
    }
}

export const getValuesIntermediate = async () => {
    const Token = localStorage.getItem('token');
    if (Token) {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/admin/intermediate-steps/values`, {
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


export const getGlobalComission = async () => {
    const Token = localStorage.getItem('token');
    if (Token) {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/admin/coach/global-commission-rate`, {
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


export const postGlobalCommission = async (data) => {
    const Token = localStorage.getItem('token');
    if (Token && data) {
        try {
            const res = await axios.put(`${import.meta.env.VITE_BASE_URL}/admin/coach/global-commission-rate`, data, {
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


export const createProgram = async (data) => {
    const Token = localStorage.getItem('token');
    if (Token && data) {
        try {
            const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/admin/program`, data, {
                headers: {
                    'Authorization': `Bearer ${Token}`
                }
            },);
            if (res.data.success == true) {
                toast.success(res.data?.message || 'Progam Created Success..');
                return res.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err.response.data.errors
        }
    }
}

export const getPrograms = async () => {
    const Token = localStorage.getItem('token');
    if (Token) {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/admin/program`, {
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

export const getprogramById = async (id) => {
    const Token = localStorage.getItem('token');
    if (Token && id) {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/admin/program/${id}`, {
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

export const editProgramsById = async (data, id) => {
    const Token = localStorage.getItem('token');
    if (Token && data && id) {
        try {
            const res = await axios.put(`${import.meta.env.VITE_BASE_URL}/admin/program/${id}`, data, {
                headers: {
                    'Authorization': `Bearer ${Token}`
                }
            },);
            if (res.data.success == true) {
                toast.success(res.data?.message || 'Quote edited succesfully');
                return res.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err.response.data.errors
        }
    }
}


export const postProgramModule = async (data, id) => {
    const Token = localStorage.getItem('token');
    if (Token && data && id) {
        try {
            const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/admin/program/${id}/structure`, data, {
                headers: {
                    'Authorization': `Bearer ${Token}`
                }
            },);
            if (res.data.success == true) {
                toast.success(res.data?.message || 'Progam Created Success..');
                return res.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err.response.data.errors
        }
    }
}


export const getProgramModuleById = async (id) => {
    const Token = localStorage.getItem('token');
    if (Token && id) {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/admin/program/${id}/structure`, {
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


export const deleteProgramModule = async (structureId, id) => {
    const Token = localStorage.getItem('token');
    if (Token && structureId && id) {
        try {
            const res = await axios.delete(`${import.meta.env.VITE_BASE_URL}/admin/program/${id}/structure/${structureId}`, {
                headers: {
                    'Authorization': `Bearer ${Token}`
                }
            },);
            if (res.data.success == true) {
                toast.success(res.data?.message || 'Values Questions added succesfully');
                return res.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err.response.data.errors
        }
    }
}

export const reorderProgramModule = async (data, id) => {
    const Token = localStorage.getItem('token');
    if (Token && id && data) {
        try {
            const res = await axios.put(`${import.meta.env.VITE_BASE_URL}/admin/program/${id}/structure/reorder`, data, {
                headers: {
                    'Authorization': `Bearer ${Token}`
                }
            },);
            if (res.data.success == true) {
                toast.success(res.data?.message || 'Values Questions added succesfully');
                return res.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err.response.data.errors
        }
    }
}

export const postValuesQuestion = async (data, structureId, id) => {
    const Token = localStorage.getItem('token');
    if (Token && data && structureId && id) {
        try {
            const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/admin/program/${id}/structure/${structureId}/values/questions`, data, {
                headers: {
                    'Authorization': `Bearer ${Token}`
                }
            },);
            if (res.data.success == true) {
                toast.success(res.data?.message || 'Values Questions added succesfully');
                return res.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err.response.data.errors
        }
    }
}

export const getValuesQuestion = async (id, structureId) => {
    const Token = localStorage.getItem('token');
    if (Token && id) {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/admin/program/${id}/structure/${structureId}/values/questions`, {
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


export const editValuesQuestion = async (data, structureId, id, questionId) => {
    const Token = localStorage.getItem('token');
    if (Token && data && structureId && id) {
        try {
            const res = await axios.put(`${import.meta.env.VITE_BASE_URL}/admin/program/${id}/structure/${structureId}/values/questions/${questionId}`, data, {
                headers: {
                    'Authorization': `Bearer ${Token}`
                }
            },);
            if (res.data.success == true) {
                toast.success(res.data?.message || 'Values Questions added succesfully');
                return res.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err.response.data.errors
        }
    }
}

export const deleteValuesQuestion = async (structureId, id, questionId) => {
    const Token = localStorage.getItem('token');
    if (Token && structureId && id && questionId) {
        try {
            const res = await axios.delete(`${import.meta.env.VITE_BASE_URL}/admin/program/${id}/structure/${structureId}/values/questions/${questionId}`, {
                headers: {
                    'Authorization': `Bearer ${Token}`
                }
            },);
            if (res.data.success == true) {
                toast.success(res.data?.message || 'Values Questions added succesfully');
                return res.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err.response.data.errors
        }
    }
}

export const postMotivationWord = async (data, structureId, id) => {
    const Token = localStorage.getItem('token');
    if (Token && data && structureId && id) {
        try {
            const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/admin/program/${id}/structure/${structureId}/words`, data, {
                headers: {
                    'Authorization': `Bearer ${Token}`
                }
            },);
            if (res.data.success == true) {
                toast.success(res.data?.message || 'Values Questions added succesfully');
                return res.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err.response.data.errors
        }
    }
}


export const getMotivationWord = async (id, structureId) => {
    const Token = localStorage.getItem('token');
    if (Token && id) {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/admin/program/${id}/structure/${structureId}/words`, {
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


export const updateMotivationWord = async (data, structureId, id, wordId) => {
    const Token = localStorage.getItem('token');
    console.log(wordId)
    if (Token && data && structureId && id) {
        try {
            const res = await axios.put(`${import.meta.env.VITE_BASE_URL}/admin/program/${id}/structure/${structureId}/words/${wordId}`, data, {
                headers: {
                    'Authorization': `Bearer ${Token}`
                }
            },);
            if (res.data.success == true) {
                toast.success(res.data?.message || 'Values Questions added succesfully');
                return res.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err.response.data.errors
        }
    }
}

export const deleteMotivationWord = async (structureId, id, wordId) => {
    const Token = localStorage.getItem('token');
    if (Token && structureId && id) {
        try {
            const res = await axios.delete(`${import.meta.env.VITE_BASE_URL}/admin/program/${id}/structure/${structureId}/words/${wordId}`, {
                headers: {
                    'Authorization': `Bearer ${Token}`
                }
            },);
            if (res.data.success == true) {
                toast.success(res.data?.message || 'Values Questions added succesfully');
                return res.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err.response.data.errors
        }
    }
}


export const postwheelofLifeElements = async (data, structureId, id) => {
    const Token = localStorage.getItem('token');
    if (Token && data && structureId && id) {
        try {
            const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/admin/program/${id}/structure/${structureId}/wheel-of-life/elements`, data, {
                headers: {
                    'Authorization': `Bearer ${Token}`
                }
            },);
            if (res.data.success == true) {
                toast.success(res.data?.message || 'Life elements added succesfully');
                return res.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err.response.data.errors
        }
    }
}


export const getwheelofLifeElements = async (id, structureId) => {
    const Token = localStorage.getItem('token');
    if (Token && id) {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/admin/program/${id}/structure/${structureId}/wheel-of-life/elements`, {
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


export const getWheelOfLifeQuestions = async (id, structureId, elementId) => {
    const Token = localStorage.getItem('token');
    if (Token && id && elementId) {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/admin/program/${id}/structure/${structureId}/wheel-of-life/elements/${elementId}/questions`, {
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


export const postWheelofLifeQuestion = async (data, structureId, id, elementId) => {
    const Token = localStorage.getItem('token');
    if (Token && data && structureId && id && elementId) {
        try {
            const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/admin/program/${id}/structure/${structureId}/wheel-of-life/elements/${elementId}/questions`, data, {
                headers: {
                    'Authorization': `Bearer ${Token}`
                }
            },);
            if (res.data.success == true) {
                toast.success(res.data?.message || 'Values Questions added succesfully');
                return res.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err.response.data.errors
        }
    }
}


export const editWheelofLifeQuestion = async (data, structureId, id, questionId, elementId) => {
    const Token = localStorage.getItem('token');
    if (Token && data && structureId && id && elementId) {
        try {
            const res = await axios.put(`${import.meta.env.VITE_BASE_URL}/admin/program/${id}/structure/${structureId}/wheel-of-life/elements/${elementId}/questions/${questionId}`, data, {
                headers: {
                    'Authorization': `Bearer ${Token}`
                }
            },);
            if (res.data.success == true) {
                toast.success(res.data?.message || 'Values Questions added succesfully');
                return res.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err.response.data.errors
        }
    }
}

export const deleteWheelofLifeQuestion = async (structureId, id, questionId, elementId) => {
    const Token = localStorage.getItem('token');
    if (Token && structureId && id && questionId && elementId) {
        try {
            const res = await axios.delete(`${import.meta.env.VITE_BASE_URL}/admin/program/${id}/structure/${structureId}/wheel-of-life/elements/${elementId}/questions/${questionId}`, {
                headers: {
                    'Authorization': `Bearer ${Token}`
                }
            },);
            if (res.data.success == true) {
                toast.success(res.data?.message || 'Values Questions added succesfully');
                return res.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err.response.data.errors
        }
    }
}

export const updateWheelofLifeLifeElements = async (data, structureId, id, elementId) => {
    const Token = localStorage.getItem('token');
    if (Token && data && structureId && id && elementId) {
        try {
            const res = await axios.put(`${import.meta.env.VITE_BASE_URL}/admin/program/${id}/structure/${structureId}/wheel-of-life/elements/${elementId}`, data, {
                headers: {
                    'Authorization': `Bearer ${Token}`
                }
            },);
            if (res.data.success == true) {
                toast.success(res.data?.message || 'Values Questions added succesfully');
                return res.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err.response.data.errors
        }
    }
}

export const deleteWheelofLifelement = async (structureId, id, elementId) => {
    const Token = localStorage.getItem('token');
    if (Token && structureId && id && elementId) {
        try {
            const res = await axios.delete(`${import.meta.env.VITE_BASE_URL}/admin/program/${id}/structure/${structureId}/wheel-of-life/elements/${elementId}`, {
                headers: {
                    'Authorization': `Bearer ${Token}`
                }
            },);
            if (res.data.success == true) {
                toast.success(res.data?.message || 'Values Questions added succesfully');
                return res.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err.response.data.errors
        }
    }
}


export const getWhoAmiQuestions = async (id, structureId) => {
    const Token = localStorage.getItem('token');
    if (Token && id) {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/admin/program/${id}/structure/${structureId}/who-am-i/questions`, {
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


export const postWhoAmiQuestions = async (data, structureId, id) => {
    const Token = localStorage.getItem('token');
    if (Token && data && structureId && id) {
        try {
            const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/admin/program/${id}/structure/${structureId}/who-am-i/questions`, data, {
                headers: {
                    'Authorization': `Bearer ${Token}`
                }
            },);
            if (res.data.success == true) {
                toast.success(res.data?.message || 'Values Questions added succesfully');
                return res.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err.response.data.errors
        }
    }
}



export const editWhoAmiQuestions = async (data, structureId, id, questionId) => {
    const Token = localStorage.getItem('token');
    if (Token && data && structureId && id && questionId) {
        try {
            const res = await axios.put(`${import.meta.env.VITE_BASE_URL}/admin/program/${id}/structure/${structureId}/who-am-i/questions/${questionId}`, data, {
                headers: {
                    'Authorization': `Bearer ${Token}`
                }
            },);
            if (res.data.success == true) {
                toast.success(res.data?.message || 'Values Questions added succesfully');
                return res.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err.response.data.errors
        }
    }
}


export const deleteWhoAmiQuestions = async (structureId, id, questionId) => {
    const Token = localStorage.getItem('token');
    if (Token && structureId && id && questionId) {
        try {
            const res = await axios.delete(`${import.meta.env.VITE_BASE_URL}/admin/program/${id}/structure/${structureId}/who-am-i/questions/${questionId}`, {
                headers: {
                    'Authorization': `Bearer ${Token}`
                }
            },);
            if (res.data.success == true) {
                toast.success(res.data?.message || 'Values Questions added succesfully');
                return res.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err.response.data.errors
        }
    }
}


export const deleteGalleryImageApi = async (id, imageId) => {
    const Token = localStorage.getItem('token');
    if (Token && id) {
        try {
            const res = await axios.delete(`${import.meta.env.VITE_BASE_URL}/admin/program/${id}/gallery/${imageId}`, {
                headers: {
                    'Authorization': `Bearer ${Token}`
                }
            },);
            if (res.data.success == true) {
                toast.success(res.data?.message || 'Values Questions added succesfully');
                return res.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err.response.data.errors
        }
    }
}


export const getProgramSettings = async (id) => {
    const Token = localStorage.getItem('token');
    if (Token && id) {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/admin/program/${id}/settings`, {
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

export const postProgramSettings = async (data, id) => {
    const Token = localStorage.getItem('token');
    if (Token && data && id) {
        try {
            const res = await axios.put(`${import.meta.env.VITE_BASE_URL}/admin/program/${id}/settings`, data, {
                headers: {
                    'Authorization': `Bearer ${Token}`
                }
            },);
            if (res.data.success == true) {
                toast.success(res.data?.message || 'Values Questions added succesfully');
                return res.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err.response.data.errors
        }
    }
}
export const getCardGameQuestionSets = async (id, structureId) => {
    const Token = localStorage.getItem('token');
    if (Token && id && structureId) {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/admin/program/${id}/structure/${structureId}/card-game/question-sets`, {
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

export const editCardGameQuestionSet = async (data, structureId, id, setId) => {
    const Token = localStorage.getItem('token');
    if (Token && data && structureId && id && setId) {
        try {
            const res = await axios.put(`${import.meta.env.VITE_BASE_URL}/admin/program/${id}/structure/${structureId}/card-game/question-sets/${setId}`, data, {
                headers: {
                    'Authorization': `Bearer ${Token}`
                }
            },);
            if (res.data.success == true) {
                toast.success(res.data?.message || 'Values Questions added succesfully');
                return res.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err.response.data.errors
        }
    }
}


export const postQuestionsInsideQuestionSet = async (data, structureId, id, setId) => {
    const Token = localStorage.getItem('token');
    if (Token && data && structureId && id) {
        try {
            const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/admin/program/${id}/structure/${structureId}/card-game/question-sets/${setId}/questions`, data, {
                headers: {
                    'Authorization': `Bearer ${Token}`
                }
            },);
            if (res.data.success == true) {
                toast.success(res.data?.message || 'Values Questions added succesfully');
                return res.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err.response.data.errors
        }
    }
}


export const editQuestionsInsideQuestionSet = async (data, structureId, id, questionId, setId) => {
    const Token = localStorage.getItem('token');
    if (Token && data && structureId && id && setId && questionId) {
        try {
            const res = await axios.put(`${import.meta.env.VITE_BASE_URL}/admin/program/${id}/structure/${structureId}/card-game/question-sets/${setId}/questions/${questionId}`, data, {
                headers: {
                    'Authorization': `Bearer ${Token}`
                }
            },);
            if (res.data.success == true) {
                toast.success(res.data?.message || 'Values Questions added succesfully');
                return res.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err.response.data.errors
        }
    }
}


export const deleteQuestionsInsideSet = async (structureId, id, questionId, setId) => {
    const Token = localStorage.getItem('token');
    if (Token && structureId && id && questionId && setId) {
        try {
            const res = await axios.delete(`${import.meta.env.VITE_BASE_URL}/admin/program/${id}/structure/${structureId}/card-game/question-sets/${setId}/questions/${questionId}`, {
                headers: {
                    'Authorization': `Bearer ${Token}`
                }
            },);
            if (res.data.success == true) {
                toast.success(res.data?.message || 'Values Questions added succesfully');
                return res.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err.response.data.errors
        }
    }
}


export const getCardGameQuestions = async (id, structureId) => {
    const Token = localStorage.getItem('token');
    if (Token && id && structureId) {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/admin/program/${id}/structure/${structureId}/card-game/cards`, {
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

export const postCardGamecards = async (data, id, structureId) => {
    const Token = localStorage.getItem('token');
    if (Token && data && id) {
        try {
            const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/admin/program/${id}/structure/${structureId}/card-game/cards`, data, {
                headers: {
                    'Authorization': `Bearer ${Token}`
                }
            },);
            if (res.data.success == true) {
                toast.success(res.data?.message || 'Values Questions added succesfully');
                return res.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err.response.data.errors
        }
    }
}

export const editCardGamecards = async (data, id, structureId, cardId) => {
    const Token = localStorage.getItem('token');
    if (Token && data && id && cardId) {
        try {
            const res = await axios.put(`${import.meta.env.VITE_BASE_URL}/admin/program/${id}/structure/${structureId}/card-game/cards/${cardId}`, data, {
                headers: {
                    'Authorization': `Bearer ${Token}`
                }
            },);
            if (res.data.success == true) {
                toast.success(res.data?.message || 'Values Questions added succesfully');
                return res.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err.response.data.errors
        }
    }
}


export const deleteCardGameCards = async (id, structureId, cardId) => {
    const Token = localStorage.getItem('token');
    if (Token && id && cardId) {
        try {
            const res = await axios.delete(`${import.meta.env.VITE_BASE_URL}/admin/program/${id}/structure/${structureId}/card-game/cards/${cardId}`, {
                headers: {
                    'Authorization': `Bearer ${Token}`
                }
            },);
            if (res.data.success == true) {
                toast.success(res.data?.message || 'Values Questions added succesfully');
                return res.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err.response.data.errors
        }
    }
}

export const getDocuments = async (id, structureId) => {
    const Token = localStorage.getItem('token');
    if (Token && id && structureId) {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/admin/program/${id}/structure/${structureId}/upload-documents`, {
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

export const postDocuments = async (data, id, structureId) => {
    const Token = localStorage.getItem('token');
    if (Token && data && id) {
        try {
            const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/admin/program/${id}/structure/${structureId}/upload-documents`, data, {
                headers: {
                    'Authorization': `Bearer ${Token}`
                }
            },);
            if (res.data.success == true) {
                toast.success(res.data?.message || 'Documents added succesfully...');
                return res.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err.response.data.errors
        }
    }
}


export const editDocuments = async (data, id, structureId, documentId) => {
    const Token = localStorage.getItem('token');
    if (Token && data && id) {
        try {
            const res = await axios.put(`${import.meta.env.VITE_BASE_URL}/admin/program/${id}/structure/${structureId}/upload-documents/${documentId}`, data, {
                headers: {
                    'Authorization': `Bearer ${Token}`
                }
            },);
            if (res.data.success == true) {
                toast.success(res.data?.message || 'Documents edited succesfully...');
                return res.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err.response.data.errors
        }
    }
}

export const deleteDocuments = async (id, structureId, documentId) => {
    const Token = localStorage.getItem('token');
    if (Token && id && documentId) {
        try {
            const res = await axios.delete(`${import.meta.env.VITE_BASE_URL}/admin/program/${id}/structure/${structureId}/upload-documents/${documentId}`, {
                headers: {
                    'Authorization': `Bearer ${Token}`
                }
            },);
            if (res.data.success == true) {
                toast.success(res.data?.message || 'Document deleted succesfully');
                return res.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err.response.data.errors
        }
    }
}


export const postcompleteSetup = async (data, id, structureId) => {
    const Token = localStorage.getItem('token');
    if (Token && data && id) {
        try {
            const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/admin/program/${id}/structure/${structureId}/intermediate-steps/complete-setup`, data, {
                headers: {
                    'Authorization': `Bearer ${Token}`
                }
            },);
            if (res.data.success == true) {
                toast.success(res.data?.message || 'Setup completed succesfully');
                return res.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err.response.data.errors
        }
    }
}