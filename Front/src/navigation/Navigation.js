import { useContext, useEffect, useState } from 'react';
import { Outlet, Route, Routes,Link, useLocation } from 'react-router-dom'
import { Login } from '../pages/auth/Login'
import { Register } from '../pages/auth/Register'
import { Main } from '../pages/common/Main'
import { Header } from '../pages/common/Header'
import { Footer } from '../pages/common/Footer'
import { Contact } from '../pages/contact/Contact';
import { UserContext } from '../contexts/UserContext';
import { FindPassword } from '../pages/auth/FindPassword';
import { FindUserId } from '../pages/auth/FindUserId';
import { NewPassword } from '../pages/auth/NewPassword';
import { BlogNavigation } from './BlogNavigation';
import { BlogWrite } from '../pages/blog/BlogWrite';
import { BlogDetail } from '../pages/blog/BlogDetail';
import { Blog } from '../pages/blog/Blog' 
import { BlogUpdate } from '../pages/blog/BlogUpdate';
import { API } from '../pages/common/API';
import ReactGa from 'react-ga4';
import './Navigation.css'




const AppLayout = () => {

    ReactGa.initialize("G-6ZFXKW15R6");

    const location = useLocation();

    useEffect(()=>{
        ReactGa.send({
            hitType:'pageview',
            page:location.pathname + location.search,
        });
    },[location])

    useEffect(()=>{
        const findData = async () => {
            const response = await fetch(`${API}/board`)
            const result  = await response.json();

            setBoard(result)
        }
        findData()
    },[])

    const [board,setBoard] = useState('');

    const {isLogin,user} = useContext(UserContext);

    const [isLarge,setIsLarge] = useState(window.innerWidth >= 1040);

    const handleResize = () => {
        setIsLarge(window.innerWidth>=1040);
    }

    useEffect(()=>{
        window.addEventListener('resize',handleResize);
        return () => window.removeEventListener('resize',handleResize);
    },[]);


    const ShowOffcanvas = () => {
        return (
            <aside className="nasidebar">
                <div className='nsidebarstart'>
                    <span className="nmaintext">{isLogin ? `${user.role} 계정입니다` : '사이드 바입니다'}</span><br />
                    <span className="nmaintextside">{isLogin ? `${user.userNickname}님 안녕하세요` : '안녕하세요 사용자님'}</span>
                    <div className="nprofile">
                        <img className="nprofileimage" alt='프로필 이미지' src={isLogin ? `${user.userImg}` : '/media/profile.png'} />
                    </div>
                </div>

                <ul className="nsidebarcenter">
                    <li><Link to={'/'} onClick={() => window.scroll(0, 0)}>Home</Link></li>
                    <li>
                        <Link to={'/blog/total'} onClick={() => window.scroll(0, 0)}>DevBoard</Link>
                            <ul className="nblogsubmenu">
                                <li><Link to={'/blog/infomation'} onClick={() => window.scroll(0, 0)}>Infomation</Link></li>
                                <li><Link to={'/blog/error'} onClick={() => window.scroll(0, 0)}>Error</Link></li>
                                <li><Link to={'/blog/lounge'} onClick={() => window.scroll(0, 0)}>Lounge</Link></li>
                            <li><Link to={'/blog/review'} onClick={() => window.scroll(0, 0)}>Review</Link></li>
                        </ul>
                    </li>
                    <li><Link to={'/contact'} onClick={() => window.scroll(0, 0)}>Contact</Link></li>
                    <li><Link to={'/login'} onClick={() => window.scroll(0, 0)}>Login</Link></li>
                    <li><Link to={'/signup'} onClick={() => window.scroll(0, 0)}>Signup</Link></li>
                </ul>


                <div className="nstate">
                    <div className="nstateitem"><span>총 포스트 :</span><span>{board?.length}</span></div>
                    <div className="nstateitem"><span>총 조회수 :</span><span>100</span></div>
                    <div className="nstateitem"><span>오늘방문 :</span><span>45</span></div>
                </div>
            </aside>
        )
    }

    
    return(
        <div className={isLarge?'nmainwithsidebar':'nmain'}
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
                <Route path='/findpassword' element={<FindPassword/>} />
                <Route path='/newpassword' element={<NewPassword/>} />
                <Route path='/finduserid' element={<FindUserId/>} />

                <Route path='/' element={<AppLayout/>} >
                    <Route index element={<Main/>} />
                    <Route path='contact' element={<Contact />}/>
                    
                    <Route path='blog' element={<BlogNavigation />}>
                        <Route path=':category' element={<Blog/>}/>
                        <Route path='write/:category' element={<BlogWrite />}/>
                        <Route path='detail/:boardNo' element={<BlogDetail />}/>
                        <Route path='update/:boardNo' element={<BlogUpdate />}/>
                    </Route>
                </Route>
            </Routes>
        </div>
    )
}