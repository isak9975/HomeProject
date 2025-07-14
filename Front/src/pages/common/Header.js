import {Link} from 'react-router-dom'
import {UserContext} from '../../contexts/UserContext'
import Swal from 'sweetalert2'
import './Header.css'
import { useContext } from 'react'


export const Header = () => {

    const {isAdmin,isLogin,setIsLogin,setIsAdmin} = useContext(UserContext);

    const handlelogout = async() => {
        const result = await Swal.fire({
            title:'로그아웃 하시겠습니까?',
            icon:'warning',
            confirmButtonText:'예',
            cancelButtonText:'아니요',
            showCancelButton:true,
        })

        if(result.isConfirmed){
            localStorage.setItem('TOKEN','')
            setIsAdmin(false)
            setIsLogin(false)
        }
    }


    return(
        <div className='Hcontainer'>
            <div className='Hcontainer_left'>
                <div className='Hlogoicon'>
                    <Link to={'/'} className='Hlogotext'>M</Link>
                </div>
                <span className='Hlogotextto'>MyBlog</span>
            </div>

            <div className='Hcontainer_center'>
                <Link className='Hblogbutton' to={'/blog'}>Community</Link>
                <Link className='Hblogbutton' to={'/Contact'}>Contact</Link>
            </div>

            <div className='Hcontainer_right'>
                
                {!isLogin&&<Link className='Hloginbutton' to={'/login'}>로그인</Link>}
                {!isLogin&&<Link className='Hregisterbutton' to={'/register'}>회원가입</Link>}
                {isLogin&&<div style={{color:'white',cursor:'pointer'}} onClick={handlelogout}>로그아웃</div>}
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