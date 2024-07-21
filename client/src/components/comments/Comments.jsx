import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import moment from "moment";

const Comments = ({ postId }) => {
  const [desc, setDesc] = useState("");
  const { currentUser } = useContext(AuthContext);

  const { isLoading, error, data } = useQuery(["comments"], () =>
    makeRequest.get("/comments?postId=" + postId).then((res) => {
      return res.data;
    })
  );

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (newComment) => {
      return makeRequest.post("/comments", newComment);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["comments"]);
      },
    }
  );

  const handleClick = async (e) => {
    e.preventDefault();
    mutation.mutate({ desc, postId });
    setDesc("");
  };

  return (
    <div className="container">
      <div className="card mb-3">
        <div className="card-body">
          <div className="d-flex align-items-center mb-3">
            <img
              src={"/upload/" + currentUser.profilePic}
              alt=""
              className="rounded-circle"
              style={{ width: "40px", height: "40px", objectFit: "cover" }}
            />
            <input
              type="text"
              className="form-control ms-3"
              placeholder="Write a comment"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
            <button
              className="btn btn-primary ms-3"
              onClick={handleClick}
            >
              Send
            </button>
          </div>
          {error ? (
            <div className="alert alert-danger">Something went wrong</div>
          ) : isLoading ? (
            <div>Loading...</div>
          ) : (
            data.map((comment) => (
              <div className="d-flex align-items-start mb-3" key={comment.id}>
                <img
                  src={"/upload/" + comment.profilePic}
                  alt=""
                  className="rounded-circle"
                  style={{ width: "40px", height: "40px", objectFit: "cover" }}
                />
                <div className="ms-3 flex-grow-1">
                  <div className="d-flex justify-content-between">
                    <strong>{comment.name}</strong>
                    <span className="text-muted" style={{ fontSize: "12px" }}>
                      {moment(comment.createdAt).fromNow()}
                    </span>
                  </div>
                  <p className="mb-0">{comment.desc}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Comments;
