import { productType } from '@/types';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type initialStateType = {
  selectedProduct: productType | null;
};

const initialState: initialStateType = {
  selectedProduct: null,
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    selectProduct: (state, { payload }: PayloadAction<productType>) => {
      state.selectedProduct = payload;
    },
  },
});

export const { selectProduct } = productSlice.actions;

export default productSlice.reducer;
