import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../Config/Env";
import { getLocalStorage } from "../../utils/localStorage";

export const userWalletApi = createApi({
  reducerPath: "userWalletApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      headers.set("authorization", getLocalStorage("quickinvest_token"));
      return headers;
    },
  }),
  tagTypes: ["user"], // automatic-data fetching
  endpoints: (builder) => ({
    // add Recharge service
    addRecharge: builder.mutation({
      query: (body) => ({
        url: `${process.env.REACT_APP_SERVER_URI}/api/v1/secure/userRecharge`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["user"], // automatic-data fetching
    }),
    // get Recharge History Service
    getRechargeHistory: builder.query({
      query: (body) =>
        `${process.env.REACT_APP_SERVER_URI}/api/v1/secure/userGetAllRecharge?page=${body.page}&limit=${body.limit}`,
      providesTags: ["user"], // automatic-data fetching
    }),
    getBank: builder.query({
      query: () => `${process.env.REACT_APP_SERVER_URI}/api/v1/secure/getBank`,
    }),
    withdrawAmount: builder.mutation({
      query: (body) => ({
        url: `${process.env.REACT_APP_SERVER_URI}/api/v1/secure/withdraw_amount`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["user"], // automatic-data fetching
    }),
    getMyWallet: builder.query({
      query: () => `${process.env.REACT_APP_SERVER_URI}/api/v1/secure/get_mywallet`,
    }),
    getWithdrawHistory: builder.query({
      query: (body) =>
        `${process.env.REACT_APP_SERVER_URI}/api/v1/secure/get_withdraw_history?page=${body.page}&limit=${body.limit}`,
    }),
    // get Direct Income History Service
    getDirectIncomeHistory: builder.query({
      query: (body) =>
        `${process.env.REACT_APP_SERVER_URI}/api/v1/secure/get_direct_icome_history?page=${body.page}&limit=${body.limit}`,
    }),
    getUpiQr: builder.query({
      query: () => `${process.env.REACT_APP_SERVER_URI}/api/v1/secure/getUpiQr`,
    }),
    getROIIncomeHistory: builder.query({
      query: (body) =>
        `${process.env.REACT_APP_SERVER_URI}/api/v1/secure/get_roi_icome_history?page=${body.page}&limit=${body.limit}`,
    }),
    getRoyaltyIncomeHistory: builder.query({
      query: (body) =>
        `${process.env.REACT_APP_SERVER_URI}/api/v1/secure/get_royalty_income?page=${body.page}&limit=${body.limit}`,
    }),
    getJoiningBonusHistory: builder.query({
      query: (body) =>
        `${process.env.REACT_APP_SERVER_URI}/api/v1/secure/userGetAllJoiningBonus?page=${body.page}&limit=${body.limit}`,
    }),
    getRewardHistory: builder.query({
      query: (body) =>
        `${process.env.REACT_APP_SERVER_URI}/api/v1/secure/userGetAllRechargeReward?page=${body.page}&limit=${body.limit}`,
    }),
  }),
});

export const {
  useAddRechargeMutation,
  useGetRechargeHistoryQuery,
  useGetBankQuery,
  useWithdrawAmountMutation,
  useGetMyWalletQuery,
  useGetWithdrawHistoryQuery,
  useGetUpiQrQuery,
  useGetDirectIncomeHistoryQuery,
  useGetROIIncomeHistoryQuery,
  useGetRoyaltyIncomeHistoryQuery,
  useGetJoiningBonusHistoryQuery,
  useGetRewardHistoryQuery,
} = userWalletApi;
