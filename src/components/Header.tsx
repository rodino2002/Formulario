
//import { useState } from 'react'

import { useNavigate } from "react-router"

export function Header() {
  const navigate = useNavigate()
  return (
 
      <div className="bg-zinc-50 p-4 text-white flex justify-between items-center shadow-inherit    ">
        <div className="ml-10">
          <img src="icon_02.png" className="w-12"/>
        </div>

        <div className="flex space-x-4 mr-10 itmes-center font-norml text-sm text-zinc-700">
          <div className="">
            Joaquim Cassicato
          </div>
          <span>|</span>
          <div className="cursor-pointer" onClick={() => navigate("/login")}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="mt-1 lucide lucide-log-out-icon lucide-log-out">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" x2="9" y1="12"
                y2="12" /></svg>
          </div>
        </div>
      </div>
    
  );
}