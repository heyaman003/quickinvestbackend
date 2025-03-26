import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../Config/Env";
import { getLocalStorage } from "../../utils/localStorage";

export const adminSupportApi = createApi({
  reducerPath: "adminSupportApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      headers.set("authorization", getLocalStorage("quickinvest_token"));
      return headers;
    },
  }),
  tagTypes: ["admin"], // automatic-data fetching
  endpoints: (builder) => ({
    // getting all members for admin
    getAllContactUsAdmin: builder.query({
      query: () => `${process.env.REACT_APP_SERVER_URI}/api/v1/private/get_all_contactus`,
      providesTags: ["admin"], // automatic-data fetching
    }),
    // getting active members for admin
    getAllSupportAdmin: builder.query({
      query: () => `${process.env.REACT_APP_SERVER_URI}/api/v1/private/get_all_support`,
      providesTags: ["admin"], // automatic-data fetching
    }),
  }),
});

export const { useGetAllContactUsAdminQuery, useGetAllSupportAdminQuery } =
  adminSupportApi;
