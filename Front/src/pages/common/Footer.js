export const Footer = () => {
    return(
        // 푸터 메인 컨테이너
        <div 
            style={{
                    display:"flex"
                    ,backgroundColor:'lightgray'
                    
                    }}>
            {/* 푸터 왼쪽 내용 */}
            <div >
                <h2>푸터 왼쪽 입니다</h2>
            </div>

            {/* 푸터 가운데 내용 */}
            <div>
                <h2>푸터 입니다</h2>
            </div>

            {/* 푸터 오른쪽 내용. */}
            <div>
                <h2>푸터 오른쪽 입니다</h2>
            </div>
        </div>
    )
}