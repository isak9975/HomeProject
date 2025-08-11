import { FaGithub } from 'react-icons/fa'; 
import { SiVelog } from "react-icons/si";
import { FaReact } from "react-icons/fa";
import { BiLogoSpringBoot } from "react-icons/bi";

export const Footer = () => {
    return(
        // 푸터 메인 컨테이너
        <div 
            style={{
                    display:"flex"
                    ,backgroundColor:'lightgray',
                    justifyContent:'space-between',
                    padding : '0px 40px',
                    lineHeight:1,
                    alignItems:'center'
                    }}>
            {/* 푸터 왼쪽 내용 */}
            <div >
                <h5>ISAK Blog</h5>
                <p><small>코드로 세상을 연결합니다.</small></p>
                <p><small>문의: isak9975@gmail.com</small></p>
                <p><small>© 2025 Kim Isak</small></p>
            </div>

            {/* 푸터 가운데 내용 */}
            <div>
                
            </div>

            {/* 푸터 오른쪽 내용. */}
            <div style={{marginTop:'10px'}}>
                <p><a style={{textDecoration:'none', color:'black'}} target="_blank"
                    rel="noopener noreferrer" href="https://github.com/isak9975"><FaGithub style={{fontSize:30}}/> GitHub</a></p>
                <p><a style={{textDecoration:'none', color:'black'}} target="_blank"
                    rel="noopener noreferrer" href="https://velog.io/@isak9975/posts"><SiVelog style={{fontSize:30}} /> Velog</a></p>
                <p><FaReact style={{fontSize:30}} /> React /<BiLogoSpringBoot style={{fontSize:30}} /> Spring Boot</p>
            </div>
        </div>
        
    )
}