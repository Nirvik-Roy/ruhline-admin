import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./Slices/Loginslice/AuthSlice";
import EditCustomerSlice from './Slices/CustomerSlice/EditCustomerSlice'
const store = configureStore({
  reducer: {
    auth: AuthSlice,
    editCustomer: EditCustomerSlice
  }
})

export default store;