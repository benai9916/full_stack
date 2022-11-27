import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ApiService from "services/service";
import toast from 'react-hot-toast'

const initialState = {
  isLoading: false,
  isError: false,
  message: '',
  data: [],
};

export const signUp = createAsyncThunk("auth/signup", async (data, { rejectWithValue }) => {
  try {
    const response = await ApiService.signUp(data);
    return response.data;
  } catch (error) {
    let message = error?.response?.data.message || 'unable to signup'
    toast.error(message, { id: message.replace(/ /g,'') })
    return rejectWithValue(message);
  }
});

export const login = createAsyncThunk("auth/login", async (data, { rejectWithValue }) => {
  try {
    const response = await ApiService.login(data);
    return response.data;
  } catch (error) {
    let message = error?.response?.data.message || 'unable to login'
    toast.error(message, { id: message.replace(/ /g,'') })
    return rejectWithValue(error?.response?.data.message);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    reset: () => initialState
  },
  extraReducers: (builder) => {
    builder.addCase(signUp.pending, (state) => {
      state.isLoading = true
      state.isError = false
    })
    builder.addCase(signUp.fulfilled, (state, action) => {
      state.data = action.payload.data
      state.message = action.payload.message  
      state.isLoading = false
      state.isError = false
    })
    builder.addCase(signUp.rejected, (state, action) => {
      state.message = action.payload
      state.isLoading = false
      state.isError = true
    })

    builder.addCase(login.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(login.fulfilled, (state, action) => {
      state.data = action.payload.data
      state.message = action.payload.message  
      state.isLoading = false
      state.isError = false
    })
    builder.addCase(login.rejected, (state, action) => {
      state.message = action.payload
      state.isLoading = false
      state.isError = true
    })
  },
})

export const {reset} = authSlice.actions
export default authSlice