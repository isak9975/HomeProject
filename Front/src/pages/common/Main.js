import { useEffect, useState } from 'react'
import {} from '../../contexts/UserContext'
import './Main.css'

export const Main = () => {
    const [visible,setVisible] = useState(true);

    // useEffect(()=>{
    //     // 페이지 스르륵
    //     const scrolly = window.scrollY;

    //     if(scrolly>0){
    //          window.scrollTo({
    //             top:900,
    //             behavior:'smooth',
    //     });
    //     }

    //     const timer = setTimeout(() => {
    //         setVisible(false)
    //     }, 4000); //3초 후에 사라짐

    //     return () => clearTimeout(timer);
    // },[])
    useEffect(() => {
  const handleScroll = () => {
    const scrolly = window.scrollY;
    if (scrolly > 0) {
      window.scrollTo({
        top: 900,
        behavior: 'smooth',
      });
    }
  };

  window.addEventListener('scroll', handleScroll);

  // 4초 후에 사라지게 하는 타이머
  const timer = setTimeout(() => {
    setVisible(false);
  }, 4000);

  return () => {
    window.removeEventListener('scroll', handleScroll);
    clearTimeout(timer);
  };
}, []);

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


                {visible&&<div className='Mtop_content'>
                    <h2>끊임없이 배우고, 나아가는 개발자</h2>
                    <h2>김이삭의 개인 블로그입니다</h2>
                </div>}
                {!visible&&<div className='Mtop_content'>
                    <h2>방문해 주셔서 감사합니다.</h2>
                </div>}

                {/* 검은색 오버레이 */}
                <div className='Mtop_overlay'></div>
            </div>

            {/* 바디 */}
            <div className='Mbottom'>
                <h2>메인의 바디입니다.</h2>
            </div>
        </div>
    )
}