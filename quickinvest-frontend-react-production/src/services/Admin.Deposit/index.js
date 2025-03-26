import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../Config/Env";
import { getLocalStorage } from "../../utils/localStorage";

export const adminDepositApi = createApi({
  reducerPath: "adminDepositApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      headers.set("authorization", getLocalStorage("quickinvest_token"));
      return headers;
    },
  }),
  tagTypes: ["admin"], // automatic-data fetching
  endpoints: (builder) => ({
    // getting all deposit for admin
    getAllDepositAdmin: builder.query({
      query: (body) =>
        `${process.env.REACT_APP_SERVER_URI}/api/v1/private/get_all_deposits?page=${body.page}&pageNo=${body.pageNo}`,
      providesTags: ["admin"], // automatic-data fetching
    }),
    // getting success deposit for admin
    getSuccessDepositAdmin: builder.query({
      query: (body) =>
        `${process.env.REACT_APP_SERVER_URI}/api/v1/private/get_success_deposits?page=${body.page}&pageNo=${body.pageNo}`,
      providesTags: ["admin"], // automatic-data fetching
    }),
    // getting rejected deposit for admin
    getRejectDepositAdmin: builder.query({
      query: (body) =>
        `${process.env.REACT_APP_SERVER_URI}/api/v1/private/get_rejected_deposits?page=${body.page}&pageNo=${body.pageNo}`,
      providesTags: ["admin"], // automatic-data fetching
    }),

    // For User Recharge status change
    updateDepositStatusAdmin: builder.mutation({
      query: (body) => ({
        url: `${process.env.REACT_APP_SERVER_URI}/api/v1/private/update_deposit_status`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["admin"], // automatic-data fetching
    }),
  }),
});

export const {
  useGetAllDepositAdminQuery,
  useGetSuccessDepositAdminQuery,
  useGetRejectDepositAdminQuery,
  useUpdateDepositStatusAdminMutation,
} = adminDepositApi;
