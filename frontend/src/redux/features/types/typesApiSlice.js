/* eslint-disable no-unused-vars */
import { apiSlice } from "@/redux/api/apiSlice";
import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";

const TYPES_URL = "/api/type";

const typesAdapter = createEntityAdapter({});

const initialState = typesAdapter.getInitialState();

export const typesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTypes: builder.query({
      query: (arg) => ({
        url: `${TYPES_URL}/get-all-type`,
      }),
      invalidatesTags: [{ type: "Type", id: "LIST" }],
    }),
  }),
});

export const { useGetTypesQuery } = typesApiSlice;
