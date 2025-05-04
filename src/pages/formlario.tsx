import { useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { useState } from "react"
import { toast, ToastContainer } from "react-toastify"

// type dataType = {
//   id: number
//   nome: string
//   atributo: string
//   orgao: string
//   observacao: string
// }

export default function Formulario() {

  
  const url = import.meta.env.PROD? import.meta.env.VITE_PRODUCTION_API_URL:  import.meta.env.VITE_DEVELOPMENT_API_URL  
  
  const queryClient = useQueryClient()
  const [loading, setLoading] = useState(false)

    const [formData, setFormData] = useState({
        nome: "",
        atributo: "",
        orgao: "",
        observacao: "",
    })

    const clearForm = () => {
      setFormData({
      nome: "",
      atributo: "",
      orgao: "",
      observacao: "",})
  }


    async function addData(e: React.FormEvent<HTMLFormElement>) {
            e.preventDefault();
    
            //const [loading, setLoading] = useState(false)
            //const [isLoading, setisLoading] = useState(false)
            const params = {
                nome: formData.nome,
                atributo: formData.atributo,
                orgao: formData.orgao,
                observacao: formData.observacao,
            }

            if( formData.atributo === "" || formData.orgao === ""){
              toast.warning("Preencha todos os campos", {
                className: 'text-[#474747] ',
                position: 'bottom-right',
                autoClose: 3000,
                pauseOnFocusLoss: false,
                
            })
              return
            }
            
    
            try { 
               setLoading(true)
               
                await axios.post(`${url}/delegados`, params, 
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

                clearForm()
                setLoading(false)
                toast.success('Registo adicionado com suceso!', {
                  className: 'text-[#474747] ',
                  position: 'bottom-right',
                  autoClose: 3000,
                  pauseOnFocusLoss: false,
                  icon: <svg width="49" height="49" viewBox="0 0 49 49" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="24.5" cy="24.5" r="24.5" fill="#1FC16B" fill-opacity="0.18" />
                      <path d="M35 17.5L21.25 31.25L15 25" stroke="#1FC16B" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
  
              })
                
               // onClose(false)
                //return data
            } catch (error) {
                console.log(error)
                setLoading(false)
                toast.error(`Falha ao adicionar registo`, {
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
    <div className="w-full md:ml-10 pt-2 bg-white">
      <div className="flex justify-center md:justify-start">
          <img src="icon_02.png" className=" w-5 md:w-10"/>
      </div>
    </div>
      <div className="place-items-center pt-2 md:pt-20 p-5 md:ml-0 md:w-full">
        
        <p className="text-sm text-center md:text-3xl font-semibold text-zinc-700 mb-2 md:mb-10">CADASTRAMENTO DOS DELEGADOS</p>
        <p className="text-zinc-700 text-center text-[8px] md:text-sm">Formulário de cadastramento dos delegados à 6ª Assembleia Reorganizadora da <br /> União Angolana
          dos Adventistas do Sétimo Dia - Movimento de Reforma.</p>

        
        <form onSubmit={addData} className="mr-3 md:mr-0  mt-5 md:mt-10 p-2 md:p-10 w-full md:w-[60%] rounded-lg ring-1 ring-zinc-100 shadow-lg border-t-10 border-sky-800">
        <div className=" text-sky-800 p-2 md:p-4 mb-2 md:mb-5 grid grid-cols-1 place-items-center "><svg xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
          stroke-linejoin="round" className="w-[24px] h-[24px] md:w-[54px] md:h-[54px] lucide lucide-notebook-pen-icon lucide-notebook-pen">
          <path d="M13.4 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.4" /><path d="M2 6h4" /><path d="M2 10h4" /><path d="M2 14h4" /><path d="M2 18h4" /><path d="M21.378 5.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z" /></svg>
        </div>
          <div className="flex flex-col md:flex-row space-y-4 space-x-10 ">
            <div className="space-y-4 w-full">

              <div className="flex flex-col space-y-1 md:space-y-2">
                <label className="text-[#474747] text-[10px] md:text-sm">Nome Completo</label>
                <input required type="text" value={formData.nome} onChange={(e)=>setFormData({...formData, nome: e.target.value})} placeholder="digite seu nome"
                  className="ring-1 ring-zinc-100 h-7 md:h-full p-2 text-[10px] md:text-sm text-[#474747] rounded-lg focus:outline-none 
           focus:ring-1 focus:ring-sky-800 " />
              </div>
              <div className="flex flex-col space-y-1 md:space-y-2">
                <label className="text-[#474747] text-[10px] md:text-sm">Atributo</label>
                <select 
                value={formData.atributo} onChange={(e)=>setFormData({...formData, atributo: e.target.value})}
                required 

                 className="ring-1 ring-zinc-100 p-2 h-7 md:h-full text-[10px] md:text-sm text-[#474747] focus:outline-none focus:ring-1 focus:ring-sky-800  rounded-lg" >
                
                <option>Selecione...</option>
                <option>Delegado</option>
                <option>Ex-ofício</option>
                <option>Suplente</option>
  
                </select>
              </div>

            </div>
            <div className="space-y-4 w-full">

            <div className="flex flex-col space-y-1 md:space-y-2">
            <label className="text-[#474747] text-[10px] md:text-sm">Órgão</label>
                <select 
                value={formData.orgao} onChange={(e)=>setFormData({...formData, orgao: e.target.value})}
                required 

                 className="ring-1 ring-zinc-100 p-2 h-7 md:h-full text-[10px] md:text-sm text-[#474747] focus:outline-none focus:ring-1 focus:ring-sky-800 rounded-lg" >
                
                <option>Selecione...</option>
                <option>Associação Norte</option>
                <option>Associação Sul</option>
                <option>Associação Oeste</option>
                <option>Associação Noroeste</option>
                <option>Associação Centro</option>
                <option>União</option>
  
                </select>
              </div>
              <div className="flex flex-col space-y-1 md:space-y-2">
                <label className="text-[#474747] text-[10px] md:text-sm">Observação</label>
                <textarea 
                value={formData.observacao} onChange={(e)=>setFormData({...formData, observacao: e.target.value})}
                placeholder="Escreva aqui sua observação..."
                  className="ring-1 p-2 ring-zinc-100 h-7 md:h-full text-[10px] md:text-sm text-[#474747] focus:outline-none focus:ring-1 focus:ring-sky-800  rounded-lg" >
                </textarea>


              </div>
            </div>
          </div>
          <button disabled={loading?true:false} type="submit" 
          className={` ${!loading&&"cursor-pointer"} bg-sky-800 w-full md:w-[50%] mt-5 h-7 
          md:h-full items-center text-sm md:text-md  md:mt-10 hover:bg-sky-700 
           text-white flex justify-center p-2 rounded-lg  duration-300`}>
            {loading?<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
            stroke-width="2" stroke-linecap="round" stroke-linejoin="round" 
            className="animate-spin lucide lucide-loader-circle-icon lucide-loader-circle">
              <path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>:"Enviar"

            }
            
          </button><input type="text" placeholder="" />
        </form>
      </div>
    </>
  )
}


