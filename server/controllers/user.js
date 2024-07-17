import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getUser = (req, res) => {
  const userId = req.params.userId;
  const q = "SELECT * FROM users WHERE id=?";

  db.query(q, [userId], (err, data) => {
    if (err) return res.status(500).json(err);
    const { password, ...info } = data[0];
    return res.json(info);
  });
};

// export const updateUser = (req, res) => {
//   const token = req.cookies.accessToken;
//   if (!token) return res.status(401).json("Not authenticated!");

//   jwt.verify(token, "secretkey", (err, userInfo) => {
//     if (err) return res.status(403).json("Token is not valid!");

//     const q =
//       "UPDATE users SET `name`=?,`profilePic`=?,`coverPic`=? WHERE id=? ";

//     db.query(
//       q,
//       [
//         req.body.name,
//         req.body.city,
//         // req.body.website,
//         req.body.coverPic,
//         req.body.profilePic,
//         userInfo.id,
//       ],
//       (err, data) => {
//         if (err) res.status(500).json(err);
//         if (data.affectedRows > 0) return res.json("Updated!");
//         return res.status(403).json("You can update only your post!");
//       }
//     );
//   });

// };
export const updateUser = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q =
      "UPDATE users SET `name`=?, `profilePic`=?,`city`=?, `coverPic`=? WHERE id=?";

    db.query(
      q,
      [
        req.body.name,
        req.body.profilePic,
        req.body.city,

        req.body.coverPic,
        userInfo.id,
      ],
      (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.affectedRows > 0) {
          return res.json("Updated!");
        } else {
          return res.status(403).json("You can update only your post!");
        }
      }
    );
  });
};


export const getUserAccessInfo = (req, res) => {
  const token = req.cookies.accessToken; // Retrieve the access token from cookies
  if (!token) return res.status(401).json("Not authenticated!");

  // Verify the access token
  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    // Fetch user information including access information from the database
    const q = "SELECT id, username, access_level FROM users WHERE id=?";
    db.query(q, [userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length === 0) return res.status(404).json("User not found");

      // Extract necessary information and send response
      const { id, username, access_level } = data[0];
      return res.json({ id, username, access_level });
    });

  });
};