import { useContext, useState } from 'react'
import { TextField, Button } from '@mui/material'
import { UserContext } from '../../contexts/UserContext'
import { API } from '../common/API'
import { BottomButton } from './BottomButton'
import './Login.css'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

export const Login = () => {

    const navigate = useNavigate();

    const { setIsAdmin, setIsLogin, setUser } = useContext(UserContext);

    const [formData, setFormData] = useState({
        userId: '', userPassword: ''
    })

    // (중요) 로그인 
    const handleLogin = async () => {

        const option = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData)
        }
        // console.log('보내는 데이터',formData)

        try {
            const response = await fetch(`${API}/auth/login`, option)
            // json 파씽
            const result = await response.json();

            // 유저 토큰 세팅
            sessionStorage.setItem('TOKEN', result.token)
            sessionStorage.setItem('userInfo', JSON.stringify(result));
            // 유저 Context 세팅
            setIsAdmin(result.role === 'admin')
            setIsLogin(true)
            setUser({ ...result, token: '' })
        } catch (error) {
            console.log(error)
            await Swal.fire({
                title: '로그인에 실패했습니다',
                icon: 'error',
            })
            return
        }
        await Swal.fire({
            title: '로그인에 성공했습니다!',
            icon: 'success',
        })

        navigate('/')

        // console.log('result',result)
        // console.log('isAdmin',isAdmin)
        // console.log('isLogin',isLogin)
        // console.log('user',user)

    }

    return (
        <div className='Lcontainer'>
            <div className='Lloginbox'>
                <span className='Llogintext'>로그인</span>

                <div className='Linputbox'>
                    <Button fullWidth variant='contained'
                        style={{ backgroundColor: 'purple' }}
                        onClick={()=>setFormData(prev => ({ ...prev, userId: '2222',userPassword:'22222222'}))}
                    >(예시)일반회원</Button>

                    <div className='Lone'>
                        <span style={{ alignSelf: 'flex-start', fontSize: '12px' }}>아이디</span>
                        <TextField className='Linput'
                            value={formData.userId}
                            onChange={(e) => setFormData(prev => ({ ...prev, userId: e.target.value }))}
                            placeholder='아이디를 입력해주세요'
                        />
                    </div>
                    <div className='Lone'>
                        <span style={{ alignSelf: 'flex-start', fontSize: '12px' }}>비밀번호</span>
                        <TextField className='Linput'
                            type='password'
                            value={formData.userPassword}
                            onChange={(e) => setFormData(prev => ({ ...prev, userPassword: e.target.value }))}
                            placeholder='비밀번호를 입력해주세요'
                        />
                    </div>
                </div>
                <Button fullWidth variant='contained' className='Lbutton'
                    onClick={handleLogin}
                >로그인</Button>

                <BottomButton />
            </div>

        </div>
    )
}