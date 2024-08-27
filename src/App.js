import './App.css';
import { Quiz } from './quiz/Quiz';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { SonucPage } from './Sonuc/SonucPage';
import { useState } from 'react';

function App() {
  const [skor, setScore]=useState(null)
  
  return (<>
    <Router>
      <Routes>
        <Route  path='/'  element={<Quiz  callback={(data)=>{setScore(data)}} />}   />  
        <Route  path='/sonuc' element={<SonucPage data={skor}/>}/>
      </Routes>
    </Router>
   </>
  );
}

export default App;
