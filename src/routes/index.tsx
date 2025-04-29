import { Route, Routes, BrowserRouter } from "react-router"
import Login from "../pages/login"
import Dashboard from "../pages/dashboard"
import Formulario from "../pages/formlario"


export const Routers = () => {
    

    return (
        <BrowserRouter>
            <Routes>
                    <Route path="/" element={<Dashboard/>} />
                    <Route path="/login" element={<Login/>} />
                    <Route path="/inscricao" element={<Formulario/>} />
            </Routes>
        </BrowserRouter>



    )
}