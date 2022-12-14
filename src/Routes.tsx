import {
  BrowserRouter as Router,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";

import Login from "@/pages/login/Login";

import ListPacking from "./pages/packing/ListPacking";
import ListProducts from "./pages/product/ListProducts";
import ListSupplies from "./pages/supplies/ListSupplies";

const PrivateRoute = () => {
  const auth = localStorage.getItem("token");
  return auth ? <Outlet /> : <Navigate to="/login" />;
};

export const AllRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route path="/produtos" element={<ListProducts />} />
          <Route path="/produtos/cadastro" />
          <Route path="/produtos/edit/:id" />
          <Route path="/produtos/:id" />
          <Route path="/receitas" />
          <Route path="/receitas/novo" />
          <Route path="/receitas/:id" />
          <Route path="/embalagem" element={<ListPacking />} />
          <Route path="/insumos" element={<ListSupplies />} />
        </Route>
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};
