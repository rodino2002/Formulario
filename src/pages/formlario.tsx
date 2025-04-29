

export default function Formulario() {
  /*Nome
  *
  Atributo
  *
  

  Observação*/
  return (
    <>
    <div className="ml-10 pt-2">
          <img src="icon_02.png" className="w-10"/>
        </div>
      <div className="place-items-center pt-20">
        
        <p className="text-3xl font-semibold text-zinc-700 mb-10">CADASTRAMENTO DOS DELEGADOS</p>
        <p className="text-zinc-700 text-center ">Formulário de cadastramento dos delegados à 6ª Assembleia Reorganizadora da <br /> União Angolana
          dos Adventistas do Sétimo Dia - Movimento de Reforma.</p>

        
        <form className="mt-10 p-10 w-[60%] rounded-lg ring-1 ring-zinc-100 shadow-lg border-t-10 border-sky-800">
        <div className=" text-sky-800 p-4 mb-5 grid grid-cols-1 place-items-center"><svg xmlns="http://www.w3.org/2000/svg"
         width="54" height="54" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
          stroke-linejoin="round" className="lucide lucide-notebook-pen-icon lucide-notebook-pen">
          <path d="M13.4 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.4" /><path d="M2 6h4" /><path d="M2 10h4" /><path d="M2 14h4" /><path d="M2 18h4" /><path d="M21.378 5.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z" /></svg>
        </div>
          <div className="flex space-y-4 space-x-10 items-center">
            <div className="space-y-4 w-full">

              <div className="flex flex-col space-y-2">
                <label className="text-[#474747] text-sm">Nome Completo</label>
                <input required type="text" placeholder="digite seu nome"
                  className="ring-1 ring-zinc-100 p-2 text-sm text-[#474747] rounded-lg focus:outline-none 
           focus:ring-1 focus:ring-sky-800 " />
              </div>
              <div className="flex flex-col space-y-2">
                <label className="text-[#474747] text-sm">Atributo</label>
                <select 
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
                <textarea placeholder="Escreva aqui sua observação..."
                  className="ring-1 p-2 ring-zinc-100 text-sm text-[#474747] focus:outline-none focus:ring-1 focus:ring-sky-800  rounded-lg" >
                </textarea>


              </div>
            </div>
          </div>
          <button type="submit" className="bg-sky-800 w-[50%] mt-10 hover:bg-sky-700 cursor-pointer text-white flex justify-center p-2 rounded-lg  duration-300">
            Entrar
          </button><input type="text" placeholder="" />
        </form>
      </div>
    </>
  )
}


