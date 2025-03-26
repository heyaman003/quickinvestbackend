import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../Config/Env";
import { getLocalStorage } from "../../utils/localStorage";

export const adminSettingApi = createApi({
  reducerPath: "adminSettingApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      headers.set("authorization", getLocalStorage("quickinvest_token"));
      return headers;
    },
  }),
  tagTypes: ["admin"], // automatic-data fetching
  endpoints: (builder) => ({
    // get PDF Link admin
    getPDFLink: builder.query({
      query: () => `http://localhost:8000/api/v1/private/get_pdf_link`,
      providesTags: ["admin"], // automatic-data fetching
    }),
    // For Update Password Admin
    updatePasswordAdmin: builder.mutation({
      query: (body) => ({
        url: "http://localhost:8000/api/v1/private/change_password",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["admin"], // automatic-data fetching
    }),
    // For Update Password Admin
    changePdfLind: builder.mutation({
      query: (body) => ({
        url: "http://localhost:8000/api/v1/private/change_pdf_link",
        method: "POST",
        body,
      }),
      invalidatesTags: ["admin"], // automatic-data fetching
    }),
    getAllManualRechargeHistory: builder.query({
      query: () => `http://localhost:8000/api/v1/private/get_all_manual_recharge`,
    }),
  }),
});

export const {
  useGetPDFLinkQuery,
  useUpdatePasswordAdminMutation,
  useChangePdfLindMutation,
  useGetAllManualRechargeHistoryQuery,
} = adminSettingApi;
