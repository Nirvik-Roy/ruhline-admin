import axios from "axios";
import { toast } from "react-hot-toast";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const Editprogram = createAsyncThunk('Editprogram', async (loginParams, { rejectWithValue }) => {
    const { formData, id } = loginParams;
    const Token = localStorage.getItem('token')
    if (formData && id && Token) {
        try {
            const res = await axios.put(`${import.meta.env.VITE_BASE_URL}/admin/program-category/${id}`, formData, {
                headers: {
                    'Authorization': `Bearer ${Token}`
                }
            });
            if (res.data.success == true) {
                toast.success(res.data?.message || 'Category edited success');
                return res.data.data
            }
        } catch (err) {
            // toast.error(err.response?.data?.data.errors?.email[0])
            toast.error(err?.response.data?.message)
            return rejectWithValue(err.response?.data?.errors || "Something went wrong");
        }
    }
})

const EditprogramSlice = createSlice({
    name: 'editProgram',
    initialState: {
        editLoading: false,
        errors: [],
        isEdited: false,
    },
    reducers: {
        clearErrors(state) {
            state.errors = [];
        }
    },
    extraReducers: (builder) => {
        builder.addCase(Editprogram.pending, (state) => {
            state.editLoading = true,
                state.errors = [];
            state.isEdited = false
        })

        builder.addCase(Editprogram.fulfilled, (state) => {
            state.errors = [];
            state.editLoading = false,
                state.isEdited = true
        })

        builder.addCase(Editprogram.rejected, (state, action) => {
            state.isEdited = false,
                state.editLoading = false,
                state.errors = action.payload
        })
    }
})
export const { clearErrors } = EditprogramSlice.actions
export default EditprogramSlice.reducer;