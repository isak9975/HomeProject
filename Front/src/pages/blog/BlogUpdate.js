import { useContext, useEffect, useState } from 'react';
import ReactQuill from 'react-quill-new';
import { useLocation, useNavigate} from 'react-router-dom';
import { Button, TextField } from '@mui/material';
import { API } from '../common/API';
import Swal from 'sweetalert2';
import { UserContext } from '../../contexts/UserContext';
import './BlogWrite.css'
import 'react-quill-new/dist/quill.snow.css'; //import2


export const BlogUpdate = () => {

    // 전달받은 값
    const {state} = useLocation();
    const board = state;

    // 초기값 세팅
    const [value, setValue] = useState(board.boardContent);
    const [title,setTitle] = useState(board.boardTitle);

    const navigate = useNavigate();

    const {user} = useContext(UserContext);
    const token = sessionStorage.getItem("TOKEN")

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

    const handleCancel = async () => {
        const response = await Swal.fire({
            title :'정말 글 수정하기를 취소하시겠습니까?.',
            icon:'question',
            showCancelButton:true,
            cancelButtonText:'아니요',
            confirmButtonText:'예'
        })
        
        if(!response.isConfirmed) return 

        navigate(-1)
        window.scroll(0.0)
    }

    // (중요)수정하기 버튼 눌렀을 시
    const handleUpdate = async () => {

        const response = await Swal.fire({
            title :'글을 수정하시겠습니까?.',
            icon:'question',
            showCancelButton:true,
            cancelButtonText:'아니요',
            confirmButtonText:'예'
        })

        if(!response.isConfirmed)return

        const data = {
            boardNo:board.boardNo,
            boardCategory : board.boardCategory,
            boardTitle:title,
            boardContent : value,
            boardImg: 'default.jpg',

            boardLike:board.boardLike,
            boardUnLike:board.boardUnLike,
            boardView:board.boardView,
            userNo:user.userNo
        }

        const option = {

            method:"PUT",
            headers:{
                "Content-Type":"application/json",
                'Authorization': `Bearer ${token}`
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
                title :'글 수정을 성공하였습니다.',
                icon:'success',
                })
                navigate(`/blog/detail/${board.boardNo}`)
            }
    }

    return (
        <div className='BWcontainer'>
            <div className='BWwritecontainer'>
                <h2>{`${board.boardCategory}-${board.boardNo}번 글 수정 페이지`}</h2>
                    <div className='BWquill'>
                        <TextField label='제목'fullWidth value={title} onChange={(e)=>setTitle(e.target.value)}/>
                        <ReactQuill 
                            style={{
                                width: "100%",
                                minWidth: "600px",
                                height: "400px", // 뷰포트 높이의 60%
                            }} 
                        theme="snow" value={value} onChange={setValue} modules={modules} />
                </div>
                <div className='BWbutton'>
                    <Button variant="contained" onClick={()=>handleUpdate()}>수정하기</Button>
                    <Button variant="contained" onClick={()=>handleCancel()}>취소하기</Button>
                </div>
            </div>
        </div>
    )
}