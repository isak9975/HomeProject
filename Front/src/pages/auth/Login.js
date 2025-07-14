import { useContext, useState } from 'react'
import {TextField, Button} from '@mui/material'
import {UserContext} from '../../contexts/UserContext'
import { API } from '../common/API'
import './Login.css'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

export const Login = () =>{

    const navigate = useNavigate();

    const {isAdmin,user,isLogin,setIsAdmin,setIsLogin,setUser} = useContext(UserContext);

    const [formData,setFormData] = useState({
        userEmail:'', userPassword:''
    })

    // (중요) 로그인 
    const handleLogin = async () => {

        const option = {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body : JSON.stringify(formData)
        }
        // console.log('보내는 데이터',formData)

        try {
            const response = await fetch(`${API}/auth/login`,option)
             // json 파씽
            const result = await response.json();

            // 유저 토큰 세팅
            localStorage.setItem('TOKEN',result.token)

            // 유저 Context 세팅
            setIsAdmin(result.user==='admin')
            setIsLogin(true)
            setUser({...result,token:''})
        } catch (error) {
            console.log(error)
        }     

        await Swal.fire({
            title :'로그인에 성공했습니다!',
            icon:'success',
        })

        navigate('/')

        // console.log('result',result)
        // console.log('isAdmin',isAdmin)
        // console.log('isLogin',isLogin)
        // console.log('user',user)

    }

    return(
        <div className='Lcontainer'>
            <div className='Lloginbox'>
                <span className='Llogintext'>로그인</span>

                <div className='Linputbox'>
                    <div className='Lone'>
                        <span style={{alignSelf:'flex-start',fontSize:'12px'}}>이메일</span>
                        <TextField className='Linput' 
                            value={formData.userEmail} 
                            onChange={(e)=>setFormData(prev=>({...prev,userEmail:e.target.value}))} 
                            placeholder='이메일을 입력해주세요'
                            />
                    </div>
                    <div className='Lone'>
                        <span style={{alignSelf:'flex-start',fontSize:'12px'}}>비밀번호</span>
                        <TextField className='Linput' 
                            type='password'
                            value={formData.userPassword} 
                            onChange={(e)=>setFormData(prev=>({...prev,userPassword:e.target.value}))}
                            placeholder='비밀번호를 입력해주세요'
                        />
                    </div>
                </div>
                <Button fullWidth variant='contained' className='Lbutton'
                    onClick={handleLogin}
                >로그인</Button>
                <div>
                    <span style={{fontSize:'12px', marginRight:'5px'}}>계정이 없으신가요?</span>
                    <span style={{fontSize:'14px',color:'blue',cursor:'pointer'}}
                        onClick={()=>window.location.href='/register'}
                    >회원가입</span>
                </div>
            </div>
            
        </div>
    )
}