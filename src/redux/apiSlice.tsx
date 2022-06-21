import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from './store';
import {
  ApiUserArgs,
  ApiAnswerUser,
  ApiPostsArgs,
  ApiAnswerPosts,
  ApiFollowsArgs,
  ApiAnswerFollows,
} from '../data/types';

export const socialApi = createApi({
  reducerPath: 'socialApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://akademia108.pl/api/social-app/',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).user.token;

      if (token) {
        headers.set('Authorization', 'Bearer ' + token);
      }
      return headers;
    },
  }),
  refetchOnMountOrArgChange: true,
  endpoints: (builder) => ({
    user: builder.query<ApiAnswerUser, ApiUserArgs>({
      query: (data) => {
        return {
          url: `user/${data.url}`,
          method: 'POST',
          body: data.user,
        };
      },
    }),
    post: builder.query<ApiAnswerPosts, ApiPostsArgs>({
      query: (data) => {
        return {
          url: `post/${data.url}`,
          method: 'POST',
          body: data.post,
        };
      },
    }),
    follows: builder.query<ApiAnswerFollows, ApiFollowsArgs>({
      query: (data) => {
        return {
          url: `follows/${data.url}`,
          method: 'POST',
          body: data.follows,
        };
      },
    }),
  }),
});

export const { useUserQuery } = socialApi;
export const { usePostQuery } = socialApi;
export const { useFollowsQuery } = socialApi;
