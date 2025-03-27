import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../Config/Env";
import { getLocalStorage } from "../../utils/localStorage";

export const userTeamApi = createApi({
  reducerPath: "userTeamApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      headers.set("authorization", getLocalStorage("quickinvest_token"));
      return headers;
    },
  }),
  tagTypes: ["user"], // automatic-data fetching done
  endpoints: (builder) => ({
    getUserTeams: builder.query({
      query: (body) =>
        `${process.env.REACT_APP_SERVER_URI}/api/v1/secure/get_user_team?page=${body.page}&limit=${body.limit}`,
    }),
  }),
});

export const { useGetUserTeamsQuery } = userTeamApi;
