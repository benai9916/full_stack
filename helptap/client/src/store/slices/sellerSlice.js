import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ApiService from "services/service";
import toast from 'react-hot-toast'

const initialState = {
  isLoading: false,
  isError: false,
  message: '',
  profile: undefined,
  booksList: undefined,
  ordersDetails: undefined,
  shopName: undefined,
};

export const sellerProfile = createAsyncThunk("seller/profile", async (id, { rejectWithValue }) => {
  try {
    const response = await ApiService.seller(id);
    return response.data;
  } catch (error) {
    let message = error?.response?.data.message || 'unable to get profile'
    toast.error(message, { id: message.replace(/ /g,'') })
    return rejectWithValue(message);
  }
});

export const getBook = createAsyncThunk("seller/getBook", async (data, { rejectWithValue }) => {
  try {
    const response = await ApiService.getBook(data);
    return response.data;
  } catch (error) {
    let message = error?.response?.data.message || 'unable to book detail'
    toast.error(message, { id: message.replace(/ /g,'') })
    return rejectWithValue(message);
  }
});

export const addBook = createAsyncThunk("seller/addBook", async (data, { rejectWithValue }) => {
  try {
    let {sellerId} = data
    delete data?.sellerId;
    const response = await ApiService.addBook(data, sellerId);
    if(response?.data) {
      toast.success('Book add successfully', { id: 'gs3HShhdS6jdgH' })
    }
    return response.data;
  } catch (error) {
    let message = error?.response?.data.message || 'unable to book detail'
    toast.error(message, { id: message.replace(/ /g,'') })
    return rejectWithValue(message);
  }
});

export const getOrderDetail = createAsyncThunk("seller/getOrderDetail", async (data, { rejectWithValue }) => {
  try {
    const response = await ApiService.getOrderDetail(data);
    return response.data;
  } catch (error) {
    let message = error?.response?.data.message || 'unable to get orders'
    toast.error(message, { id: message.replace(/ /g,'') })
    return rejectWithValue(message);
  }
});

export const addShopName = createAsyncThunk("seller/addShopName", async (data, { rejectWithValue }) => {
  try {
    let { sellerId } = data
    const response = await ApiService.addShopName(data, sellerId);
    if(response?.data) {
      toast.success('Shop added successfully', { id: 'gShddfhdS6jdgH' })
    }
    return response.data;
  } catch (error) {
    let message = error?.response?.data.message || 'unable to add shop Name'
    toast.error(message, { id: message.replace(/ /g,'') })
    return rejectWithValue(message);
  }
});

const sellerSlice = createSlice({
  name: 'sell',
  initialState: initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(sellerProfile.pending, (state) => {
      state.isLoading = true
      state.isError = false
    })
    builder.addCase(sellerProfile.fulfilled, (state, action) => {
      state.profile = action.payload
      state.message = action.payload.message  
      state.isLoading = false
      state.isError = false
      state.shopName = action.payload?.data?.shop[0]
    })
    builder.addCase(sellerProfile.rejected, (state, action) => {
      state.message = action.payload
      state.isLoading = false
      state.isError = true
    })

    builder.addCase(getBook.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getBook.fulfilled, (state, action) => {
      state.booksList = action.payload.data
      state.message = action.payload.message  
      state.isLoading = false
      state.isError = false
    })
    builder.addCase(getBook.rejected, (state, action) => {
      state.message = action.payload
      state.isLoading = false
      state.isError = true
    })

    builder.addCase(getOrderDetail.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getOrderDetail.fulfilled, (state, action) => {
      state.ordersDetails = action.payload.data
      state.message = action.payload.message  
      state.isLoading = false
      state.isError = false
    })
    builder.addCase(getOrderDetail.rejected, (state, action) => {
      state.message = action.payload
      state.isLoading = false
      state.isError = true
    })

    builder.addCase(addShopName.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(addShopName.fulfilled, (state, action) => {
      state.shopName = action.payload?.data
      state.message = action.payload.message  
      state.isLoading = false
      state.isError = false
    })
    builder.addCase(addShopName.rejected, (state, action) => {
      state.message = action.payload
      state.isLoading = false
      state.isError = true
    })
  },
})

export default sellerSlice