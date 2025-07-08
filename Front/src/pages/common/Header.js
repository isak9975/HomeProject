import {Link} from 'react-router-dom'
import './Header.css'

export const Header = () => {
    return(
        <div className='Hcontainer'>
            <div className='Hcontainer_left'>
                
                <Link to={'/'}>메인</Link>
            </div>

            <div className='Hcontainer_center'>
                <Link to={'/blog'}>블로그</Link>
            </div>

            <div className='Hcontainer_right'>
                <Link to={'/login'}>로그인</Link>
                <Link to={'/register'}>회원가입</Link>
            </div>            
        </div>       
    )
}