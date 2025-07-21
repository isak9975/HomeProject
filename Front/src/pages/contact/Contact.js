import emailjs from '@emailjs/browser'
import { Button, TextField } from '@mui/material'
import { FaGithub } from 'react-icons/fa'; 
import { SiVelog } from 'react-icons/si';
import { useState } from 'react'
import Swal from 'sweetalert2'
import './Contact.css'

export const Contact = () => {

    // S3에 저장된 이력서 링크
    const resumeUrl = 'https://home-project-file.s3.ap-northeast-2.amazonaws.com/%EA%B9%80%EC%9D%B4%EC%82%AD_%EC%9E%85%EC%82%AC%EC%A7%80%EC%9B%90%EC%84%9C.pdf';

    const user = JSON.parse(sessionStorage.getItem('userInfo'));
    const [email, setEmail] = useState(user?.userEmail || '');

    const handleEmail = async () => {
        const alreadySent = localStorage.getItem(`emailSent_${email}`);
        if (alreadySent) {
            Swal.fire({
                title: '이미 발송된 이메일입니다.',
                icon: 'warning'
            });
            return;
        }

        const result = await Swal.fire({
            title:'이력서를 받아보시겠습니까?',
            icon:'info',
            cancelButtonText:'아니요',
            showCancelButton:true,
            confirmButtonText:'예'
        });

        if (!result.isConfirmed) return;

        try {
            const response = await emailjs.send(
                'service_wqrjaf3',
                'template_9j7egid',
                {
                    message: resumeUrl,
                    email: email,
                },
                {
                    publicKey: process.env.REACT_APP_EMAIL_PUBLIC_KEY
                }
            );

            if (response.status === 200) {
                localStorage.setItem(`emailSent_${email}`, 'true');
                Swal.fire({
                    title: '발송이 완료되었습니다. 감사합니다.',
                    icon: 'success'
                });
            } else {
                Swal.fire({
                    title: '발송에 실패했습니다.',
                    icon: 'error'
                });
            }

        } catch (error) {
            Swal.fire({
                title: '발송에 실패했습니다.',
                icon: 'error'
            });
        }
    }

    return (
        <div className="CcontactContainer">
            <h1 className="CsectionTitle">📫 Contact Me</h1>
            <form className="Cform">
                <div className="Cicontext">
                    <h4>📧 메일 주소를 입력하시면 이력서를 자동으로 보내드립니다.</h4>
                </div>
                <div className="CiconBox">
                    <h2>about me</h2>
                    <h2><a href="https://github.com/isak9975" target="_blank" rel="noopener noreferrer"><FaGithub fontSize={50}/> GitHub</a></h2>
                    <h2><a href="https://velog.io/@isak9975/posts" target="_blank" rel="noopener noreferrer"><SiVelog fontSize={50} /> Velog</a></h2>
                </div>

                <TextField 
                    className="Cemail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="이메일을 입력해주세요"
                    fullWidth
                    variant="outlined"
                />

                <div className="CbuttonRow">
                    <Button 
                        variant="outlined"
                        color="secondary"
                        onClick={() => window.open(resumeUrl, '_blank')}
                        className="CpreviewBtn"
                    >
                        이력서 미리보기
                    </Button>

                    <Button 
                        variant="contained"
                        color="primary"
                        onClick={handleEmail}
                        className="CsendBtn"
                    >
                        이메일 발송
                    </Button>
                </div>
            </form>
        </div>
    );
}
