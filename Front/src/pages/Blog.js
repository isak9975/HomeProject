import { useNavigate, useParams } from "react-router-dom"
import {Button} from '@mui/material'
import { useEffect, useState } from "react";
import './Blog.css'
import { API } from "./common/API";

export const Blog = () => {
     
    // 주소에서 카테고리 가져오기 :category
    const {category} = useParams();
    const navigate = useNavigate();

    const [board,setBoard] = useState([]);

    useEffect(()=>{
        const getAllPosts = async () => {
            try {
                const data = await fetch(`${API}/board`)

                const result = await data.json()

                setBoard(result)
                // console.log(result)
            } catch (error) {
                console.log(error)
            }
        }
        getAllPosts()
    },[])

    return(
        <div className="Btop">            
            <h2>{`${category} 페이지 메인입니다.`}</h2>
            <div className="Bwritebutton">
                {category!=='total'&&<Button variant="contained" onClick={()=>navigate(`/blog/write/${category}`)}>글쓰기</Button>}
            </div>

            <div className="Blist">
                    {board
                        .filter(t => category === 'total' || t.boardCategory === category).reverse()
                        .map(board => (
                        <div className="Bcard" key={board.boardNo} onClick={()=>{navigate(`/blog/detail/${board.boardNo}`)}}>
                            <div className="Bheader">
                                    <span className={`Bcategory Bcategory-${board.boardCategory}`}>[{board.boardCategory}]</span>
                                    <span className="Btitle">{board.boardNo}. {board.boardTitle}</span>
                                <div className="Bfooter">
                                    <span>좋아요 ❤️ {board.boardLike}</span>
                                    <span>싫어요 💔 {board.boardUnLike}</span>
                            </div>
                            </div>

                            <div className="Binfo">
                                <span>작성자 번호: {board.userNo}</span>
                                <span>작성일: {board.boardCreateAt}</span>
                                <span>조회수: {board.boardView}</span>
                            </div>
                        </div>
                    ))}
                </div>
        </div>
    )
}