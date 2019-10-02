import React, { useEffect, useState } from "react";
import { Link } from "@reach/router";

const POSTS_URL = "http://localhost:5000/api/posts";

function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const requestPosts = async () => {
      const response = await fetch(POSTS_URL);
      const { data } = await response.json();
      setPosts(data);
    };
    requestPosts();
  }, []);

  return (
    <>
      <h1>List of posts</h1>
      {posts.map(post => (
        <div>{post.attributes.title}</div>
      ))}
      <Link to="/add" >Add post</Link>
    </>
  );
}

export default PostList;
