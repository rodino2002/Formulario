//import { useState } from 'react'

import { useState } from "react"
import { useNavigate } from "react-router"
import { toast, ToastContainer } from "react-toastify"
//import { AuthContext, AuthProvider } from "../context/auth"

export default function Login() {
  //const {login, isAuthenticated} = useContext(AuthContext)
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')

  const navigate = useNavigate()

  async function handlerLogin(event: React.FormEvent) {
    event.preventDefault();

    if (email === 'rodino@gmail.com' && senha === '123') {
      localStorage.setItem("user", email); // chave correta sem espaço
      navigate('/');
    } else {
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
          <button type="submit" className="bg-sky-800 hover:bg-sky-950 cursor-pointer text-white flex justify-center p-2 rounded-lg  duration-300">
            Entrar
          </button>
        </form>
      </div>
    </>
  )
}


