import { useState } from 'react'
import {TextField, Button, Alert} from '@mui/material'
import { API } from '../common/API'
import { FcSettings } from "react-icons/fc";
import Swal from 'sweetalert2'
import { BottomButton } from './BottomButton'
import './Login.css'

export const FindUserId = () =>{

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
                
                <BottomButton/>
            </div>
        </div>
    )
}