import { productType } from '@/types';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type initialStateType = {
  selectedProduct: productType | null;
  isAlreadyPurchase: boolean;
  currentProduct: productType | null;
};

const initialState: initialStateType = {
  selectedProduct: null,
  isAlreadyPurchase: false,
  currentProduct: null,
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    selectProduct: (state, { payload }: PayloadAction<productType>) => {
      state.selectedProduct = payload;
      state.isAlreadyPurchase = false;
    },
    setCurrentProduct: (state, { payload }: PayloadAction<productType | null>) => {
      state.currentProduct = payload;
    },
    setIsAlreadyPurchase: (state, { payload }: PayloadAction<boolean>) => {
      state.isAlreadyPurchase = payload;
    },
  },
});

export const { selectProduct, setIsAlreadyPurchase, setCurrentProduct } = productSlice.actions;

export default productSlice.reducer;
