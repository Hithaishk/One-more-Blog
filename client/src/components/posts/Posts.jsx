import Post from "../post/Post";
import "./posts.scss";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";

// const Posts = ({userId}) => {
//   const { isLoading, error, data } = useQuery(["posts"], () =>
//     makeRequest.get("/posts?userId="+userId).then((res) => {
//       return res.data;
//     })
//   );
const Posts = () => {
  const { isLoading, error, data } = useQuery(["posts"], () =>
    // makeRequest.get("/posts${cat}").then((res) => {
    //   return res.data;
    // })
    makeRequest.get(`/posts${window.location.search}`).then((res) => {
      return res.data;
    })
  );

  return (
    <div className="posts">
      {error
        ? "Something went wrong!"
        : isLoading
        ? "loading"
        : data.map((post) => <Post post={post} key={post.id} />)}
    </div>
  );
};

export default Posts;
