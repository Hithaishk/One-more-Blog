import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import { makeRequest } from "../../axios";

import "bootstrap/dist/css/bootstrap.min.css";


export const Write = () => {
  const state = useLocation().state;
  const [value, setValue] = useState(state?.title || "");
  const [title, setTitle] = useState(state?.desc || "");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state?.cat || "");

  const navigate = useNavigate();

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const imgUrl = await upload();

    try {
      state
        ? await makeRequest.put(`/posts/${state.id}`, {
            title,
            desc: value,
            img: file ? imgUrl : "",
            createdAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            cat,
          })
        : await makeRequest.post(`/posts/`, {
            title,
            desc: value,
            img: file ? imgUrl : "",
            createdAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            cat,
          });

      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-8">
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="form-group">
            <ReactQuill
              className="editor"
              theme="snow"
              value={value}
              onChange={setValue}
            />
          </div>
        </div>
        <div className="col-md-4">
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">Publish</h5>
              <p>
                <b>Status: </b> Draft
              </p>
              <p>
                <b>Visibility: </b> Public
              </p>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                onChange={(e) => setFile(e.target.files[0])}
              />
              <label className="btn btn-outline-secondary btn-sm" htmlFor="file">
                Upload Image
              </label>
              <div className="mt-2">
                <button className="btn btn-outline-secondary btn-sm mr-2">
                  Save as a draft
                </button>
                <button className="btn btn-primary btn-sm" onClick={handleClick}>
                  Publish
                </button>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Category</h5>
              {["art", "science", "technology", "cinema", "design", "food"].map((category) => (
                <div className="form-check" key={category}>
                  <input
                    className="form-check-input"
                    type="radio"
                    checked={cat === category}
                    name="cat"
                    value={category}
                    id={category}
                    onChange={(e) => setCat(e.target.value)}
                  />
                  <label className="form-check-label" htmlFor={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Write;
