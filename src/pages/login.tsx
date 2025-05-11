//import { useState } from 'react'

import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router"
import { toast, ToastContainer } from "react-toastify"
//import { AuthContext, AuthProvider } from "../context/auth"

export default function Login() {
  //const {login, isAuthenticated} = useContext(AuthContext)
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [loading, setLoading] = useState(false)
  const [_userData, setUserData] = useState()

  const navigate = useNavigate()
  const url = import.meta.env.PROD? import.meta.env.VITE_PRODUCTION_API_URL:  import.meta.env.VITE_DEVELOPMENT_API_URL  

  async function handlerLogin(event: React.FormEvent) {
    event.preventDefault();
    
    // localStorage.setItem("user", email); // chave correta sem espaço
    //   navigate('/');

    const params = {
      email: email,
      password: senha
    }
    try {
      setLoading(true)
      const {data} = await axios.post(`${url}/login`, params)
      
      setUserData(data.user)
      localStorage.setItem("usuario", data?.nome);
      setLoading(false)
       // chave correta sem espaço
       navigate('/');
      
    } catch (error) {
      setLoading(false)
      console.error("Erro ao fazer login:", error);
      toast.error("Credenciais Inválidas", {
        className: 'text-[#474747]',
        autoClose: 3000,
        pauseOnFocusLoss: false,
        icon: (
          <svg width="49" height="49" viewBox="0 0 49 49" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="24.5" cy="24.5" r="24.5" fill="#FB3748" fillOpacity="0.16" />
            <path d="M32.5 17.5L17.5 32.5" stroke="#FB3748" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M17.5 17.5L32.5 32.5" stroke="#FB3748" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )
      });
    } 
  }


  return (
    <>
      <ToastContainer />
      <div className='place-items-center pt-40 flex flex-col space-y-4'>

        <form onSubmit={handlerLogin} className="flex flex-col space-y-4 p-10 w-[30%] rounded-lg ring-1 ring-zinc-100 shadow-lg border-t-10  border-sky-800">
          <div className="grid grid-cols-1 gap-4 place-items-center p-2"><svg width="76" height="76" viewBox="0 0 76 76" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="38" cy="38" r="37.5" stroke="#D4D4D4" />
            <path d="M37.5 19.7C32.3081 19.7 28.1 23.9081 28.1 29.1V30.6667C28.1 35.8586 32.3081 40.0667 37.5 40.0667C42.6919 40.0667 46.9 35.8586 46.9 30.6667V29.1C46.9 23.9081 42.6919 19.7 37.5 19.7ZM37.4969 44.7667C31.2209 44.7667 23.1682 48.1614 20.8511 51.1741C19.4192 53.0368 20.7823 55.7333 23.1307 55.7333H51.8662C54.2146 55.7333 55.5778 53.0368 54.1458 51.1741C51.8287 48.163 43.773 44.7667 37.4969 44.7667Z" fill="#D4D4D4" />
          </svg>
          </div>
          <div className="flex flex-col space-y-2">
            <label className="text-[#474747] text-sm">E-mail</label>
          </div><input required type="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} className="ring-1 ring-zinc-100 p-2 text-sm text-[#474747] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#969696]" />
          <div className="flex flex-col space-y-2">
            <label className="text-[#474747] text-sm">Palavrapasse</label>
            <input required type="password" value={senha} onChange={(e) => setSenha(e.target.value)} placeholder="palavra passe" className="ring-1 ring-zinc-100 p-2 text-sm text-[#474747] focus:outline-none focus:ring-1 focus:ring-[#969696] rounded-lg" />
          </div>
          <button type="submit" disabled={loading} 
          className={`bg-sky-800 hover:bg-sky-950 ${loading?"":"cursor-pointer"} text-white flex justify-center p-2 rounded-lg  duration-300"`}>
            { loading ?
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
            stroke-width="2" stroke-linecap="round" stroke-linejoin="round" 
            className="animate-spin lucide lucide-loader-circle-icon lucide-loader-circle">
              <path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg> :
               "Entrar"

            }

          </button>
        </form>
      </div>
    </>
  )
}


