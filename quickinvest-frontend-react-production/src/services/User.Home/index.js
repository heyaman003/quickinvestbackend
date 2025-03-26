import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../Config/Env";
import { getLocalStorage } from "../../utils/localStorage";

export const userHomeApi = createApi({
  reducerPath: "userHomeReducer",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      headers.set("authorization", getLocalStorage("quickinvest_token"));
      return headers;
    },
  }),
  tagTypes: ["user"], // automatic-data fetching
  endpoints: (builder) => ({
    getUserDashboardData: builder.query({
      query: () => `${process.env.REACT_APP_SERVER_URI}/api/v1/secure/get_user_dashboard_data`,
    }),
  }),
});

export const { useGetUserDashboardDataQuery } = userHomeApi;
