import { NextPage } from 'next';

export type productType = {
  id: number;
  sitesCount: number;
  name: string;
  prices: productPrice[];
};

export type productPrice = {
  id: number;
  isActive: boolean;
  productId: number;
  price: string;
};

export type userType = {
  token: string;
  user: {
    username: string;
    email: string;
  };
};

export type userResponseType = {
  username: string;
  id: number;
  email: string;
};

export type fullUserDataType = {
  id: number;
  email: string;
  username: string;
  subscribes: null[];
  codes: codesType;
};

export type codesType = {
  id: number;
  code: string;
  origin: string;
  status: string;
  subscribeId: number;
  subscribe?: subscribeType;
  userId: number;
  user?: string;
};

export type subscribeType = {
  id: number;
  userId: number;
  productId: number;
  currentPeriodStart: string;
  currentPeriodEnd: string;
  status: string;
};

export type SubscribeType = {
  id: number;
  userId: number;
  productId: number;
  currentPeriodStart: string;
  currentPeriodEnd: string;
  status: string;
  product: productType;
  codes: codesType[];
}
