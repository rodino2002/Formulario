import { Route, Routes, BrowserRouter } from "react-router"
import App from "../pages/App"



export const Routers = () => {
    

    return (
        <BrowserRouter>
            <Routes>
                    <Route path="/" element={<App/>} />
                   
            </Routes>
        </BrowserRouter>



    )
}