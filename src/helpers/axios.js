import axios from "axios";

export const request = axios.create({
  baseURL: "https://public-api.wordpress.com/rest/v1.1/",
});

export const ENDPOINTS = {
  POSTS: "sites/en.blog.wordpress.com/posts",
  COMMENTS: "sites/en.blog.wordpress.com/comments",
  TRENDS: "read/trending/tags",
  TAXONOMY: "sites/en.blog.wordpress.com/categories",
};

export const CHUNK_SIZE = 6;
