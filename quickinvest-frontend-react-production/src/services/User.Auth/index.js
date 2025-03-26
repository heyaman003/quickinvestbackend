import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../Config/Env";
import { getLocalStorage } from "../../utils/localStorage";

export const userAuthApi = createApi({
  reducerPath: "userAuthApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      headers.set("authorization", getLocalStorage("quickinvest_token"));
      return headers;
    },
  }),
  tagTypes: ["user"], // automatic-data fetching
  endpoints: (builder) => ({
    // For User SignUp
    signUpUser: builder.mutation({
      query: (body) => ({
        url: "http://localhost:8000/api/v1/public/register",
        method: "POST",
        body,
      }),
      invalidatesTags: ["user"], // automatic-data fetching
    }),
    // For User Login
    logInUser: builder.mutation({
      query: (body) => ({
        url: "http://localhost:8000/api/v1/public/login",
        method: "POST",
        body,
      }),
      invalidatesTags: ["user"], // automatic-data fetching
    }),
    // For forget password
    forgotPassWord: builder.mutation({
      query: (body) => ({
        url: "http://localhost:8000/api/v1/public/forgotPassword",
        method: "POST",
        body,
      }),
      invalidatesTags: ["user"], // automatic-data fetching
    }),
    // For reset password
    resetPassWord: builder.mutation({
      query: (body) => ({
        url: `http://localhost:8000/api/v1/public/resetPassword?token=${body.token}`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["user"], // automatic-data fetching
    }),

    //sponsorID Validation
    getValidateSponsorId: builder.query({
      query: (userId) => `http://localhost:8000/api/v1/public/checkSponsorId?userId=${userId}`,
      providesTags: ["Validate"], // automatic-data fetching
    }),
    //get Pdf Link
    getPdfLink: builder.query({
      query: (userId) => `http://localhost:8000/api/v1/public/getPdfLink`,
      providesTags: ["Validate"], // automatic-data fetching
    }),
  }),
});

export const {
  useSignUpUserMutation,
  useLogInUserMutation,
  useForgotPassWordMutation,
  useResetPassWordMutation,
  useGetValidateSponsorIdQuery,
  useGetPdfLinkQuery,
} = userAuthApi;
