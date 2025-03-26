import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../Config/Env";
import { getLocalStorage } from "../../utils/localStorage";

export const userMineApi = createApi({
  reducerPath: "userMineReducer",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      headers.set("authorization", getLocalStorage("quickinvest_token"));
      return headers;
    },
  }),
  tagTypes: ["user"], // automatic-data fetching
  endpoints: (builder) => ({
    addBank: builder.mutation({
      query: (body) => ({
        url: `${process.env.REACT_APP_SERVER_URI}/api/v1/secure/addBank`,
        method: "POST",
        body,
      }),
    }),
    changePassword: builder.mutation({
      query: (body) => ({
        url: `${process.env.REACT_APP_SERVER_URI}/api/v1/secure/changePassword`,
        method: "POST",
        body,
      }),
    }),
    getBank: builder.query({
      query: () => `${process.env.REACT_APP_SERVER_URI}/api/v1/secure/getBank`,
    }),
  }),
});

export const {
  useAddBankMutation,
  useChangePasswordMutation,
  useGetBankQuery,
} = userMineApi;
