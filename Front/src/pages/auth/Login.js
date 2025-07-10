import { useState } from 'react'
import {TextField, Button} from '@mui/material'
import './Login.css'

export const Login = () =>{

    const [formData,setFormData] = useState({
        userEmail:'', userPassword:''
    })

    return(
        <div className='Lcontainer'>
            <div className='Lloginbox'>
                <span className='Llogintext'>로그인</span>

                <div className='Linputbox'>
                    <div className='Lone'>
                        <span style={{alignSelf:'flex-start',fontSize:'12px'}}>이메일</span>
                        <TextField className='Linput' 
                            value={formData.userEmail} 
                            onChange={()=>{}} 
                            placeholder='이메일을 입력해주세요'
                            />
                    </div>
                    <div className='Lone'>
                        <span style={{alignSelf:'flex-start',fontSize:'12px'}}>비밀번호</span>
                        <TextField className='Linput' 
                            value={formData.userPassword} 
                            onChange={()=>{}}
                            placeholder='비밀번호를 입력해주세요'
                        />
                    </div>
                </div>
                <Button fullWidth variant='contained' className='Lbutton'>로그인</Button>
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