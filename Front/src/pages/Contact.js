import emailjs from '@emailjs/browser'
import { Button, TextField } from '@mui/material'
import { FaGithub } from 'react-icons/fa'; 
import { SiVelog } from 'react-icons/si';
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

        try {
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

            if(response.status===403){
                Swal.fire({
                    title:'발송에 실패했습니다.',
                    icon:'error'
                })
            }
        } catch (error) {
            Swal.fire({
                title:'발송에 실패했습니다.',
                icon:'error'
            })
        }
    }

    return(
        <div>
            <form>
                <div style={{margin:'20px'}}>
                    <h2><a style={{textDecoration:'none', color:'black'}} href="https://github.com/isak9975"><FaGithub fontSize={60}/> GitHub</a></h2>
                    <h2><a style={{textDecoration:'none', color:'black'}} href="https://velog.io/@isak9975/posts"><SiVelog fontSize={60} /> Velog</a></h2>
               </div>
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