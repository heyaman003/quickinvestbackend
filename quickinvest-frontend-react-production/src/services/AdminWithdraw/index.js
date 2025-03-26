import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../Config/Env";
import { getLocalStorage } from "../../utils/localStorage";

export const adminWithdrawApi = createApi({
  reducerPath: "adminWithdrawApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      headers.set("authorization", getLocalStorage("quickinvest_token"));
      return headers;
    },
  }),
  tagTypes: ["admin", "adminWithdraw"],
  endpoints: (builder) => ({
    // get Recharge History Service
    getAllWithdrawHistory: builder.query({
      query: () => `${process.env.REACT_APP_SERVER_URI}/api/v1/private/show_all_withdraw`,
      providesTags: ["adminWithdraw"], // automatic-data fetching
    }),
    completedWithdrawHistory: builder.query({
      query: () => `${process.env.REACT_APP_SERVER_URI}/api/v1/private/get_success_withdraw`,
      providesTags: ["adminWithdraw"],
    }),
    canceledWithdrawHistory: builder.query({
      query: () => `${process.env.REACT_APP_SERVER_URI}/api/v1/private/get_rejected_withdraw`,
      providesTags: ["adminWithdraw"],
    }),
    updateWithdrawStatus: builder.mutation({
      query: (body) => ({
        url: `${process.env.REACT_APP_SERVER_URI}/api/v1/private//update_withdraw_status`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["adminWithdraw"],
    }),
  }),
});

export const {
  useGetAllWithdrawHistoryQuery,
  useCompletedWithdrawHistoryQuery,
  useCanceledWithdrawHistoryQuery,
  useGetAllRejectRechargeQuery,
  useUpdateWithdrawStatusMutation,
} = adminWithdrawApi;
