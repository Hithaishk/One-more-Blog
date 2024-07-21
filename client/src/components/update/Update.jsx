import { useState } from "react";
import { makeRequest } from "../../axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Update = ({ setOpenUpdate, user }) => {
  const [cover, setCover] = useState(null);
  const [profile, setProfile] = useState(null);
  const [texts, setTexts] = useState({
    email: user.email,
    password: user.password,
    name: user.name,
    city: user.city,
  });

  const upload = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setTexts((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (user) => {
      return makeRequest.put("/users", user);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["user"]);
        setOpenUpdate(false); // Close the modal after update
      },
    }
  );

  const handleClick = async (e) => {
    e.preventDefault();

    let coverUrl;
    let profileUrl;
    coverUrl = cover ? await upload(cover) : user.coverPic;
    profileUrl = profile ? await upload(profile) : user.profilePic;
    
    mutation.mutate({ ...texts, coverPic: coverUrl, profilePic: profileUrl });
    setCover(null);
    setProfile(null);
  };

  return (
    <Modal show={true} onHide={() => setOpenUpdate(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Update Your Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Cover Picture</Form.Label>
            <div className="imgContainer position-relative">
              <img
                src={cover ? URL.createObjectURL(cover) : "/upload/" + user.coverPic}
                alt=""
                className="img-fluid rounded"
              />
              <CloudUploadIcon className="icon position-absolute bottom-0 end-0 m-2 text-white bg-dark rounded-circle cursor-pointer" />
            </div>
            <Form.Control
              type="file"
              onChange={(e) => setCover(e.target.files[0])}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Profile Picture</Form.Label>
            <div className="imgContainer position-relative">
              <img
                src={profile ? URL.createObjectURL(profile) : "/upload/" + user.profilePic}
                alt=""
                className="img-fluid rounded"
              />
              <CloudUploadIcon className="icon position-absolute bottom-0 end-0 m-2 text-white bg-dark rounded-circle cursor-pointer" />
            </div>
            <Form.Control
              type="file"
              onChange={(e) => setProfile(e.target.files[0])}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              value={texts.email}
              name="email"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="text"
              value={texts.password}
              name="password"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={texts.name}
              name="name"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Country / City</Form.Label>
            <Form.Control
              type="text"
              name="city"
              value={texts.city}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setOpenUpdate(false)}>
          Close
        </Button>
        <Button variant="primary" onClick={handleClick}>
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Update;
