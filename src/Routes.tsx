import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Login } from "@/pages/login/Login";

// const isLogin = () => {};

export const AllRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};
