import {  useState } from 'react'
import {TextField, Button, Alert} from '@mui/material'
import { API } from '../common/API'
import './Login.css'
import Swal from 'sweetalert2'
import { FcSearch } from "react-icons/fc";
import { useNavigate } from 'react-router-dom'

export const FindPassword = () =>{

    const navigate = useNavigate();

    const [userId,setUserId] = useState("");
    const [userEmail,setUserEmail] = useState("");

    const [validCode,setValidCode] = useState("");
    const [userValidCode,setUserValidCode] = useState("")

    const [show,setShow] = useState(false);

    // (중요) 로그인 
    const handleFindPassword = async () => {

        setShow(true);

        const findData = {
            userId : userId,
            userEmail : userEmail
        }

        const option = {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body : JSON.stringify(findData)
        }
        // console.log('보내는 데이터',formData)

        try {
            const response = await fetch(`${API}/mail/send`,option)
             // json 파씽
            const result = await response.json();

            setValidCode(result)
            // console.log(result)

        } catch (error) {
            console.log(error)
            await Swal.fire({
            title :'실패했습니다',
            icon:'error',
            })
            setShow(false)
            return
        }     
        // await Swal.fire({
        //     title :'로그인에 성공했습니다!',
        //     icon:'success',
        // })

        // navigate('/')


    }

    // 인증번호 확인
    const handleConfirm = () => {
        // console.log(validCode==userValidCode)
        
        if(validCode===userValidCode){
            Swal.fire({
            title :'인증이 완료 되었습니다.',
            icon:'success',
            })
            navigate("/newpassword",{state:{userId:userId,userEmail:userEmail}})
        }else{
            Swal.fire({
            title :'인증 번호가 잘못되었습니다',
            icon:'error',
            })
            setUserValidCode("")
            setShow(false)
            return
        }
    }

    return(
        <div className='Lcontainer'>
            <div className='Lloginbox' style={{width:'450px', height:'auto'}}>
                <span className='Llogintext' style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}> <FcSearch />비밀번호 찾기</span>

                <div className='Linputbox' style={{marginTop:'30px'}}>
                    {show?
                    <Alert severity="warning">인증번호를 입력해 주세요</Alert>
                    :
                    <Alert severity="info">가입할때 사용한 아이디와 이메일을 입력해주세요</Alert>}
                    <div className='Lone'>
                        <span style={{alignSelf:'flex-start',fontSize:'12px'}}>아이디</span>
                        <TextField className='Linput' 
                            disabled={show?true:false}
                            value={userId} 
                            onChange={(e)=>setUserId(e.target.value)}
                            placeholder='아이디를 입력해주세요'
                        />
                    </div>

                    <div className='Lone'>
                        <span style={{alignSelf:'flex-start',fontSize:'12px'}}>이메일</span>
                            <TextField className='Linput' 
                                disabled={show?true:false}
                                value={userEmail} 
                                onChange={(e)=>setUserEmail(e.target.value)} 
                                placeholder='이메일을 입력해주세요'
                                />
                        {/* 인증번호 */}
                        <div style={{display:'flex', gap:'10px', justifyContent:'space-between',marginTop:'10px'}}>
                            
                            <Button variant='contained' className='Lbutton' color={show?'secondary':`primary`}
                                onClick={
                                    ()=>{
                                    userId===''&&userEmail===''?alert("아이디와 이메일을 먼저 입력해주세요"):
                                    show?handleConfirm():handleFindPassword();
                                }}
                            >{show?'인증 번호 확인':'인증 번호 발송'}</Button>

                            <TextField className='Linput' 
                                value={userValidCode} 
                                onChange={(e)=>{setUserValidCode(e.target.value)}} 
                                placeholder='인증번호를 입력해주세요'
                                disabled={show?false:true}
                            />


                        </div>
                    </div>
                    
                </div>


                {/* 하단 네비게이션 블럭 */}
                <div style={{
                    marginTop:'20px',
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