import { Outlet, Route, Routes } from 'react-router-dom'
import { Login } from '../pages/auth/Login'
import { Register } from '../pages/auth/Register'
import { Main } from '../pages/common/Main'
import { Header } from '../pages/common/Header'
import { Footer } from '../pages/common/Footer'
import { Blog } from '../pages/Blog'

const AppLayout = () => {
    return(
        <div className='AppLayout' 
        style={{display:'flex', flexDirection:'column', minHeight:'100vh'}}
        >
            {/* 헤더 */}
            <Header/>

                {/* 하위 요소들 나올 위치. */}
                <Outlet/>

            {/* 푸터 */}
            <Footer/>
        </div>
    )
}


export const Navigation = () =>{
    return(
        <div>
            <Routes>
                {/* 인증 */}
                <Route path='/login' element={<Login/>} />
                <Route path='/register' element={<Register/>} />

                <Route path='/' element={<AppLayout/>} >
                    <Route index element={<Main/>} />
                    <Route path='blog' element={<Blog />}/>
                </Route>
            </Routes>
        </div>
    )
}