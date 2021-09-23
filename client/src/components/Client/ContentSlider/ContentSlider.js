import React from 'react'
import styles from './ContentSlider.module.scss'

function ContentSlider() {
  return (
    <div className={styles.main__container}>
      <div className={styles.slider}>
        <div className={styles.slides}>
          <input id={styles.r1} type="radio" name="r" />
          <input id={styles.r2} type="radio" name="r" />
          <input id={styles.r3} type="radio" name="r" />
          <input id={styles.r4} type="radio" name="r" />

          <div className={`${styles.slide} ${styles.s1}`}>
            <img alt="" src={"https://sun9-86.userapi.com/impg/Y-9vCRgEFdWZt4MbF7AJhG4Hz9GrFNOGz4qX6w/5bBLrEdCeco.jpg?size=640x640&quality=96&sign=c90f05af8b3f151c96c7121c5f688ad5&type=album"} />
            <img alt="" src={"https://sun9-3.userapi.com/impg/PoDSKMTmpuFMdCPQisx2pd-pJCVqJVRrC8Y83A/8oI09s-nuS8.jpg?size=640x640&quality=96&sign=17b2e913506df34d0dc1831573a11912&type=album"} />
            <img alt="" src={"https://sun9-55.userapi.com/impg/IMIW1FFLLNPL56uvH0bOXIju-ripA7d9ZjHqVg/4Ty7cHlYO9A.jpg?size=640x640&quality=96&sign=8bee01ac00eca76047e656704b9e46c3&type=album"} />
            <img alt="" src={"https://sun9-32.userapi.com/impg/ygl2lZi6U8M0jtYwNW5ZWxOG300huwoF1QhSew/-7djaLnw6Dg.jpg?size=640x640&quality=96&sign=35d5eb98982a0245d55953e6d937398e&type=album"} />
            
          </div>
          <div className={styles.slide}>
          <img alt="" src={"https://sun9-41.userapi.com/impg/c3yCmti54nqRUmbGKYnYmjHo5qoHAFVSdbA_iQ/7i3i1vxURTE.jpg?size=640x640&quality=96&sign=f11d6e4bc993f2911d5d3df49c7cd488&type=album"} />
            <img alt="" src={"https://sun9-32.userapi.com/impg/Bmb6w18mkOJwWCPV5RrSu9nwKuWiItK4viA5yg/HeOK-kSN2xI.jpg?size=640x640&quality=96&sign=fbc578897b4b831a6795d92971fd918b&type=album"} />
            <img alt="" src={"https://sun9-30.userapi.com/impg/EoY0J8nSxynaOfLEi5Ur-SZN3s8B5-bKq6vLlA/j8V_83lW0g8.jpg?size=640x640&quality=96&sign=5cb0721c78a5538c941af321e743962a&type=album"} />
            <img alt="" src={"https://sun9-2.userapi.com/impg/ZJLFzDfbsWAmAGNoBmSSVQ9tMuLyRuZyq2XDRw/g2PDWX5OR34.jpg?size=640x640&quality=96&sign=f4d0fb4c31f9084177dc3c823d8187dd&type=album"} />
          </div>
          <div className={styles.slide}>
          <img alt="" src={"https://sun9-86.userapi.com/impg/Y-9vCRgEFdWZt4MbF7AJhG4Hz9GrFNOGz4qX6w/5bBLrEdCeco.jpg?size=640x640&quality=96&sign=c90f05af8b3f151c96c7121c5f688ad5&type=album"} />
            <img alt="" src={"https://sun9-3.userapi.com/impg/PoDSKMTmpuFMdCPQisx2pd-pJCVqJVRrC8Y83A/8oI09s-nuS8.jpg?size=640x640&quality=96&sign=17b2e913506df34d0dc1831573a11912&type=album"} />
            <img alt="" src={"https://sun9-55.userapi.com/impg/IMIW1FFLLNPL56uvH0bOXIju-ripA7d9ZjHqVg/4Ty7cHlYO9A.jpg?size=640x640&quality=96&sign=8bee01ac00eca76047e656704b9e46c3&type=album"} />
            <img alt="" src={"https://sun9-32.userapi.com/impg/ygl2lZi6U8M0jtYwNW5ZWxOG300huwoF1QhSew/-7djaLnw6Dg.jpg?size=640x640&quality=96&sign=35d5eb98982a0245d55953e6d937398e&type=album"} />
          </div>
          <div className={styles.slide}>
          <img alt="" src={"https://sun9-86.userapi.com/impg/Y-9vCRgEFdWZt4MbF7AJhG4Hz9GrFNOGz4qX6w/5bBLrEdCeco.jpg?size=640x640&quality=96&sign=c90f05af8b3f151c96c7121c5f688ad5&type=album"} />
            <img alt="" src={"https://sun9-3.userapi.com/impg/PoDSKMTmpuFMdCPQisx2pd-pJCVqJVRrC8Y83A/8oI09s-nuS8.jpg?size=640x640&quality=96&sign=17b2e913506df34d0dc1831573a11912&type=album"} />
            <img alt="" src={"https://sun9-55.userapi.com/impg/IMIW1FFLLNPL56uvH0bOXIju-ripA7d9ZjHqVg/4Ty7cHlYO9A.jpg?size=640x640&quality=96&sign=8bee01ac00eca76047e656704b9e46c3&type=album"} />
            <img alt="" src={"https://sun9-32.userapi.com/impg/ygl2lZi6U8M0jtYwNW5ZWxOG300huwoF1QhSew/-7djaLnw6Dg.jpg?size=640x640&quality=96&sign=35d5eb98982a0245d55953e6d937398e&type=album"} />
          </div>
        </div>

      </div>
        <div className={styles.navigation}>
          <label htmlFor={styles.r1} className={styles.bar}></label>
          <label htmlFor={styles.r2} className={styles.bar}></label>
          <label htmlFor={styles.r3} className={styles.bar}></label>
          <label htmlFor={styles.r4} className={styles.bar}></label>
        </div>

      <button className={styles.slider__btn}>
        {/* <Link className={styles.slider__btn__text} to="/menu">
          Меню
        </Link> */}
      </button>
    </div>
  )
}

export default ContentSlider
