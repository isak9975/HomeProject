import { useParams } from "react-router-dom"

export const Blog = () => {
     
    const {category} = useParams();

    return(
        <div>            
            <h2>블로그 페이지 메인입니다.</h2>
        </div>
    )
}