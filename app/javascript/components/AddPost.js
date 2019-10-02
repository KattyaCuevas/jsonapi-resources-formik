import React from "react";
import { Link, navigate } from "@reach/router";
import { Formik } from "formik";

const POSTS_URL = "http://localhost:5000/api/posts";

function AddPost() {
  const handleSubmit = values => {
    const addPost = async () => {
      const csrfToken = document.querySelector("meta[name=csrf-token]").content;
      const response = await fetch(POSTS_URL, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/vnd.api+json",
          "X-CSRF-Token": csrfToken
        },
        body: JSON.stringify({ data: values })
      });
      if (response.status === 201) {
        navigate("/");
      }
    };
    addPost();
  };

  return (
    <div>
      <h2>Add your post</h2>
      <Formik
        initialValues={{
          type: "posts",
          attributes: {
            title: "",
            body: ""
          }
        }}
        onSubmit={handleSubmit}
        render={({ values, handleSubmit, handleChange }) => (
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="attributes.title">Title</label>
              <input
                type="text"
                id="attributes.title"
                name="attributes.title"
                onChange={handleChange}
                value={values.attributes.title}
              />
            </div>
            <div>
              <label htmlFor="attributes.body">Body</label>
              <textarea
                type="text"
                id="attributes.body"
                name="attributes.body"
                onChange={handleChange}
                value={values.attributes.body}
              />
            </div>

            <button type="submit">Create</button>
            <Link to="/">
              <button>Cancel</button>
            </Link>
          </form>
        )}
      />
    </div>
  );
}

export default AddPost;
