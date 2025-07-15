import {  useEffect, useState } from 'react'
import {TextField, Button, Alert} from '@mui/material'
import { API } from '../common/API'
import './Login.css'
import Swal from 'sweetalert2'
import { FcSearch } from "react-icons/fc";
import { useLocation, useNavigate } from 'react-router-dom'

export const NewPassword = () =>{

    const navigate = useNavigate();
    // 값 전달받기
    const location = useLocation();
    // console.log(location)
    // console.log(location.state.userId)
    
    // 받은 데이터로 보여주기 값 세팅
    const [userEmail] = useState(location.state.userEmail);
    const [userId] = useState(location.state.userId);

    // 변경되는 비밀번호들
    const [userPassword, setUserPassowrd ] = useState('')
    const [passwordConfirm, setpasswordConfirm]  = useState('')

    const [error,setError] = useState('');

    useEffect(()=>{
        if(userPassword===''){
            setError("새로운 비밀번호를 입력해주세요")
            return
        }else if(passwordConfirm===""){
            setError("비밀번호 확인을 입력해주세요")
            return
        }else if(userPassword!==passwordConfirm){
            setError("비밀번호가 일치하지 않습니다.")
        }else{
            setError("")
        }
    },[userPassword,passwordConfirm])

    // (중요) 로그인 
    const handlePasswordUpdate = async () => {

        const userData = {
            userId : userId,
            userEmail : userEmail,
            userPassword : userPassword,
        }

        const option = {
            method:"PUT",
            headers:{
                "Content-Type":"application/json",
            },
            body : JSON.stringify(userData)
        }
        // console.log('보내는 데이터',formData)

        try {
            const response = await fetch(`${API}/auth/update`,option)
             // json 파씽
            const result = await response.json();

        } catch (error) {
            console.log(error)
            await Swal.fire({
            title :'실패했습니다',
            icon:'error',
            })
            return
        }     
        await Swal.fire({
            title :'비밀번호 수정에 성공했습니다!',
            icon:'success',
        })

        navigate('/login')

    }

    return(
        <div className='Lcontainer'>
            <div className='Lloginbox' style={{width:'450px', height:'auto'}}>
                <span className='Llogintext' style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}> <FcSearch />비밀번호 재 설정</span>

                <div className='Linputbox' style={{marginTop:'30px'}}>
                    <div style={{marginBottom:'20px'}}>
                        <Alert style={{marginBottom:'10px'}}>아이디 : {userId}</Alert>
                        <Alert >이메일 : {userEmail}</Alert>
                    </div>

                    <div className='Lone'>
                        <span style={{alignSelf:'flex-start',fontSize:'12px'}}>새로운 비밀번호</span>
                            <TextField className='Linput' 
                                value={userPassword} 
                                onChange={(e)=>setUserPassowrd(e.target.value)} 
                                placeholder='새로운 비밀번호를 입력해주세요'
                                />
                    </div>

                    <div className='Lone'>
                        <span style={{alignSelf:'flex-start',fontSize:'12px'}}>비밀번호 확인</span>
                            <TextField className='Linput' 
                                value={passwordConfirm} 
                                onChange={(e)=>setpasswordConfirm(e.target.value)} 
                                placeholder='비밀번호를 다시 입력해주세요'
                                />
                    </div>

                    {error&&<Alert severity='error' >{error}</Alert>}

                    <Button variant='contained' className='Lbutton' color={`primary`} style={{marginTop:'20px'}}
                            onClick={handlePasswordUpdate}
                    >비밀번호 변경</Button>
                    
                    
                </div>
            </div>
        </div>
    )
}