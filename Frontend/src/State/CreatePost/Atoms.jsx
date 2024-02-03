import { atom } from "recoil";

const Post = atom({
  key: "Post",
  default: {
    title:"",
    content:"",
    image:"",
  },
});

const createPostImage = atom({
  key: "createPostImage",
  default: "",
});

const createPostImageUrl = atom({
  key: "createPostImageUrl",
  default: "",
});

export { createPostImage, createPostImageUrl, Post };
