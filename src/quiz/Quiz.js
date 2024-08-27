import React, { useEffect, useRef, useState } from 'react';
import "./Quiz.css"
import { useNavigate } from 'react-router-dom';
import Sorular from "../assets/sorular.json"
import Ses from "../assets/ses.mp3"
import Swal from 'sweetalert2';
export const Quiz = (
  {
    callback=()=>{}
  }
) => {

  const datas = Sorular;

  const [sonrakiSoru, setSonrakiSoru] = useState(0)
  const [selectedSecenek, setSelectedSecenek] = useState()
  const [score, setScore] = useState(0)
  const [cevapDurumu, setCevapDurumu] = useState()
  const [minutes, setMinutes]=useState(null)
  const [seconds, setSeconds] =useState(0)
  const gecilenSoru = datas[sonrakiSoru]
  const navigate = useNavigate()

let donkSesi = <></>
useEffect(()=>{
  let totalTimer=datas?.length*10
  let newMinutes=Math.floor(totalTimer/60)
  
  let newSeconds=totalTimer%60
 
 
  setMinutes(newMinutes)
  setSeconds(newSeconds)

},[])
useEffect(() => {
 
  const timer= setInterval(() => {
      if(seconds===0){
        if (minutes===0) {
            clearInterval(timer) 
        }
        else{
          setMinutes(prev=> prev-1)
          setSeconds(59)
        }
      }
      else{
        setSeconds(prev=>prev-1)
      }
      
  },1000 );
  return () => clearInterval(timer); 
}, [seconds, minutes])


useEffect(()=>{

    if (seconds===0&&minutes===0) {
      
      Swal.fire({title:"Süreniz Bitmiştir...",
        icon:"warning",
        confirmButtonText:"Sonuçları Göster"
      }).then(res=>{
        if (res.isConfirmed) {
          navigate("/sonuc")
          
        }
      })
      callback(()=>({skor:score ,soruSayisi:datas?.length}))
    }
},[ seconds,minutes])


const CevapKontrol = (cevap) => {
  if (gecilenSoru.cevap === cevap) {
    setScore(prev => prev + 1)
  }
  if (sonrakiSoru + 1 < datas.length) {
    setSonrakiSoru(sonrakiSoru + 1)
    setSelectedSecenek(null)
  } else {
    // Son soru
    callback({ skor: score + (gecilenSoru.cevap === cevap ? 1 : 0), soruSayisi: datas?.length });
    navigate("/sonuc");
  }
}
  const SonucSayfasi = (a)=>{
    CevapKontrol(a)
    callback({skor:score, soruSayisi:datas?.length})
    navigate("/sonuc")
    
  }

  return (
    
    <div className='box' >
        {(seconds <15&&minutes===0)&&(seconds!==0)&&<audio autoPlay src={Ses}  />}

      <div className='header'>
          <h1>GENEL KÜLTÜR TESTİ</h1>
      </div>
      <div className="timer">
          <span >{minutes<10 ? "0"+minutes :minutes}:{seconds<10 ? "0"+seconds :seconds}</span>
      </div>
      <div className='quiz-box'>
        <div>
          <div className='quesitons'>
            <div className='quesitons-number'>
              <h1>{sonrakiSoru + 1}</h1>
              <h6>/{datas?.length}</h6>
            </div>
            {<h1> {gecilenSoru?.soru}</h1>}
            <div className='selections' >
              {gecilenSoru?.secenekler?.map((secenek, index) => {
                let backgroundColor = "white";
                let textColor = "black"
                if (selectedSecenek===secenek&&gecilenSoru?.cevap !== selectedSecenek) {
                  backgroundColor="red"
                  textColor="white"
                }
                else if (selectedSecenek&&gecilenSoru?.cevap === secenek) {
                  backgroundColor = "green"
                  textColor="white"
                }

                // if (cevapDurumu === "dogru" && selectedSecenek === secenek) {
                //   backgroundColor = "green"
                // }
                // else if (cevapDurumu === "yanlis" && selectedSecenek === secenek) {
                //   backgroundColor = "red"
                // }
                // else if (cevapDurumu === "yanlis" && gecilenSoru?.cevap === secenek) {
                //   backgroundColor = "green"
                // }
                return (
                  <div key={index} onClick={(e) => { !selectedSecenek&&setSelectedSecenek(secenek) }} className="selection" style={{ backgroundColor: backgroundColor, color:textColor }}>
                    <p className='p'>{secenek}</p>
                  </div>
                )
              })}
            </div>
            <div className='submit-button' >
              <button onClick={() => { CevapKontrol(selectedSecenek) }} > {sonrakiSoru+1===datas?.length ? "Testi Bitir":"Sonraki"}</button>
            </div>
          </div>



        </div>


      </div>
    </div >
  )
}
