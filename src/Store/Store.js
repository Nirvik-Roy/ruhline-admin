import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./Slices/Loginslice/AuthSlice";
import EditCustomerSlice from './Slices/CustomerSlice/EditCustomerSlice'
import EditprogramSlice from './Slices/ProgramCategorySlice/EditProgramCategorySlice'
const store = configureStore({
  reducer: {
    auth: AuthSlice,
    editCustomer: EditCustomerSlice,
    editProgram:EditprogramSlice,
  }
})

export default store;