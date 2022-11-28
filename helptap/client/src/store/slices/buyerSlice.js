import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ApiService from "services/service";
import toast from 'react-hot-toast'

const initialState = {
  isLoading: false,
  isError: false,
  message: '',
  buyerId: undefined,
  profile: undefined,
  ordersDetails: undefined,
  allSellers: undefined,
  sellerDetail: undefined,
  sellerBook: undefined,
  cart: [],
};

export const buyerProfile = createAsyncThunk("buyer/profile", async (id, { rejectWithValue }) => {
  try {
    const response = await ApiService.buyer(id);
    return response.data;
  } catch (error) {
    let message = error?.response?.data.message || 'unable to get profile'
    toast.error(message, { id: message.replace(/ /g,'') })
    return rejectWithValue(message);
  }
});

export const getOrderDetail = createAsyncThunk("buyer/getOrderDetail", async (data, { rejectWithValue }) => {
  try {
    const response = await ApiService.getOrder(data);
    return response.data;
  } catch (error) {
    let message = error?.response?.data.message || 'unable to get orders'
    toast.error(message, { id: message.replace(/ /g,'') })
    return rejectWithValue(message);
  }
});

export const getAllSellers = createAsyncThunk("buyer/getAllSellers", async (data, { rejectWithValue }) => {
  try {
    const response = await ApiService.getAllSellers();
    return response.data;
  } catch (error) {
    let message = error?.response?.data.message || 'unable to get sellers'
    toast.error(message, { id: message.replace(/ /g,'') })
    return rejectWithValue(message);
  }
});

export const getSellersById = createAsyncThunk("buyer/getSellersById", async (data, { rejectWithValue }) => {
  try {
    const response = await ApiService.getSellersById(data);
    return response.data;
  } catch (error) {
    let message = error?.response?.data.message || 'unable to get sellers'
    toast.error(message, { id: message.replace(/ /g,'') })
    return rejectWithValue(message);
  }
});

export const getBookBySellerId = createAsyncThunk("buyer/getBookBySellerId", async (data, { rejectWithValue }) => {
  try {
    const response = await ApiService.getBookBySellerId(data);
    return response.data;
  } catch (error) {
    let message = error?.response?.data.message || 'unable to get sellers'
    toast.error(message, { id: message.replace(/ /g,'') })
    return rejectWithValue(message);
  }
});

export const placeOrder = createAsyncThunk("buyer/placeOrder", async (data, { rejectWithValue }) => {
  try {
    const response = await ApiService.placeOrder(data, data?.buyerId);
    if(response.data) {
      toast.success('Order placed successfully', { id: 'order-placed' })
    }
    return response.data;
  } catch (error) {
    let message = error?.response?.data.message || 'unable to place Order'
    toast.error(message, { id: message.replace(/ /g,'') })
    return rejectWithValue(message);
  }
});

export const getOrder = createAsyncThunk("buyer/getOrder", async (data, { rejectWithValue }) => {
  try {
    const response = await ApiService.getOrder(data);
    return response.data;
  } catch (error) {
    let message = error?.response?.data.message || 'unable to place Order'
    toast.error(message, { id: message.replace(/ /g,'') })
    return rejectWithValue(message);
  }
});

const buyerSlice = createSlice({
  name: 'buy',
  initialState: initialState,
  reducers: {
    cartItems: (state, action) => {
      state.cart = [...state.cart , action.payload]
      toast.success('Added to cart', {id: 'add-cart'})
    },
    updateCartItem: (state, action) => {
      state.cart = [action.payload]
      toast.success('Added to cart', {id: 'update-cart'})
    }
  },
  extraReducers: (builder) => {
    builder.addCase(buyerProfile.pending, (state) => {
      state.isLoading = true
      state.isError = false
    })
    builder.addCase(buyerProfile.fulfilled, (state, action) => {
      state.profile = action.payload
      state.message = action.payload.message  
      state.buyerId = action.payload.data.id
      state.isLoading = false
      state.isError = false
    })
    builder.addCase(buyerProfile.rejected, (state, action) => {
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
    
    builder.addCase(getAllSellers.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getAllSellers.fulfilled, (state, action) => {
      state.allSellers = action.payload.data
      state.message = action.payload.message  
      state.isLoading = false
      state.isError = false
    })
    builder.addCase(getAllSellers.rejected, (state, action) => {
      state.message = action.payload
      state.isLoading = false
      state.isError = true
    })

    builder.addCase(getSellersById.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getSellersById.fulfilled, (state, action) => {
      state.sellerDetail = action.payload.data
      state.message = action.payload.message  
      state.isLoading = false
      state.isError = false
    })
    builder.addCase(getSellersById.rejected, (state, action) => {
      state.message = action.payload
      state.isLoading = false
      state.isError = true
    })

    builder.addCase(getBookBySellerId.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getBookBySellerId.fulfilled, (state, action) => {
      state.sellerBook = action.payload.data
      state.message = action.payload.message  
      state.isLoading = false
      state.isError = false
    })
    builder.addCase(getBookBySellerId.rejected, (state, action) => {
      state.message = action.payload
      state.isLoading = false
      state.isError = true
    })

    builder.addCase(getOrder.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getOrder.fulfilled, (state, action) => {
      state.ordersDetails = action.payload.data
      state.message = action.payload.message  
      state.isLoading = false
      state.isError = false
    })
    builder.addCase(getOrder.rejected, (state, action) => {
      state.message = action.payload
      state.isLoading = false
      state.isError = true
    })
  },
})

export const { cartItems, updateCartItem } = buyerSlice.actions
export default buyerSlice