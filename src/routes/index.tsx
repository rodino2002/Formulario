import { Route, Routes, BrowserRouter } from "react-router"
import Login from "../pages/login"
import Dashboard from "../pages/dashboard"
import Formulario from "../pages/formlario"
import { Navigate } from "react-router"
import { JSX } from "react"


//FALTA AJUSTAR AS ROTAS PRIVADAS

interface Props {
  children: JSX.Element;
}

export const PrivateRoute = ({ children }: Props) => {
  const isAuthenticated = !!localStorage.getItem("user");
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export const PublicRoute = ({ children }: Props) => {
    const isAuthenticated = !!localStorage.getItem("user");
    return !isAuthenticated ? children : <Navigate to="/" />;
  };

  export const Routers = () => {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } />
          <Route path="/login" element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } />
          <Route path="/inscricao" element={
              <Formulario />
          } />
        </Routes>
      </BrowserRouter>
    );
  };