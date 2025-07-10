import {Link} from 'react-router-dom'
import './Header.css'


export const Header = () => {
   
    return(
        <div className='Hcontainer'>
            <div className='Hcontainer_left'>
                <div className='Hlogoicon'>
                    <Link to={'/'} className='Hlogotext's>M</Link>
                </div>
                <span className='Hlogotextto'>MyBlog</span>
            </div>

            <div className='Hcontainer_center'>
                <Link className='Hblogbutton' to={'/blog'}>블로그</Link>
            </div>

            <div className='Hcontainer_right'>
                <Link className='Hloginbutton' to={'/login'}>로그인</Link>
                <Link className='Hregisterbutton' to={'/register'}>회원가입</Link>
            </div>      
        </div>       
    )
}