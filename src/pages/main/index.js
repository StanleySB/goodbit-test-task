import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

// eslint-disable-next-line
const Main = () => {
  // form state
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [newPost, setNewPost] = useState({});
  const [disabledForm, setDisabledForm] = useState(0);
  const apiUrl = "/posts";
  const [
    { response: postSubmitResponse, error: postSubmitError },
    postSubmitFetch,
  ] = useFetch(apiUrl);

  //posts state
  const [
    { isLoading: getPostsIsLoading, response: getPostsResponse },
    getPostsFetch,
  ] = useFetch(apiUrl);
  const [postsArray, setPostsArray] = useState([]);
  const [deletedPostId, setDeletedPostId] = useState();
  const [
    { isLoading: deletePostIsLoading, response: deltePostResponse },
    deletePostFetch,
  ] = useFetch(`/posts/${deletedPostId}`);

  // form actions
  const onPostSubmit = (e) => {
    e.preventDefault();
    setId(parseInt(Date.now().toString()));
    postSubmitFetch({
      method: "post",
      data: {
        id: id,
        title: title,
        body: description,
      },
    });
    setDisabledForm(1);
  };

  //set new post to state
  useEffect(() => {
    setDisabledForm(0);
    if (postSubmitResponse) {
      setNewPost({ id: id, title: title, body: description });
    }
  }, [postSubmitResponse, postSubmitError, id, title, description]);

  //posts actions
  useEffect(() => {
    getPostsFetch();
  }, [getPostsFetch]);

  useEffect(() => {
    if (getPostsIsLoading || getPostsResponse === null) return;
    getPostsResponse.data && setPostsArray(getPostsResponse.data);
  }, [getPostsResponse, getPostsIsLoading]);

  useEffect(() => {
    newPost.id &&
      (postsArray.length > 0
        ? setPostsArray([...postsArray, newPost])
        : setPostsArray([newPost]));
  }, [newPost]);

  //delete post
  const onDeleteHandler = (id) => {
    setDeletedPostId(id);
    deletePostFetch({
      method: "delete",
    });
  };

  useEffect(() => {
    if (deletePostIsLoading || deltePostResponse === null) return;
    let newPostArray = [];
    newPostArray = postsArray.filter((post) => post.id !== deletedPostId);
    setPostsArray(newPostArray);
  }, [deltePostResponse, deletedPostId, deletePostIsLoading]);

  //template
  return (
    <div className="container">
      <form className="col-md-5 mb-5 mt-5 m-auto">
        <div className="form-group">
          <label htmlFor="titleInput">Title</label>
          <input
            disabled={disabledForm}
            required
            type="text"
            className="form-control"
            id="titleInput"
            placeholder="Enter title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="descriptionInput">Description</label>
          <input
            disabled={disabledForm}
            required
            type="text"
            className="form-control"
            id="descriptionInput"
            placeholder="Enter description"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button
          disabled={disabledForm}
          onClick={onPostSubmit}
          type="submit"
          className="btn btn-primary"
        >
          Add post
        </button>
      </form>
      <div className="posts-items col-md-8 m-auto">
        {postsArray.length > 0 &&
          postsArray.map((post) => {
            return (
              <div className="card mt-2" key={post.id}>
                <div className="card-header">{post.title}</div>
                <div className="card-body">
                  <div className="card-text">{post.body}</div>
                </div>
                <Link
                  className="btn btn-secondary"
                  to={{
                    pathname: `/posts/${post.id}`,
                  }}
                >
                  Подробнее
                </Link>
                <button
                  className="btn btn-danger"
                  onClick={() => onDeleteHandler(post.id)}
                >
                  Удалить
                </button>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Main;
