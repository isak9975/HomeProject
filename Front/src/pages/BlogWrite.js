import { useContext, useEffect, useState } from 'react';
import ReactQuill from 'react-quill-new';
import './BlogWrite.css'
import 'react-quill-new/dist/quill.snow.css'; //import2
import { useNavigate, useParams } from 'react-router-dom';
import { Button, TextField } from '@mui/material';
import { API } from './common/API';
import Swal from 'sweetalert2';
import { UserContext } from '../contexts/UserContext';


export const BlogWrite = () => {

    // 작성한 내용
    const [value, setValue] = useState('');
    const [title,setTitle] = useState('');

    const navigate = useNavigate();

    const {category} = useParams();

    const {user} = useContext(UserContext);

    useEffect(()=>{
        console.log(value)
    },[value])

    const modules = {
        toolbar:{
            container: [
                ['image'],
                [{header:[1,2,3,4,5,false]}],
                ["bold",'underline']
            ],
        },
    };

    const handleWrite = async () => {

        // 내용없으면 반환
        if(title?.trim===''||value?.trim===''){
            await Swal.fire({
                title :'내용을 입력해주세요.',
                icon:'error',
            })
            return
        }
        console.log(title?.trim==='')
        console.log(value?.trim==='')

        const data = {
            boardCategory : category,
            boardTitle:title,
            boardContent : value,
            boardImg: 'default.jpg',
            boardLike:0,
            boardUnLike:0,
            boardView:0,
            userNo:user.userNo
        }

        const option = {

            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body : JSON.stringify(data)
            }
            console.log('보내는 데이터',data)
            // console.log('JSON 데이터',JSON.stringify(formData))
                
            try {
                const response = await fetch(`${API}/board`,option)
    
                const list = await response.json()
    
                console.log(list.legnth>0,"저장 성공")
                console.log("저장 데이터",data)
            } catch (error) {
                console.log(error)
            } finally{
                await Swal.fire({
                title :'글쓰기가 성공하였습니다.',
                icon:'success',
                })
                navigate(`/blog/${category}`)
            }
    }

    return (
        <div className='BWcontainer'>
            <div className='BWwritecontainer'>
                <h2>{`${category} 글쓰기 페이지`}</h2>
                    <div className='BWquill'>
                        <TextField label='제목' placeholder='제목을 입력해주세요' fullWidth value={title} onChange={(e)=>setTitle(e.target.value)}/>
                        <ReactQuill 
                            style={{
                                width: "100%",
                                minWidth: "600px",
                                height: "400px", // 뷰포트 높이의 60%
                            }} 
                        theme="snow" value={value} onChange={setValue} modules={modules} />
                </div>
                <div className='BWbutton'>
                    <Button variant="contained" onClick={()=>handleWrite()}>글쓰기</Button>
                </div>
            </div>
        </div>
    )
}