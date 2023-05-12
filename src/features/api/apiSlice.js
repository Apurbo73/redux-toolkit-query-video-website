import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api", // ekhane api na likhe dileo api dhore nibe. we can add anything we want.
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:9000"
  }),
  endpoints: builder => ({
    getVideos: builder.query({
      query: () => "/videos",
      keepUnusedDataFor: 600
      //here 600 in seconds means 10 minutes.
    }),
    getVideo: builder.query({
      query: videoId => `/videos/${videoId}`
    }),
    getRelatedVideos: builder.query({
      query: ({ id, title }) => {
        const tags = title.split("");
        const likes = tags.map(tag => `title_like=${tag}`);
        const queryString = `/videos?${likes.join("&")} &_limit=4`;
        return queryString;
      }
    })
  })
});
export const {
  useGetVideosQuery,
  useGetVideoQuery,
  useGetRelatedVideosQuery
} = apiSlice;
