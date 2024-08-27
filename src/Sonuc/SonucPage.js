import ReactConfetti from "react-confetti"
import "./Sonuc.css"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export const SonucPage = ({
    data
}) => {
    const navigate = useNavigate()
    
     const puan ={
        sonuc : Math.floor(data?.skor/data?.soruSayisi*100),
        text:"",
        color:"",
        confeti:<></>
     }   
    
    if( puan.sonuc<50 || data===null  ){
        puan.text="Başarısız";
        puan.color="red"
    }   
    else{
        console.log("aaa");
        puan.text ="Tebrikler"
        puan.color="white"
        puan.confeti= <ReactConfetti />
    }
    return <>
        <div className="screen" >
            {puan.confeti}
            <div className="container" >
               
                <div className="div-baslik" style={{border: `1.5px solid ${puan.color}`}}>
                    <h1 className="baslik" style={{color:puan.color}} >{puan.text.toUpperCase()}</h1>
                </div>
                <div className="div-score">
                    <div className="score-info">
                        <h4 >
                            {data?.soruSayisi || 20} Sorudan  {data?.skor|| 0}  Doğru Cevap
                        </h4>
                    </div>
                    <div className="score">
                        <h1 >SKORUNUZ</h1>
                    </div>
                     <div className="score-number">
                        <span>%{ puan.sonuc|| 0}</span>

                    </div>   
                    <button onClick={() => navigate("/")} className="button">Tekrar Başla</button>
                </div>
            </div>
        </div>

    </>
}