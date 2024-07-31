import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const api = createApi({
	baseQuery: fetchBaseQuery({
		baseUrl: process.env.EXPO_PUBLIC_API_URL,
		prepareHeaders: (headers) => {
			// headers.set("Content-Type", "multipart/form-data");
			return headers;
		},
	}),
	endpoints: () => ({}),
	tagTypes: ['GetLocation'],
});
export const {
	reducer: apiReducer,
	reducerPath: apiReducerPath,
	middleware: apiMiddleware,
	enhanceEndpoints,
	injectEndpoints,
	endpoints,
	util: apiUtilTool,
} = api;
