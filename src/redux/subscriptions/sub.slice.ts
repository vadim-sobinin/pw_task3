import { SubscribeType, codesType, productType } from '@/types';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type initialStateType = {
  subList: SubscribeType[];
  codeList: codesType[];
  selectedSubId?: number;
};

const initialState: initialStateType = {
  subList: [],
  codeList: [],
  selectedSubId: undefined,
};

export const subSlice = createSlice({
  name: 'sub',
  initialState,
  reducers: {
    setSubList: (state, { payload }: PayloadAction<SubscribeType[]>) => {
      const newArray = [...payload];
      newArray.sort((a, b) => a.id - b.id);
      state.subList = newArray;
      state.selectedSubId = newArray[0].id;
    },
    setCodeList: (state, { payload }: PayloadAction<codesType[]>) => {
      const newArray = [...payload];
      state.codeList = newArray.sort((a, b) => a.id - b.id);
    },
    setSelectedSubId: (state, { payload }: PayloadAction<number>) => {
      state.selectedSubId = payload;
    },
    updateCodeList: (state, { payload }: PayloadAction<codesType[]>) => {
      const filteredCodeList = state.codeList.filter(
        (code) => code.subscribeId !== state.selectedSubId,
      );
      state.codeList = [...filteredCodeList, ...payload].sort((a, b) => a.id - b.id);
    },
    activateCode: (state, { payload }: PayloadAction<codesType>) => {
      const filteredCodeList = state.codeList.filter((code) => code.id !== payload.id);
      state.codeList = [...filteredCodeList, payload].sort((a, b) => a.id - b.id);
    },
  },
});

export const { setSubList, setCodeList, setSelectedSubId, updateCodeList, activateCode } =
  subSlice.actions;

export default subSlice.reducer;
