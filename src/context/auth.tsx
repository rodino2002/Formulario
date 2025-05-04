import { createContext, useState } from "react";
//import { useNavigate } from "react-router";
import { toast } from "react-toastify";


//import { toast } from "react-toastify"



type LoginParams = {
    email: string,
    senha: string
}


type IAuthContext = {
    statusErroAuth: boolean,
    loading: boolean,
    login: (props: LoginParams) => Promise<void>,
    logout: () => void,
    setIsAuthenticated: () => void
    isAuthenticated: boolean
    //checkDevice?: () => boolean,
    //width?: number
}


export const AuthContext = createContext<IAuthContext>({
    login: async () => { },
    logout: () => { },
    setIsAuthenticated: function () { },
    isAuthenticated: false,
    loading: true,
    statusErroAuth: false,
    
})

export function AuthProvider(props: any) {
    const [statusErroAuth, setStatusErroAuth] = useState(false)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [loading, setLoading] = useState(true)

    /*const [width, setWidth] = useState<number>(window.innerWidth);

    function handleWindowSizeChange() {
        setWidth(window.innerWidth)
    }
    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);

    function checkDevice() {
        if (navigator.userAgent.match(/Android/i)
            || navigator.userAgent.match(/webOS/i)
            || navigator.userAgent.match(/iPhone/i)
            || navigator.userAgent.match(/iPad/i)
            || navigator.userAgent.match(/iPod/i)
            || navigator.userAgent.match(/BlackBerry/i)
            || navigator.userAgent.match(/Windows Phone/i)
        ) {
            return true; // está utilizando celular
        }
        else {
            return false; // não é celular
        }
    }
    
    useEffect(() => {
        checkDevice()
    }, [checkDevice&&checkDevice()])*/
    //const navigate = useNavigate()

     function login({email, senha}:LoginParams){
            if(email === 'rodino@gmail.com' && senha === '123'){
                localStorage.setItem("user ", email);
                
                setIsAuthenticated(true)

                 }
                 else{
                    setStatusErroAuth(true)
                   toast.error(`Credenciais Inválidas`, {
                          className: 'text-[#474747] ',
                         // position: 'bottom-right',
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
 
    function logout() {
        localStorage.removeItem("user");
        setIsAuthenticated(false)
    }

    return <AuthContext.Provider
        value={{
            statusErroAuth,
            isAuthenticated,
            setIsAuthenticated,
            login,
            logout,
            //checkDevice,
            //width
        }}
    >
        {props.children}
    </AuthContext.Provider>

}
