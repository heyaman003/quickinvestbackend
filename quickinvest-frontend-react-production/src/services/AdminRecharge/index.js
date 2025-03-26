import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../Config/Env";
import { getLocalStorage } from "../../utils/localStorage";

export const adminRechargeApi = createApi({
  reducerPath: "adminRechargeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      headers.set("authorization", getLocalStorage("quickinvest_token"));
      return headers;
    },
  }),
  tagTypes: ["adminUpdateRecharge"],
  endpoints: (builder) => ({
    // get Recharge History Service
    getAllRechargeHistory: builder.query({
      query: () => `${process.env.REACT_APP_SERVER_URI}/api/v1/private/get_all_recharge_history`,
      providesTags: ["adminUpdateRecharge"],
    }),
    getAllSuccessRecharge: builder.query({
      query: () => `${process.env.REACT_APP_SERVER_URI}/api/v1/private/get_all_success_recharge_history`,
      providesTags: ["adminUpdateRecharge"],
    }),
    getAllRejectRecharge: builder.query({
      query: () => `${process.env.REACT_APP_SERVER_URI}/api/v1/private/get_all_reject_recharge_history`,
      providesTags: ["adminUpdateRecharge"],
    }),
    updateRechargeStatus: builder.mutation({
      query: (body) => ({
        url: `${process.env.REACT_APP_SERVER_URI}/api/v1/private/update_recharge_status`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["adminUpdateRecharge"],
    }),
    makeRecharge: builder.mutation({
      query: (body) => ({
        url: `${process.env.REACT_APP_SERVER_URI}/api/v1/private/make_recharge`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["adminUpdateRecharge"],
    }),
    changeUPIandQR: builder.mutation({
      query: (body) => ({
        url: `${process.env.REACT_APP_SERVER_URI}/api/v1/private/update_manage_upi_qr`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useGetAllRechargeHistoryQuery,
  useGetAllSuccessRechargeQuery,
  useGetAllRejectRechargeQuery,
  useUpdateRechargeStatusMutation,
  useMakeRechargeMutation,
  useChangeUPIandQRMutation,
} = adminRechargeApi;
