import axios from "axios";
import { toast } from "react-hot-toast";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const EditCustomer = createAsyncThunk('EditCustomer', async (loginParams, { rejectWithValue }) => {
    const { formData, id } = loginParams;
    const Token = localStorage.getItem('token')
    if (formData && id && Token) {
        try {
            const res = await axios.put(`${import.meta.env.VITE_BASE_URL}/admin/customer/${id}`, formData,{
                headers: {
                    'Authorization': `Bearer ${Token}`
                }
            });
            if (res.data.success == true) {
                toast.success(res.data?.message || 'Custome edited success');
                return res.data.data
            }
        } catch (err) {
            // toast.error(err.response?.data?.data.errors?.email[0])
            toast.error(err.response?.data?.errors)
            console.log(err?.response?.data)
            return rejectWithValue(err.response?.data || "Something went wrong");
        }
    }
})

const EditCustomerSlice = createSlice({
    name: 'editCustomer',
    initialState: {
        editLoading: false,
        errors: [],
        isEdited: false,
    },
    extraReducers: (builder) => {
        builder.addCase(EditCustomer.pending, (state) => {
            state.editLoading = true,
            state.errors = [];
            state.isEdited = false
        })

        builder.addCase(EditCustomer.fulfilled, (state) => {
            state.errors = [];
            state.editLoading = false,
            state.isEdited = true
        })

        builder.addCase(EditCustomer.rejected, (state, action) => {
            state.isEdited = false,
            state.editLoading = false,
            state.errors = action.payload
        })
    }
})

export default EditCustomerSlice.reducer;