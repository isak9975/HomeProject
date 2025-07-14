import { useContext, useEffect, useState } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom'
import { Login } from '../pages/auth/Login'
import { Register } from '../pages/auth/Register'
import { Main } from '../pages/common/Main'
import { Header } from '../pages/common/Header'
import { Footer } from '../pages/common/Footer'
import { Blog } from '../pages/Blog' 
import { Contact } from '../pages/Contact';
import { UserContext } from '../contexts/UserContext';

const AppLayout = () => {

    const {isAdim, isLogin,user} = useContext(UserContext);
    console.log(user)

    const styles={
        Asidebar:{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '200px',
            height: '100vh',
            backgroundColor: '#f8f9fa',
            padding: '1rem',
            textAlign:'center',
            border: '1px solid #dee2e6',
            zIndex: 1000,
            display:'flex',
            flexDirection:'column',
            justifyContent:'space-between'
        },
        Amain:{
            transition : 'margin-left 0.3s ease'
        },
        Amainwithsidebar :{
            marginLeft:'200px'
        },
        maintext:{
            fontSize: '1.1rem',
            fontWeight: '600',
            color: '#495057',
            margin: '0'
        },
        maintextside:{
            fontSize: '0.9rem',
            color: '#6c757d',
            margin: '0.25rem 0 0'
        },
        profile:{
            textAlign: 'center',
            marginBottom: '2rem',
            paddingBottom: '1rem',
            borderBottom: '1px solid #dee2e6'
        },
        profileimage:{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            backgroundColor: '#6c757d',
            margin: '0 auto 0.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '2rem',
            fontWeight: 'bold'
        },
        sidebarcenter:{
            display:'flex',
            flexDirection:'column',
        
        },
        state:{
            marginTop: '1.5rem',
            padding: '1rem 0',
            borderTop: '1px solid #dee2e6',
        },
        stateitem:{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '0.5rem',
            fontSize: '0.9rem',
            color: '#6c757d'    
        },
    }

    const [isLarge,setIsLarge] = useState(window.innerWidth >= 1040);

    const handleResize = () => {
        setIsLarge(window.innerWidth>=1040);
    }

    useEffect(()=>{
        window.addEventListener('resize',handleResize);
        return () => window.removeEventListener('resize',handleResize);
    },[]);


    const ShowOffcanvas = () => {
        return(
            <aside style={styles.Asidebar}>
                <div>
                    <span style={styles.maintext}>{isLogin?`${user.role} 계정입니다`:'사이드 바입니다'}</span><br/>
                    <span style={styles.maintextside}>{isLogin?`${user.userNickname}님 안녕하세요`:'안녕하세요 사용자님'}</span>
                    <div style={styles.profile}>                    
                        <img style={styles.profileimage} src={isLogin?`${user.userImg}`:'/media/profile.png'}/>
                    </div>
                </div>
                <div style={styles.sidebarcenter}>
                    <ul>
                        <li>메뉴1</li>
                        <li>메뉴2</li>
                    </ul>
                </div>
                <div style={styles.state}>
                    <div style={styles.statitem}>
                        <spam>총 포스트 : </spam>
                        <spam>12</spam>
                    </div>
                    <div>
                        <spam>총 조회수 : </spam>
                        <spam>100</spam>
                    </div>
                    <div>
                        <spam>오늘방문 : </spam>
                        <spam>45</spam>
                    </div>
                </div>
            </aside>
        )
    }
    
    return(
        <div style={isLarge?styles.Amainwithsidebar:styles.Amain}
        >
            {isLarge&&<ShowOffcanvas/>}
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
                    <Route path='contact' element={<Contact />}/>
                    <Route path='blog' element={<Blog />}/>
                </Route>
            </Routes>
        </div>
    )
}