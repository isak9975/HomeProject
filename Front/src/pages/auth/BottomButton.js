import { useNavigate } from "react-router-dom"
import './FindPassword.css'

export const BottomButton = () => {
    const navigate = useNavigate();
    return(
        <div className='FPbottom'>
            <button
                className='FPbottombutton'
                onClick={() => navigate('/login')}
            >
                로그인
            </button>
            <button
                className='FPbottombutton'
                onClick={() => navigate('/register')}
            >
                회원가입
            </button>
            <button
                className='FPbottombutton'
                onClick={() => navigate('/finduserid')}
            >
                아이디 찾기
            </button>
            <button
                className='FPbottombutton'
                onClick={() => navigate('/findpassword')}
            >
                비밀번호 찾기
            </button>
        </div>
    )
}