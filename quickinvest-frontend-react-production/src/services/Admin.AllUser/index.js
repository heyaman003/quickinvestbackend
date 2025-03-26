import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../Config/Env";
import { getLocalStorage } from "../../utils/localStorage";

export const adminMemberApi = createApi({
  reducerPath: "adminMemberApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      headers.set("authorization", getLocalStorage("quickinvest_token"));
      return headers;
    },
  }),
  tagTypes: ["admin", "adminUser"], // automatic-data fetching
  endpoints: (builder) => ({
    // getting all members for admin
    getAllMemberAdmin: builder.query({
      query: (body) => `${process.env.REACT_APP_SERVER_URI}/api/v1/private/user/get_all_users`,
      providesTags: ["adminUser"], // automatic-data fetching
    }),
    // getting active members for admin
    getActiveMemberAdmin: builder.query({
      query: (body) => `${process.env.REACT_APP_SERVER_URI}/api/v1/private/user/get_active_users`,
      providesTags: ["adminUser"], // automatic-data fetching
    }),
    // getting blocked members for admin
    getBlockedMemberAdmin: builder.query({
      query: (body) => `${process.env.REACT_APP_SERVER_URI}/api/v1/private/user/get_blocked_users`,
      providesTags: ["adminUser"], // automatic-data fetching
    }),
    editUserList: builder.mutation({
      query: (body) => ({
        url: `${process.env.REACT_APP_SERVER_URI}/api/v1/private/user/edit_users`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["adminUser"],
    }),
    editUserStatus: builder.mutation({
      query: (body) => ({
        url: `${process.env.REACT_APP_SERVER_URI}/api/v1/private/user/change_user_status`,
        method: "PUT",
        body: { user_id: body.userId },
      }),
      invalidatesTags: ["adminUser"],
    }),
    getRankStatusAdmin: builder.query({
      query: (query) =>
        `${process.env.REACT_APP_SERVER_URI}/api/v1/private/user/get_rank_status?page=${query.page}&limit=${query.limit}&rank=${query.rank}&rankType=${query.rankType}&searchById=${query.searchById}`,
      providesTags: ["adminUser"], // automatic-data fetching
    }),
  }),
});

export const {
  useGetAllMemberAdminQuery,
  useGetActiveMemberAdminQuery,
  useGetBlockedMemberAdminQuery,
  useEditUserListMutation,
  useEditUserStatusMutation,
  useGetRankStatusAdminQuery,
} = adminMemberApi;
