import { useState } from 'react'
import {TextField, Button} from '@mui/material'
import './Register.css'

export const Register = () => {

    const [formData,setFormData] = useState({
        userNickname:'', userEmail:'',userImg:'default.jpg',userPassowrd:''
    })


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
    // 드래그 드롭 기능 (디자인만)
    console.log('이미지 드롭됨');
    };

    // 안보이는 업로드 버튼
    const handleProfileInput = () => {
        
    }

    // 간접클릭
    const handleAutoClick = () => {
        document.querySelector(".profileinput").click()
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
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
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
                            {/*  */}
                            <div>

                            </div>

                            {/* 프로필 사진 예시*/}
                            <img src=''/>

                            {/* 안내 정보 */}
                            <div style={{fontSize: '0.8rem', color: '#666', textAlign: 'center'}}>
                                📷
                            </div>
                            <div style={{fontSize: '0.8rem', color: '#666', textAlign: 'center'}}>
                                프로필사진
                            </div>
                        </div> {/* end profileupload*/}
                        
                        <div className='Rprofileimgtext'>
                            클릭하거나 이미지를 드래그해서 업로드
                        </div>

                        {/* 안보이는 올리기 버튼 */}
                        <input type='file'
                            className='Rprofileinput'
                            onClick={handleProfileInput}
                            style={{display:'none'}
                            }
                        />
                    </div>{/* end profile */}

                    <div className='Rone'>
                        <span style={{alignSelf:'flex-start',fontSize:'12px'}}>이메일</span>
                        <TextField className='Rinput' 
                            value={formData.userEmail} 
                            onChange={()=>{}} 
                            placeholder='이메일을 입력해주세요'
                            />
                    </div>

                              <div className='Rone'>
                        <span style={{alignSelf:'flex-start',fontSize:'12px'}}>닉네임</span>
                        <TextField className='Rinput' 
                            value={formData.userPassword} 
                            onChange={()=>{}}
                            placeholder='비밀번호를 입력해주세요'
                        />
                    </div>

                    <div className='Rone'>
                        <span style={{alignSelf:'flex-start',fontSize:'12px'}}>비밀번호</span>
                        <TextField className='Rinput' 
                            value={formData.userPassword} 
                            onChange={()=>{}}
                            placeholder='비밀번호를 입력해주세요'
                        />
                    </div>

                    <div className='Rone'>
                        <span style={{alignSelf:'flex-start',fontSize:'12px'}}>비밀번호 확인</span>
                        <TextField className='Rinput' 
                            value={formData.userPassword} 
                            onChange={()=>{}}
                            placeholder='비밀번호를 입력해주세요'
                        />
                    </div>
          


                    

                </div>
                <Button fullWidth variant='contained' className='Rbutton'>로그인</Button>
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