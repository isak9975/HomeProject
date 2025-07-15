import { useState } from 'react'
import {TextField, Button, Alert} from '@mui/material'
import { API } from '../common/API'
import { FcSettings } from "react-icons/fc";
import './Login.css'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

export const FindUserId = () =>{

    const navigate = useNavigate();

    const [userId,setUserId] = useState("")
    const [userEmail,setUserEmail] = useState("")

    // (중요) 이메일로 아이디 찾기 
    const handleFindByEmail = async () => {

        try {
            const response = await fetch(`${API}/auth/find?email=${userEmail}`)
             // json 파씽
            const result = await response.json();

            
            // console.log(result.userId)
            setUserId(result.userId)

        } catch (error) {
            console.log(error)
            await Swal.fire({
            title :'잘못된 이메일입니다.',
            icon:'error',
            })
            return
        }     
        // await Swal.fire({
        //     title :'로그인에 성공했습니다!',
        //     icon:'success',
        // })

        // navigate('/login')

    }

    return(
        <div className='Lcontainer'>
            <div className='Lloginbox'  style={{height:'450px'}}>
                <span className='Llogintext' style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}><FcSettings fontSize={50}/>아이디 찾기</span>

                <div className='Linputbox'>
                    <div className='Lone'>
                        {!userId&&<Alert severity="info">가입할때 사용한 이메일을 입력해주세요</Alert>}
                        {userId&&<Alert severity="success">{`해당 이메일의 아이디는 "${userId}" 입니다.`}</Alert>}
                        <span style={{alignSelf:'flex-start',fontSize:'12px'}}>이메일</span>
                        <TextField className='Linput' 
                            value={userEmail} 
                            onChange={(e)=>setUserEmail(e.target.value)} 
                            placeholder='이메일을 입력해주세요'
                            />
                    </div>

                </div>
                <Button fullWidth variant='contained' className='Lbutton'

                    onClick={handleFindByEmail}
                >아이디 찾기</Button>
                
                {/* 하단 네비게이션 블럭 */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '15px',
                    fontSize: '13px',
                    backgroundColor: '#f9f9f9',
                    padding : '10px 0',
                    borderRadius: '10px',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
                }}>
                    <span
                        style={{ cursor: 'pointer', color: '#555', fontWeight: '500' }}
                        onClick={() => navigate('/login')}
                    >
                        로그인
                    </span>
                    <span
                        style={{ cursor: 'pointer', color: '#555', fontWeight: '500' }}
                        onClick={() => navigate('/register')}
                    >
                        회원가입
                    </span>
                    <span
                        style={{ cursor: 'pointer', color: '#555', fontWeight: '500' }}
                        onClick={() => navigate('/finduserid')}
                    >
                        아이디 찾기
                    </span>
                    <span
                        style={{ cursor: 'pointer', color: '#555', fontWeight: '500' }}
                        onClick={() => navigate('/findpassword')}
                    >
                        비밀번호 찾기
                    </span>
                </div>
            </div>
        </div>
    )
}