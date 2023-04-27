import { productType } from '@/types';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type initialStateType = {
  selectedProduct: productType | null;
  isAlreadyPurchase: boolean;
};

const initialState: initialStateType = {
  selectedProduct: null,
  isAlreadyPurchase: false,
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    selectProduct: (state, { payload }: PayloadAction<productType>) => {
      state.selectedProduct = payload;
      state.isAlreadyPurchase = false;
    },
    setIsAlreadyPurchase: (state, { payload }: PayloadAction<boolean>) => {
      state.isAlreadyPurchase = payload;
    },
  },
});

export const { selectProduct, setIsAlreadyPurchase } = productSlice.actions;

export default productSlice.reducer;
