import { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import {TextField, Button, Alert} from '@mui/material'
import './Register.css'
import { API } from '../common/API'

export const Register = () => {

    const navigate = useNavigate();
    // 파일 드래그시 차이점
    const [isDragging,setIsDragging] = useState(false);
    // 예시 이미지
    const [preView,setPreView] = useState('');
    // 비밀번호 확인
    const [passwordConfirm,setPasswordConfirm] = useState("");
    // 사용자 입력 에러
    const [error,setError] = useState({
        message:'', password:false, email:false, nickname:false
    });
    // 회원가입 버튼 건드렸는지
    const [isTouch,setIsTouch] = useState(false);
    // 가입자 데이터
    const [formData,setFormData] = useState({
        userNickname:'', userEmail:'',userImg:'',userPassowrd:''
    })


    useEffect(()=>{

        formData.userPassowrd !== passwordConfirm?setError(prev=>({...prev,message:'비밀번호가 일치 하지 않습니다'})):setError(prev=>({...prev,message:''}))
        
        if(!isTouch) return

        if(!formData.userEmail===""){
            setError(prev=>({...prev,message:"이메일은 필수 입니다"}))
        }else if(''){
            setError(prev=>({...prev,message:"닉네임은 필수 입니다"}))
        }else if(''){
            setError(prev=>({...prev,message:"비밀번호를 입력해주세요"}))
        }else if(''){
            setError(prev=>({...prev,message:""}))
        }else{
            setError(prev=>({...prev,message:""}))
        }

    },[formData,error,passwordConfirm])


    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);

        const file = e.dataTrasnfer.files[0];
        setFormData(prev=>({...prev,userImg:file}))
        setPreView(URL.createObjectURL(file))
        
        console.log('이미지 드롭됨');
    };

    // 안보이는 업로드 버튼
    const handleProfileInput = (e) => {
        try {
            const file = e.target.files[0];
            if(!file) return;

            //console.log("전달받은 파일 :",file)
            setFormData(prev=>({...prev,userImg:file}))
            
            setPreView(URL.createObjectURL(file));
        } catch (error) {
            console.log('이미지 변경 중 오류 : ',error)
        }
    }

    // 간접클릭
    const handleAutoClick = () => {
        document.querySelector(".Rprofileinput").click()
    }


    //(중요)회원가입 버튼 클릭
    const handleRegister = async () => {
        setIsTouch(true)
        //1) 의사 물어보기

        console.log("세팅된 사진 :",formData.userImg)
        //2) 이미지 파일 백엔드에 저장 후 접근 URL받기
        const imageForm = new FormData;
        imageForm.append("file",formData.userImg);
        imageForm.append("userEmail",formData.userEmail);
            // 폴더위치
        imageForm.append("folder",'userImg');
        let imageUrl = null;

        try {
            const uploadImg = await fetch(`${API}/s3/file`,{
                method:"POST",
                body:imageForm
            })
            const result = await uploadImg.json();
            imageUrl = result.imageUrl;
            setFormData(prev=>({...prev,userImg:imageUrl}))
            console.log(result)
        } catch (error) {
            console.log(error)
        }

        //3) 회원가입 진행
        if(formData.userImg===''){
            setFormData(prev=>({...prev,userImg:'https://home-project-file.s3.ap-northeast-2.amazonaws.com/userImg/defaultimg.png'}))
        }
        const option = {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body : JSON.stringify(formData)
        }

        try {
            const response = await fetch(`${API}/signup`,option)

            const list = await response.json()

            console.log(list.legnth>0,"저장 성공")
            console.log("저장 데이터",formData)
        } catch (error) {
            console.log(error)
        } finally{
            navigate('/login')
        }
    }


    return(
        <div className='Rcontainer'>
            <div className='Rloginbox'>
                <span className='Rlogintext'>회원가입</span>
            
                <div className='Rinputbox'>
                    <div className='Rprofile'>
                        <span style={{alignSelf:'flex-start',fontSize:'12px'}}>프로필</span>

                        {/* 사진 드래드 드롭다운 */}
                        <div className='Rprofileupload'
                            onClick={handleAutoClick}
                            onDragOver={handleDragOver}//
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}//
                            onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = '#007bff';
                            e.currentTarget.style.backgroundColor = '#f0f8ff';
                            }}
                            onMouseLeave={(e) => {
                                if (!isDragging) {
                                    e.currentTarget.style.borderColor = '#ddd';
                                    e.currentTarget.style.backgroundColor = '#f8f9fa';
                                }
                            }}
                        >
                            {/* 프로필 사진 예시*/}
                            <img src={preView} className='Rprofileicon'/>

                            {/* 안내 정보 */}
                            {!preView&&
                            <>
                                <div style={{fontSize: '0.8rem', color: '#666', textAlign: 'center'}}>
                                    📷
                                </div>
                                <div style={{fontSize: '0.8rem', color: '#666', textAlign: 'center'}}>
                                    프로필사진
                                </div>
                            </>
                            }
                        </div> {/* end profileupload*/}
                        
                        <div className='Rprofileimgtext'>
                            클릭하거나 이미지를 드래그해서 업로드
                        </div>

                        {/* 안보이는 올리기 버튼 */}
                        <input type='file'
                            className='Rprofileinput'
                            onChange={handleProfileInput}
                            style={{display:'none'}
                            }
                        />
                    </div>{/* end profile */}

                    <div className='Rone'>
                        <span style={{alignSelf:'flex-start',fontSize:'12px'}}>이메일</span>
                        <TextField className='Rinput' 
                            value={formData.userEmail} 
                            onChange={(e)=>{
                                if(e.target.value.length <=20){
                                    setFormData(prev=>({...prev,userEmail:e.target.value}))
                                }
                            }} 
                            error={error.email}
                            placeholder='이메일을 입력해주세요'
                            />
                    </div>

                    <div className='Rone'>
                        <span style={{alignSelf:'flex-start',fontSize:'12px'}}>닉네임</span>
                        <TextField className='Rinput' 
                            value={formData.userNickname} 
                            onChange={(e)=>{
                                if(e.target.value.length <=20){
                                    setFormData(prev=>({...prev,userNickname:e.target.value}))
                                }
                            }}
                            error={error.nickname}
                            placeholder='닉네임을 입력해주세요'
                        />
                    </div>

                    <div className='Rone'>
                        <span style={{alignSelf:'flex-start',fontSize:'12px'}}>비밀번호</span>
                        <TextField className='Rinput' 
                            type='password'
                            value={formData.userPassword} 
                            onChange={(e)=>{
                                if(e.target.value.length <=20){
                                    setFormData(prev=>({...prev,userPassword:e.target.value}))
                                }
                            }}
                            
                            placeholder='비밀번호를 입력해주세요'
                        />
                    </div>

                    <div className='Rone'>
                        <span style={{alignSelf:'flex-start',fontSize:'12px'}}>비밀번호 확인</span>
                        <TextField className='Rinput' 
                            type='password'
                            value={passwordConfirm} 
                            onChange={(e)=>{
                                if(e.target.value.length <=20){
                                    setPasswordConfirm(e.target.value)
                                }
                            }}
                            error={error.password}
                            placeholder='비밀번호를 다시 한번 입력해주세요'
                        />
                    </div>
                    <div style={{color:'red', marginBottom:'20px'}}>
                       {error.message&&
                       <Alert severity="error">{error.message}</Alert>}
                    </div>                    

                </div>
                <Button fullWidth variant='contained' className='Rbutton'
                    onClick={handleRegister}
                >회원가입</Button>
                <div>
                    <span style={{fontSize:'12px', marginRight:'5px'}}>계정이 있으신가요?</span>
                    <span style={{fontSize:'14px',color:'blue',cursor:'pointer'}}
                        onClick={()=>window.location.href='/login'}
                    >로그인</span>
                </div>
            </div>
            
        </div>
    )
}