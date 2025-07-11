import './Main.css'

export const Main = () => {
    return(
        <div className='Mcontainer'>
            {/* 영상? */}
            <div className='Mtop'>
                <video
                    src='/media/loop.mp4'
                    autoPlay
                    muted
                    loop
                    playsInline
                    className='Mtop_video'
                />

                <div className='Mtop_content'>
                    <h2>내용입니다</h2>
                </div>

                <div className='Mtop_overlay'>

                </div>
            </div>

            {/* 바디 */}
            <div className='Mbottom'>
                <h2>메인의 바디입니다.</h2>
            </div>
        </div>
    )
}