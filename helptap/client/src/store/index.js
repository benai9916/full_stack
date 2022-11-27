import { configureStore } from '@reduxjs/toolkit'
import authSlice from './slices/auth';
import sellerSlice from './slices/sellerSlice';
import buyerSlice from './slices/buyerSlice';

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    seller: sellerSlice.reducer,
    buyer: buyerSlice.reducer,
}
})
export default store;