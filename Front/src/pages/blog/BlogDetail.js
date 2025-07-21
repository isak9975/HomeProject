import { useNavigate, useParams } from "react-router-dom"
import { useContext, useEffect, useState } from "react";
import { API } from "../common/API";
import DOMPurify from 'dompurify';
import './BlogDetail.css'
import { UserContext } from "../../contexts/UserContext";
import Swal from "sweetalert2";

export const BlogDetail = () => {

    const {boardNo} = useParams();

    const [board,setBoard] = useState({});

    const navigate = useNavigate();

    const {user,isAdmin} = useContext(UserContext);

    const token = sessionStorage.getItem('TOKEN');
    const likeKey = `liked_${board.boardNo}_${token}`;
    const unlikeKey = `unliked_${board.boardNo}_${token}`;

    // 글 읽어오기
    useEffect(() => {
    const findData = async () => {
        const data = await fetch(`${API}/board/detail/${boardNo}`);
        const result = await data.json();
        setBoard(result[0]);
        console.log(result[0])
    };
    findData();
    }, [boardNo]);

    // 2. 조회수 업데이트 
    useEffect(() => {
        if (!board.boardNo) return; 

        const token = sessionStorage.getItem('TOKEN');

        const data = {
            boardNo: board.boardNo,
            boardView: board.boardView + 1,
            boardLike: board.boardLike,
            boardUnLike: board.boardUnLike,
        };

        fetch(`${API}/board/state`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        }).then(() => {
            setBoard(prev => ({
                ...prev,
                boardView: prev.boardView + 1,
            }));
        });
        // board.boardView 의존성 검사 패스 - 무한 루프 방지
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [board.boardNo]); // board.boardNo가 바뀔 때만 실행


    // 좋아요
    const handleLike = () => {
        if (localStorage.getItem(likeKey)) {
            Swal.fire({
                title :'이미 좋아요를 누르셨습니다.',
                icon:'warning',
            })
            return;
        }

        const data = {
            boardNo: board.boardNo,
            boardView : board.boardView,
            boardUnLike: board.boardUnLike,
            boardLike: board.boardLike + 1
        }

        fetch(`${API}/board/state`, {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        }).then(() => {
            localStorage.setItem(likeKey, 'true');
            Swal.fire({
                title :'좋아요!',
                icon:'success',
            })
        });
        };

        const handleUnLike = () => {
            if (localStorage.getItem(unlikeKey)) {
                console.log(localStorage.getItem(unlikeKey))
                Swal.fire({
                    title :'이미 싫어요를 누르셨습니다.',
                    icon:'warning',
                })
                return;
            }

            const data = {
                boardNo: board.boardNo,
                boardView : board.boardView,
                boardLike: board.boardLike,
                boardUnLike: board.boardUnLike + 1
            }

            fetch(`${API}/board/state`, {
                method: 'PUT',
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data)
            }).then(() => {
                localStorage.setItem(unlikeKey, 'true');
                Swal.fire({
                    title :'싫어요!!',
                    icon:'error',
                })
            });
        };

        // 수정하기 버튼 누를시 수정하기 페이지로
        const handleUpdate = () => {   

            if (user.userNo !== board.userNo&&!isAdmin) {
                Swal.fire({
                    title: '작성자만 수정 할 수 있습니다',
                    icon: 'warning',
                    confirmButtonText: '확인',
                });
            return;
            }

            navigate(`/blog/update/${board.boardNo}`,{state:board})
        }

        //삭제하기 버튼 누를시
        const handleDelete = async () => {

            if (user.userNo !== board.userNo&&isAdmin) {
                Swal.fire({
                    title: '작성자만 삭제 할 수 있습니다.',
                    icon: 'warning',
                    confirmButtonText: '확인',
                });
            return;
            }

            const response = await Swal.fire({
                title :'정말 삭제 하시겠습니까?',
                icon:'question',
                cancelButtonText:'아니요',
                showCancelButton:true,
                confirmButtonText:'예'
            })

            if(!response.isConfirmed)return 

            await fetch(`${API}/board/${boardNo}`, {
                method: 'DELETE',
            }).then(() => {
                localStorage.setItem(unlikeKey, 'true');
                Swal.fire({
                    title :'성공적으로 삭제했습니다',
                    icon:'error',
                })
                navigate(-1)
            });
        }

        const cleanHtml = DOMPurify.sanitize(board.boardContent);

    return (
        <>
            <div className="BDcontainer">
                <div className="BDheader">
                    <h2 className="BDtitle">[{board.boardCategory}] {board.boardTitle}</h2>
                    <div className="BDfooter">
                        <span className="BDlike-btn" onClick={handleLike} >좋아요 ❤️ {board.boardLike}</span>
                        <span className="BDdislike-btn" onClick={handleUnLike}>싫어요 💔 {board.boardUnLike}</span>
                    </div>
                    <div className="BDinfo">
                        <span>작성자 번호: {board.userNo}</span>
                        <span>작성일: {new Date(board.boardCreateAt).toLocaleString()}</span>
                        <span>조회수: {board.boardView}</span>
                    </div>
                </div>

                <div className="BDcontent">
                    <div dangerouslySetInnerHTML={{ __html: cleanHtml }} />
                </div>

 
                
            </div>
            <div className="BDfooterer">
                <span className="BD-btn" onClick={()=>handleUpdate()} >수정하기</span>
                <span className="BD-btn" onClick={()=>handleDelete()}>삭제하기</span>
            </div>
            
        </>
    );
}