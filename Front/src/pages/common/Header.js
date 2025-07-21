import {Link, useNavigate} from 'react-router-dom'
import {UserContext} from '../../contexts/UserContext'
import Swal from 'sweetalert2'
import './Header.css'
import { useContext } from 'react'


export const Header = () => {

    const navigate = useNavigate();

    const {isAdmin,isLogin,setIsLogin,setIsAdmin,setUser} = useContext(UserContext);

    const handlelogout = async() => {
        const result = await Swal.fire({
            title:'로그아웃 하시겠습니까?',
            icon:'warning',
            confirmButtonText:'예',
            cancelButtonText:'아니요',
            showCancelButton:true,
        })

        if(result.isConfirmed){
            sessionStorage.setItem('TOKEN','')
            sessionStorage.setItem('userInfo', '');
            setIsAdmin(false)
            setIsLogin(false)
            setUser('')
        }
    }


    return(
        <div className='Hcontainer'>
            <div className='Hcontainer_left'>
                <div className='Hlogoicon'>
                    <Link to={'/'} onClick={()=>{window.scroll(0,0)}} className='Hlogotext'>M</Link>
                </div>
                <span className='Hlogotextto'>MyBlog</span>
            </div>

            <div className='Hcontainer_center'>
                <div className='Hblogbutton' onClick={()=>{navigate('/blog/total')
                    window.scroll(0,0)
                }}>DevBoard</div>
                <div className='Hblogbutton' onClick={()=>{navigate('/contact')
                    window.scroll(0,0)
                }}>ContactMe</div>
            </div>

            <div className='Hcontainer_right'>
                
                {!isLogin&&<Link className='Hloginbutton' to={'/login'}>로그인</Link>}
                {!isLogin&&<Link className='Hregisterbutton' to={'/register'}>회원가입</Link>}
                {isLogin&&<div style={{color:'white',cursor:'pointer',marginRight:'20px'}} onClick={
                    ()=>{handlelogout()
                    window.scroll(0,0)
                }}>로그아웃</div>}
                {isAdmin&&<div style={{color:'red'}} onClick={()=>{
                    Swal.fire({
                        title:'기능 준비중입니다',
                        icon:'warning'
                    })
                }} >관리자용 페이지</div>}

            </div>      
        </div>       
    )
}