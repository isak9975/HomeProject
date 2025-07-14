import emailjs from '@emailjs/browser'
import { Button, TextField } from '@mui/material'
import { useState } from 'react'
import Swal from 'sweetalert2'
export const  Contact = () => {

    // 이력서 s3 파일 위치
    const filetext = ''

    const [email,setEmail] = useState('')
    
    const handleEmail =  async () => {
        
        const result = await Swal.fire({
            title:'이력서를 받아보시겠습니까?',
            icon:'info',
            cancelButtonText:'아니요',
            showCancelButton:true,
            confirmButtonText:'예'
        })

        if(result.isConfirmed===false) return

        const response  =  await emailjs.send(
            'service_wqrjaf3',
            'template_9j7egid',
            {
                message:filetext,
                email:email,
            },
            {
                publicKey:process.env.REACT_APP_EMAIL_PUBLIC_KEY
            }
        )

        if(response.status===200){
            Swal.fire({
                title:'발송이 완료되었습니다.',
                icon:'success'
            })
        }
        
    }

    return(
        <div>
            <form>
                <TextField  
                    value={email}
                    onChange={(e)=>{
                        setEmail(e.target.value)
                    }}
                    placeholder='이메일을 입력해주세요'/>
                <Button variant='outlined' color='primary'
                    onClick={handleEmail}
                >발송하기</Button>
            </form>
        </div>
    )
}