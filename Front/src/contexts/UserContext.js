import { createContext, useEffect, useState } from "react"

export const UserContext = createContext();

export const UserProvider = ({children}) => {

    const [isLogin, setIsLogin] = useState(false);

    const [isAdmin, setIsAdmin] = useState(false);

    const [user,setUser] = useState(null);

    // 앱 시작시 localStorage에서 토큰과 유저 정보를 확인해서 상태 세팅
    useEffect(()=>{
        const token = localStorage.getItem('token');
        const userInfo = localStorage.getItem('userInfo'); //JSON.stringify된 사용자 정보
        if(token && userInfo){
            setIsLogin(true);
            setUser(JSON.parse(userInfo));
            setIsAdmin(JSON.parse(userInfo).role==='admin');
        }

    },[])

    return(
        <UserContext.Provider value={{isLogin,isAdmin,user,setIsLogin,setIsAdmin,setUser}}>
            {children}
        </UserContext.Provider>
    )
}
