
import { useNavigate } from "react-router"
import { ToastContainer } from "react-toastify"


type params = {
    onClose: (e: any) => void
}


export default function LogoutModal({ onClose }: params) {

    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem("user")
        navigate("/login")
    }

    return (
        <>
            <ToastContainer />
            <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">

                <div className="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto duration-300 ease-in">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <div className="relative md:w-[20%] p-10 transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 ">
                            <div className="mt-3 place-items-center space-y-4 text-center sm:mt-0 sm:ml-4 sm:text-left text-[#474747]">
                                <div className="flex space-x-2 items-center p-2 text-red-600 bg-red-100 rounded-full">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                        className="lucide lucide-log-out-icon lucide-log-out"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" x2="9" y1="12" y2="12" /></svg>
                                </div>
                                <div className="text-[#474747] text-lg font-semibold">Deseja mesmo Sair?</div>
                                <div className="flex space-x-2 justify-center w-full">
                                    <button type="button" onClick={handleLogout} className="text-white bg-red-600 hover:bg-red-700 duration-300 p-2 w-full rounded-lg cursor-pointer">Sair</button>
                                    <button type="button" onClick={() => onClose(false)} className="text-[#474747] ring-1 ring-zinc-200 duration-300 hover:bg-zinc-100 p-2 w-full 
                                    rounded-lg bg-zinc-50 cursor-pointer">Cancelar</button>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}