// import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { Card, Spinner, Alert } from "react-bootstrap";
import Post from "../post/Post";
// import "./posts.scss";

const Posts = () => {
  const { isLoading, error, data } = useQuery(["posts"], () =>
    makeRequest.get(`/posts${window.location.search}`).then((res) => res.data)
  );

  return (
    <div className="posts">
      {error ? (
        <Alert variant="danger">Something went wrong!</Alert>
      ) : isLoading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <div className="row">
          {data.map((post) => (
            <div key={post.id} className="col-12">
              <Card>
                <Card.Body>
                  <Post post={post} />
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Posts;
