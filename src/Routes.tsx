import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { Login } from "@/pages/login/Login";

// const isLogin = () => {};

export const AllRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
};
