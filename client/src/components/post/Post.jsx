import { useState } from "react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import DOMPurify from "dompurify";
import moment from "moment";
import { Link } from "react-router-dom";
import Comments from "../comments/Comments";
import {
  Card,
  Button,
  ButtonGroup,
  Dropdown,
  Image,
} from "react-bootstrap";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

const Post = ({ post }) => {
  const [commentOpen, setCommentOpen] = useState(false);
  // const [menuOpen, setMenuOpen] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const { isLoading, data } = useQuery(["likes", post.id], () =>
    makeRequest.get("/likes?postId=" + post.id).then((res) => res.data)
  );

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (liked) => {
      if (liked) return makeRequest.delete("/likes?postId=" + post.id);
      return makeRequest.post("/likes", { postId: post.id });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["likes"]);
      },
    }
  );

  const deleteMutation = useMutation(
    () => makeRequest.delete("/posts/" + post.id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["posts"]);
      },
    }
  );

  const handleLike = () => {
    mutation.mutate(data.includes(currentUser.id));
  };

  const handleDelete = () => {
    deleteMutation.mutate();
  };

  return (
    <Card className="mb-3">
      <Card.Body>
        <div className="d-flex justify-content-between mb-3">
          <div className="d-flex align-items-center">
            <Image
              src={"/upload/" + post.profilePic}
              alt=""
              className="rounded-circle me-2"
              width={40}
              height={40}
            />
            <div>
              <Link
                to={`/profile/${post.userId}`}
                className="text-decoration-none text-dark"
              >
                <span className="fw-bold">{post.name}</span>
              </Link>
              <br />
              <span className="text-muted">{moment(post.createdAt).fromNow()}</span>
            </div>
          </div>
          {post.userId === currentUser.id && (
            <Dropdown>
              <Dropdown.Toggle variant="light" id="dropdown-basic">
                <MoreHorizIcon />
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={handleDelete}>Delete</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )}
        </div>

        <h1 className="mb-3">{post.title}</h1>

        <div className="text-center mb-3">
          <Image
            src={"/upload/" + post.img}
            alt=""
            fluid
            className="post-image img-fluid"
            style={{ maxHeight: "300px", objectFit: "cover" }}
          />
        </div>

        <p className="mb-3" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.desc) }} />

        <div className="d-flex align-items-center">
          <ButtonGroup>
            {isLoading ? (
              "Loading"
            ) : (
              <>
                {data.includes(currentUser.id) ? (
                  <Button variant="danger" onClick={handleLike}>
                    <FavoriteOutlinedIcon style={{ color: "red" }} />
                  </Button>
                ) : (
                  <Button variant="light" onClick={handleLike}>
                    <FavoriteBorderOutlinedIcon />
                  </Button>
                )}
                <Button variant="light" onClick={() => setCommentOpen(!commentOpen)}>
                  <TextsmsOutlinedIcon />
                </Button>
                <Button variant="light">
                  <ShareOutlinedIcon />
                </Button>
              </>
            )}
          </ButtonGroup>
          <span className="ms-2">{data?.length} Likes</span>
        </div>

        {commentOpen && <Comments postId={post.id} />}
      </Card.Body>
    </Card>
  );
};

export default Post;
