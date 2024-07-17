import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import "./style.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/authContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {Write} from './pages/write/Write';

function App() {
  const { currentUser } = useContext(AuthContext);

  const { darkMode } = useContext(DarkModeContext);

  const queryClient = new QueryClient();

  const Layout = () => {
    return (
      <QueryClientProvider client={queryClient}>
        <div className={`theme-${darkMode ? "dark" : "light"}`}>
          <Navbar />
          
            <div style={{ flex: 6 }}>
              <Outlet />
            </div>
            
        
        </div>
      </QueryClientProvider>
    );
  };

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/profile/:id",
          element: <Profile />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/write",
      element: <Write />,
    },

  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
// import React, { useContext } from "react";
// import { BrowserRouter as Router, Routes, Route,useNavigate } from "react-router-dom";
// import Navbar from "./components/navbar/Navbar";
// import Home from "./pages/home/Home";
// import Profile from "./pages/profile/Profile";
// import Login from "./pages/login/Login";
// import Register from "./pages/register/Register";
// import Write from "./pages/write/Write";
// import { AuthContext } from "./context/authContext";
// import { DarkModeContext } from "./context/darkModeContext";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// function App() {
//   const { currentUser } = useContext(AuthContext);
//   const { darkMode } = useContext(DarkModeContext);
//   const queryClient = new QueryClient();
//   const Navigate= useNavigate();

//   const Layout = ({ children }) => {
//     return (
//       <QueryClientProvider client={queryClient}>
//         <div className={`theme-${darkMode ? "dark" : "light"}`}>
//           <Navbar />
//           <div style={{ flex: 6 }}>{children}</div>
//         </div>
//       </QueryClientProvider>
//     );
//   };

//   const ProtectedRoute = ({ element }) => {
//     return currentUser ? element : <Navigate to="/login" />;
//   };

//   return (
//     <Router>
//       <Layout>
//         <Routes>
//           <Route
//             path="/"
//             element={
//               <ProtectedRoute element={<Home />} />
//             }
//           />
//           <Route path="/profile/:id" element={<Profile />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/write" element={<Write />} />
//         </Routes>
//       </Layout>
//     </Router>
//   );
// }

// export default App;
