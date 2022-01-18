/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import Input from "./Input";
import { handlePostState, useSSRPostsState } from "../atoms/postAtom";

function Feed() {
  const [realTimePosts, setRealTimePosts] = useState();
  const [handlePost, setHandlePost] = useRecoilState(handlePostState);
  const [useSSRPosts, setUseSSRPosts] = useRecoilState(useSSRPostsState);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/posts", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const resdata = await res.json();

      setRealTimePosts(resdata);
      setHandlePost(false);
      setUseSSRPosts(false);
    };
    fetchPosts();
  }, [handlePost]);
  console.log(realTimePosts);

  return (
    <div className="space-y-6 pb-24 max-w-lg">
      <Input />
      {realTimePosts.map((post) => (
        <div key={post._id}>
          <h4>{post.input}</h4>
          <img src={post.photoUrl} alt="postImage" />
        </div>
      ))}
    </div>
  );
}

export default Feed;
