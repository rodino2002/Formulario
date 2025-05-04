//import { useState } from 'react'

import axios from "axios"
import { Header } from "../components/Header"
import { useEffect, useState } from "react"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import ModalEdit from "../components/editModal"
import ModalDelete from "../components/deleteModal"
import { toast, ToastContainer } from "react-toastify"

type Props = {
  id: number
  nome: string
  atributo: string
  orgao: string
  observacao: string
}
export default function Dashboard() {
  const url = import.meta.env.PROD ? import.meta.env.VITE_PRODUCTION_API_URL : import.meta.env.VITE_PRODUCTION_API_URL

  const [dataList, setDataList] = useState<Props[]>([])
  const [showModalEdit, setShowModalEdit] = useState(false)
  const [itemdata, setItemdata] = useState<Props | null>(null)
  const [idUser, setIdUser] = useState<number | string>(0)
  const [searchInput, setSearchInput] = useState<string | undefined>("")
  const [filteredData, setFilteredData] = useState<Props[]>([])
  const perPage = 100

  async function getDataList() {
    try {
      const { data } = await axios.get(`${url}/delegados`)
      setDataList(data)
      return data
    } catch (error) {
      console.log(error)
    }

  }

  useEffect(() => {
    getDataList()
  }, [])

  useQuery({
    queryKey: ['delegados'],
    queryFn: getDataList,
    //refetchOnWindowFocus: false,
  })

  const [showModalDelete, setShowModalDelete] = useState(false)
  const queryClient = useQueryClient()
  const [loadingDelete, setLoadingDelete] = useState(false)

  async function deleteData(id: number | string) {
    try {
      setLoadingDelete(true)
      await axios.delete(`${url}/delegados/${id}`,
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

      setLoadingDelete(false)
      setShowModalDelete(false)
      toast.success('Registo eliminado com suceso!', {
        className: 'text-[#474747] ',
        position: 'bottom-right',
        autoClose: 3000,
        pauseOnFocusLoss: false,
        icon: <svg width="49" height="49" viewBox="0 0 49 49" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="24.5" cy="24.5" r="24.5" fill="#1FC16B" fill-opacity="0.18" />
            <path d="M35 17.5L21.25 31.25L15 25" stroke="#1FC16B" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
        </svg>

    })

    } catch (error) {
      console.log(error)
      setLoadingDelete(false)
      toast.error(`Falha ao eliminar registo`, {
        className: 'text-[#474747] ',
        position: 'bottom-right',
        autoClose: 3000,
        pauseOnFocusLoss: false,
        icon: <svg width="49" height="49" viewBox="0 0 49 49" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="24.5" cy="24.5" r="24.5" fill="#FB3748" fillOpacity="0.16" />
          <path d="M32.5 17.5L17.5 32.5" stroke="#FB3748" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M17.5 17.5L32.5 32.5" stroke="#FB3748" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      })
    }
  }

  useEffect(() => {
  if (dataList?.length) {
    setFilteredData(dataList?.slice(0, perPage)); // Adiciona os dados iniciais
  }
}, [dataList]);

const handleSearch = (param: string | undefined) => {
  if (param?.trim()) {
    const filtered = dataList?.filter((item) => {
      const searchTerm = param?.toLowerCase();
      return (
        item?.nome?.toString().toLowerCase().includes(searchTerm) ||
        item?.atributo?.toString().toLowerCase().includes(searchTerm) ||
        item?.orgao?.toString().toLowerCase().includes(searchTerm)||
        item?.observacao?.toString().toLowerCase().includes(searchTerm)
      )
    });
   
    setFilteredData(filtered);
  } else {
      
    setFilteredData(dataList); // Retorna ao estado completo se o campo de pesquisa estiver vazio
  }
};


const handleKeyDown = (event: any) => {
  if (event.key === "Enter" || event.key === "Backspace") {
    handleSearch(searchInput);
  }
  if (event.target.value) {
    handleSearch(event.target.value);
  }
};

useEffect(()=>{
  handleSearch(searchInput)
}, [searchInput])

  return (
    <>
    <ToastContainer/>
      <Header />
      <div className="flex justify-center mt-10">
        <div className="flex justify-between items-center h-10 w-[75%]">
          <div className=" p-4 place-items-center text-zinc-700 font-semibold">
            <a className="bg-sky-800 p-2 text-white rounded-lg hover:bg-sky-700 duration-300 cursor-pointer" href='/inscricao' target="_blank">Cadastrar</a>
          </div>
          <div className="flex gap-2">
            <input
              type="search"
              className="ring-1 ring-[#C8D1E1] focus:outline-none focus:ring-1 focus:ring-[#969696] rounded-full w-80 p-2 placeholder-[#C8D1E1] text-sm text-[#474747] ${styleInput} "
              value={searchInput}
              placeholder="Pesquise..."
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={handleKeyDown}
            />
            <button
              type="submit"
              className="p-2 bg-[#F1F5F7] rounded-full"
            //onClick={() => handleSearch(searchInput)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="20"
                viewBox="0 0 28 28"
                fill="none"
              >
                <path
                  d="M24.9752 23.0448L19.8297 17.8992C21.0685 16.25 21.7373 14.2426 21.735 12.18C21.735 6.91141 17.4486 2.625 12.18 2.625C6.91141 2.625 2.625 6.91141 2.625 12.18C2.625 17.4486 6.91141 21.735 12.18 21.735C14.2426 21.7373 16.25 21.0685 17.8992 19.8297L23.0448 24.9752C23.3052 25.2081 23.645 25.3324 23.9942 25.3226C24.3434 25.3128 24.6756 25.1697 24.9227 24.9227C25.1697 24.6756 25.3128 24.3434 25.3226 23.9942C25.3324 23.645 25.2081 23.3052 24.9752 23.0448ZM5.355 12.18C5.355 10.8301 5.75528 9.5106 6.50522 8.38823C7.25516 7.26587 8.32108 6.39109 9.56818 5.87452C10.8153 5.35795 12.1876 5.2228 13.5115 5.48614C14.8354 5.74948 16.0515 6.3995 17.006 7.354C17.9605 8.30849 18.6105 9.52459 18.8739 10.8485C19.1372 12.1724 19.002 13.5447 18.4855 14.7918C17.9689 16.0389 17.0941 17.1048 15.9718 17.8548C14.8494 18.6047 13.5299 19.005 12.18 19.005C10.3706 19.0028 8.63586 18.2831 7.35639 17.0036C6.07693 15.7241 5.35717 13.9894 5.355 12.18Z"
                  fill="#85A3BB"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className="place-items-center ">
        
        <div className="mt-10 relative">
        <p className="text-sm text-[#474747]">Total de Registos: <span className="font-semibold">{filteredData?.length}</span></p>
        <div className="mt-2 rounded-lg p-1 ring-1 ring-zinc-100">
          <table className="rounded-lg ring-1 ring-sky-50 w-full">
            <thead className=" bg-sky-50 h-14">
              <tr className="">
                <th className="text-center w-[20%]">Nome</th>
                <th className="text-center  w-[20%]">Atributo</th>
                <th className="text-center  w-[20%]">Órgão</th>
                <th className="text-center  w-[20%]">Observação</th>
                <th className="text-center  w-[20%]">Ações</th>
              </tr>
            </thead>

            <tbody className="bg-zinc-700">
            
               
              {Array.isArray(filteredData) && filteredData?.map((item) =>
                <tr className=" p-2 text-sm h-14 odd:bg-white even:bg-[#F8FAFC] hover:bg-zinc-100 duration-300 ">
                  <td className="text-center p-4">{item?.nome}</td>
                  <td className="text-center p-4">{item?.atributo}</td>
                  <td className="text-center p-4"> {item?.orgao} </td>
                  <td className="text-center" >{item?.observacao}</td>
                  <td className="flex space-x-1 items-center px-20">

                    {/*editar */}
                    <p className="mt-4">
                      <svg
                        className="group-hover:text-white text-[#1FC16B] cursor-pointer"
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="30"
                        viewBox="0 0 36 36"
                        fill="none"
                        onClick={() => {
                          setItemdata(item)
                          setShowModalEdit(true)
                        }}
                      >
                        <rect
                          width="36"
                          height="36"
                          rx="18"
                          fill="#34CD3E"
                          fill-opacity="0.1"
                        />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M8.79903 10.7287C9.31065 10.2171 10.0045 9.92969 10.7281 9.92969H17.0936C17.5958 9.92969 18.0029 10.3368 18.0029 10.839C18.0029 11.3413 17.5958 11.7484 17.0936 11.7484H10.7281C10.4869 11.7484 10.2556 11.8442 10.0851 12.0147C9.91452 12.1853 9.81872 12.4166 9.81872 12.6578V25.3888C9.81872 25.6299 9.91452 25.8612 10.0851 26.0318C10.2556 26.2023 10.4869 26.2981 10.7281 26.2981H23.4591C23.7003 26.2981 23.9316 26.2023 24.1021 26.0318C24.2726 25.8612 24.3684 25.6299 24.3684 25.3888V19.0233C24.3684 18.521 24.7756 18.1139 25.2778 18.1139C25.78 18.1139 26.1872 18.521 26.1872 19.0233V25.3888C26.1872 26.1123 25.8997 26.8062 25.3881 27.3178C24.8765 27.8294 24.1826 28.1168 23.4591 28.1168H10.7281C10.0045 28.1168 9.31065 27.8294 8.79903 27.3178C8.28742 26.8062 8 26.1123 8 25.3888V12.6578C8 11.9342 8.28742 11.2403 8.79903 10.7287Z"
                          fill="currentColor"
                        />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M25.2777 9.81872C25.0073 9.81872 24.7479 9.92615 24.5567 10.1174L16.0959 18.5782L15.6152 20.5009L17.538 20.0202L25.9987 11.5594C26.19 11.3682 26.2974 11.1088 26.2974 10.8384C26.2974 10.568 26.19 10.3086 25.9987 10.1174C25.8075 9.92615 25.5482 9.81872 25.2777 9.81872ZM23.2707 8.83135C23.803 8.29904 24.5249 8 25.2777 8C26.0305 8 26.7525 8.29904 27.2848 8.83135C27.8171 9.36365 28.1161 10.0856 28.1161 10.8384C28.1161 11.5912 27.8171 12.3131 27.2848 12.8454L18.6459 21.4843C18.5293 21.6009 18.3833 21.6836 18.2234 21.7235L14.586 22.6329C14.2761 22.7104 13.9483 22.6196 13.7224 22.3937C13.4966 22.1678 13.4058 21.84 13.4832 21.5301L14.3926 17.8927C14.4326 17.7328 14.5152 17.5868 14.6318 17.4702L23.2707 8.83135Z"
                          fill="currentColor"
                        />
                      </svg>
                    </p>
                    {showModalEdit && <ModalEdit onClose={setShowModalEdit} itemSelected={itemdata} />}
                    {/*deletar */}
                    <p className="mt-4">
                      <svg
                        onClick={() => {
                          setIdUser(item?.id)
                          setShowModalDelete(true)
                        }

                        }
                        className="group-hover:text-white text-[#EB5656] cursor-pointer"
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="30"
                        viewBox="0 0 36 36"
                        fill="none"
                      >
                        <rect
                          width="36"
                          height="36"
                          rx="18"
                          fill="#E7454A"
                          fill-opacity="0.1"
                        />
                        <path
                          d="M17.5 7C15.5634 7 13.9508 8.44179 13.6801 10.3H9.90338C9.85637 10.292 9.80876 10.288 9.76107 10.2882C9.71986 10.2891 9.67878 10.293 9.63816 10.3H7.83981C7.73009 10.2985 7.62115 10.3187 7.51933 10.3594C7.41751 10.4002 7.32484 10.4607 7.2467 10.5375C7.16856 10.6142 7.10651 10.7057 7.06416 10.8066C7.02181 10.9074 7 11.0157 7 11.125C7 11.2343 7.02181 11.3426 7.06416 11.4434C7.10651 11.5443 7.16856 11.6358 7.2467 11.7125C7.32484 11.7893 7.41751 11.8498 7.51933 11.8906C7.62115 11.9313 7.73009 11.9515 7.83981 11.95H9.02038L10.4101 26.2661C10.5597 27.8098 11.876 29 13.4322 29H21.5668C23.123 29 24.4392 27.8099 24.5888 26.2661L25.9796 11.95H27.1602C27.2699 11.9515 27.3789 11.9313 27.4807 11.8906C27.5825 11.8498 27.6752 11.7893 27.7533 11.7125C27.8314 11.6358 27.8935 11.5443 27.9358 11.4434C27.9782 11.3426 28 11.2343 28 11.125C28 11.0157 27.9782 10.9074 27.9358 10.8066C27.8935 10.7057 27.8314 10.6142 27.7533 10.5375C27.6752 10.4607 27.5825 10.4002 27.4807 10.3594C27.3789 10.3187 27.2699 10.2985 27.1602 10.3H25.3629C25.2751 10.2858 25.1855 10.2858 25.0977 10.3H21.3199C21.0492 8.44179 19.4366 7 17.5 7ZM17.5 8.65C18.5373 8.65 19.3883 9.34749 19.6315 10.3H15.3685C15.6117 9.34749 16.4627 8.65 17.5 8.65ZM10.6829 11.95H24.316L22.9403 26.1071C22.8713 26.8195 22.2848 27.35 21.5668 27.35H13.4322C12.7151 27.35 12.1276 26.8185 12.0586 26.1071L10.6829 11.95ZM15.555 14.6882C15.3356 14.6916 15.1265 14.7816 14.9737 14.9386C14.8209 15.0955 14.7368 15.3064 14.7399 15.525V23.775C14.7384 23.8843 14.7587 23.9929 14.7996 24.0943C14.8405 24.1958 14.9012 24.2881 14.9783 24.3659C15.0553 24.4438 15.1471 24.5056 15.2484 24.5478C15.3496 24.59 15.4582 24.6117 15.568 24.6117C15.6777 24.6117 15.7863 24.59 15.8876 24.5478C15.9888 24.5056 16.0806 24.4438 16.1576 24.3659C16.2347 24.2881 16.2954 24.1958 16.3363 24.0943C16.3773 23.9929 16.3975 23.8843 16.396 23.775V15.525C16.3976 15.4146 16.3769 15.305 16.3352 15.2026C16.2935 15.1003 16.2316 15.0074 16.1531 14.9294C16.0747 14.8513 15.9814 14.7898 15.8786 14.7483C15.7759 14.7069 15.6658 14.6865 15.555 14.6882ZM19.4191 14.6882C19.1997 14.6916 18.9906 14.7816 18.8378 14.9386C18.6849 15.0955 18.6009 15.3064 18.604 15.525V23.775C18.6025 23.8843 18.6227 23.9929 18.6637 24.0943C18.7046 24.1958 18.7653 24.2881 18.8424 24.3659C18.9194 24.4438 19.0112 24.5056 19.1124 24.5478C19.2137 24.59 19.3223 24.6117 19.432 24.6117C19.5418 24.6117 19.6504 24.59 19.7516 24.5478C19.8529 24.5056 19.9447 24.4438 20.0217 24.3659C20.0988 24.2881 20.1595 24.1958 20.2004 24.0943C20.2413 23.9929 20.2616 23.8843 20.2601 23.775V15.525C20.2616 15.4146 20.241 15.305 20.1993 15.2026C20.1575 15.1003 20.0956 15.0074 20.0172 14.9294C19.9388 14.8513 19.8454 14.7898 19.7427 14.7483C19.64 14.7069 19.5299 14.6865 19.4191 14.6882Z"
                          fill="currentColor"
                          stroke="currentColor"
                          stroke-width="0.3"
                        />
                      </svg>

                    </p>
                  </td>
                </tr>)}

            </tbody>
            
          </table>
        </div>
          {showModalDelete && <ModalDelete setShowModalDelete={setShowModalDelete} deleteFunction={deleteData} idUser={idUser} loading={loadingDelete}/>}
          
          {filteredData?.length === 0 &&<p className="flex justify-center mt-4">Nenhum registo encontrado.</p>}

        </div>

      </div>
    </>
  )
}


