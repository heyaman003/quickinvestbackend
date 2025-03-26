import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../Config/Env";
import { getLocalStorage } from "../../utils/localStorage";

export const adminDashboardApi = createApi({
  reducerPath: "adminDashboardApi",
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
    getDashboardInfoAdmin: builder.query({
      query: () => `${process.env.REACT_APP_SERVER_URI}/api/v1/private/get_admin_dashboard_data`,
      providesTags: ["admin"], // automatic-data fetching
    }),
  }),
});

export const { useGetDashboardInfoAdminQuery } = adminDashboardApi;
