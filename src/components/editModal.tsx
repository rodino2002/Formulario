import {
    //useQuery,
    useQueryClient
} from "@tanstack/react-query"
import axios from "axios"
import { useState } from "react"
import { toast, ToastContainer } from "react-toastify"



type dataType = {
    id: number
    nome: string
    atributo: string
    orgao: string
    observacao: string
}

type params = {
    onClose: (e: any) => void
    itemSelected: dataType | null
}


export default function ModalEdit({ onClose, itemSelected }: params) {
    const queryClient = useQueryClient()
    const url = import.meta.env.PROD ? import.meta.env.VITE_PRODUCTION_API_URL : import.meta.env.VITE_DEVELOPMENT_API_URL

    const [formData, setFormData] = useState({
        nome: itemSelected?.nome,
        atributo: itemSelected?.atributo,
        orgao: itemSelected?.orgao,
        observacao: itemSelected?.observacao,
    })

    console


    async function editData(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        //const [loading, setLoading] = useState(false)
        //const [isLoading, setisLoading] = useState(false)
        const params = {
            nome: formData.nome,
            atributo: formData.atributo,
            orgao: formData.orgao,
            observacao: formData.observacao,
        }


        try {
            // setLoading(true)
            await axios.put(`${url}/delegados/${itemSelected?.id}`, params,
                {
                    withCredentials: true, // importante para enviar cookies/sessão
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )

            queryClient.invalidateQueries({
                queryKey: ['delegados']
            })

            onClose(false)

            toast.success('Registo editado com suceso!', {
                className: 'text-[#474747] ',
                position: 'bottom-right',
                autoClose: 3000,
                pauseOnFocusLoss: false,
                icon: <svg width="49" height="49" viewBox="0 0 49 49" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="24.5" cy="24.5" r="24.5" fill="#1FC16B" fill-opacity="0.18" />
                    <path d="M35 17.5L21.25 31.25L15 25" stroke="#1FC16B" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                </svg>

            })

            //setLoading(false)
            //return data
        } catch (error) {
            console.log(error)
            //setLoading(false)
            toast.error(`Erro ao editar registo`, {
                className: 'text-[#474747] ',
                position: 'bottom-right',
                autoClose: 3000,
                pauseOnFocusLoss: false,
                icon: <svg width="49" height="49" viewBox="0 0 49 49" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="24.5" cy="24.5" r="24.5" fill="#FB3748" fillOpacity="0.16" />
                    <path d="M32.5 17.5L17.5 32.5" stroke="#FB3748" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M17.5 17.5L32.5 32.5" stroke="#FB3748" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>,
            })
        }
    }



    return (
        <>
            <ToastContainer/>
        <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">

            <div className="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto duration-300 ease-in">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <div className="relative md:w-[50%] transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 ">


                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left text-[#474747]">
                            <div className="flex space-x-2 items-center p-5">
                                <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                    className="lucide lucide-notebook-pen-icon lucide-notebook-pen mt-1"><path d="M13.4 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.4" /><path d="M2 6h4" /><path d="M2 10h4" />
                                    <path d="M2 14h4" /><path d="M2 18h4" /><path d="M21.378 5.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z" /></svg>
                                <h3 className="text-center text-2xl font-semibold text-gray-900" id="modal-title">Editar Registo</h3>
                            </div>

                            <form onSubmit={editData} className="mt-10 p-10 ">

                                <div className="flex space-y-4 space-x-10 items-center">
                                    <div className="space-y-4 w-full">

                                        <div className="flex flex-col space-y-2">
                                            <label className="text-[#474747] text-sm">Nome Completo</label>
                                            <input value={formData.nome} onChange={(e) => setFormData({ ...formData, nome: e.target.value })} required type="text" placeholder="digite seu nome"
                                                className="ring-1 ring-zinc-100 p-2 text-sm text-[#474747] rounded-lg focus:outline-none 
           focus:ring-1 focus:ring-sky-800 " />
                                        </div>
                                        <div className="flex flex-col space-y-2">
                                            <label className="text-[#474747] text-sm">Atributo</label>
                                            <select
                                                value={formData.atributo} onChange={(e) => setFormData({ ...formData, atributo: e.target.value })}
                                                required

                                                className="ring-1 ring-zinc-100 p-2 text-sm text-[#474747] focus:outline-none focus:ring-1 focus:ring-sky-800  rounded-lg" >

                                                <option>Selecione...</option>
                                                <option>Delegado</option>
                                                <option>Ex-ofício</option>
                                                <option>Suplente</option>

                                            </select>
                                        </div>

                                    </div>
                                    <div className="space-y-4 w-full">

                                        <div className="flex flex-col space-y-2">
                                            <label className="text-[#474747] text-sm">Órgão</label>
                                            <select
                                                value={formData.orgao} onChange={(e) => setFormData({ ...formData, orgao: e.target.value })}
                                                required

                                                className="ring-1 ring-zinc-100 p-2 text-sm text-[#474747] focus:outline-none focus:ring-1 focus:ring-sky-800 rounded-lg" >

                                                <option>Selecione...</option>
                                                <option>Associação Norte</option>
                                                <option>Associação Sul</option>
                                                <option>Associação Oeste</option>
                                                <option>Associação Noroeste</option>
                                                <option>Associação Centro</option>
                                                <option>União</option>

                                            </select>
                                        </div>
                                        <div className="flex flex-col space-y-2">
                                            <label className="text-[#474747] text-sm">Observação</label>
                                            <textarea
                                                value={formData.observacao} onChange={(e) => setFormData({ ...formData, observacao: e.target.value })}
                                                placeholder="Escreva aqui sua observação..."
                                                className="ring-1 p-2 ring-zinc-100 text-sm text-[#474747] focus:outline-none focus:ring-1 focus:ring-sky-800  rounded-lg" >
                                            </textarea>


                                        </div>
                                    </div>
                                </div>
                                <div className="flex space-x-10 items-center justify-between">
                                    <button type="submit" className="bg-sky-800 w-[50%] mt-10 hover:bg-sky-700 cursor-pointer text-white flex justify-center p-2 rounded-lg  duration-300">
                                        {/* { loading ? 
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" 
                                    className="lucide lucide-loader-circle-icon lucide-loader-circle"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
                                     : "Salvar"} */}
                                        Salvar
                                    </button>
                                    <button type="button" onClick={() => onClose(false)} className="bg-red-600 w-[50%] mt-10 hover:bg-red-700 cursor-pointer text-white flex justify-center p-2 rounded-lg  duration-300">

                                        Cancelar
                                    </button>
                                </div>
                            </form>

                        </div>





                    </div>
                </div>
            </div>
        </div>
        </>

    )
}