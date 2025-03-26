import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../Config/Env";
import { getLocalStorage } from "../../utils/localStorage";

export const adminEarningApi = createApi({
  reducerPath: "adminEarningApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      headers.set("authorization", getLocalStorage("quickinvest_token"));
      return headers;
    },
  }),
  tagTypes: ["admin"], // automatic-data fetching
  endpoints: (builder) => ({
    // getting level income for admin
    getLevelIncomeAdmin: builder.query({
      query: (body) =>
        `http://localhost:8000/api/v1/private/get_level_income?page=${body.page}&pageNo=${body.pageNo}`,
      providesTags: ["admin"], // automatic-data fetching
    }),
    // getting game wallet income for admin
    getGameWalletIncomeAdmin: builder.query({
      query: () => `http://localhost:8000/api/v1/private/get_game_wallet_income`,
      providesTags: ["admin"], // automatic-data fetching
    }),

    // getting ROI income for admin
    getRankIncomeAdmin: builder.query({
      query: () => `http://localhost:8000/api/v1/private/get_rank_income`,
      providesTags: ["admin"], // automatic-data fetching
    }),
    // getting ROI income for admin
    getWinningAmountAdmin: builder.query({
      query: () => `http://localhost:8000/api/v1/private/winning-amount`,
      providesTags: ["admin"], // automatic-data fetching
    }),

    getROyaltyIncomeHistory: builder.query({
      query: () => `http://localhost:8000/api/v1/private//get_all_royalty_income_history`,
      providesTags: ["admin"],
    }),
    // getting ROI income for admin
    getROIIncomeHistory: builder.query({
      query: (body) => `http://localhost:8000/api/v1/private/get_all_roi_history`,
      providesTags: ["admin"], // automatic-data fetching
    }),
    getDirectIncomeHistory: builder.query({
      query: (body) => `http://localhost:8000/api/v1/private/get_all_direct_income_history`,
      providesTags: ["admin"], // automatic-data fetching
    }),
    getJoiningBonusHistory: builder.query({
      query: (body) => `http://localhost:8000/api/v1/private/get_all_joining_bonus_history`,
      providesTags: ["admin"], // automatic-data fetching
    }),
    getAllRechargeRewardHistoryAdmin: builder.query({
      query: (body) => `http://localhost:8000/api/v1/private/get_all_recharge_reward_history`,
      providesTags: ["admin"], // automatic-data fetching
    }),
  }),
});

export const {
  useGetLevelIncomeAdminQuery,
  useGetGameWalletIncomeAdminQuery,
  useGetROIIncomeAdminQuery,
  useGetRankIncomeAdminQuery,
  useGetWinningAmountAdminQuery,

  useGetROyaltyIncomeHistoryQuery,
  useGetROIIncomeHistoryQuery,
  useGetDirectIncomeHistoryQuery,
  useGetJoiningBonusHistoryQuery,
  useGetAllRechargeRewardHistoryAdminQuery
} = adminEarningApi;
