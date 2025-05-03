type params={
    deleteFunction: (id:number|string)=>void
    idUser: number | string
    //onClose: (e:any)=>void
    setShowModalDelete: (e:boolean)=>void
}

export default function ModalDelete({deleteFunction, idUser, setShowModalDelete}:params){
    
    return(
        <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        
            <div className="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>
    
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto text-red-600 flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                       className="lucide lucide-trash2-icon lucide-trash-2">
                      <path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                      </div>
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <h3 className="text-base font-semibold text-gray-900" id="modal-title">Eliminar Registo</h3>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">Tem certeza que desejza eliminar esse registo? Se eliminar esse , não tem como recuperar, a menos que volte a cadastra-lo.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button type="button"
                    onClick={() => {
                      //setShowModalDelete(false)
                      deleteFunction(idUser);
                    }}
                     className="cursor-pointer inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm 
                     font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto">Eliminar</button>
                    <button type="button"
                    onClick={() => {
                      setShowModalDelete(false)
                    }}
                     className="cursor-pointer mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2
                      text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset
                       hover:bg-gray-50 sm:mt-0 sm:w-auto">Cancelar</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
    )
}