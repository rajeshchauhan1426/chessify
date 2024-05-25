

import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css'
import { Landing } from "./screen/Landing";
import { Game } from "./screen/Game";

function App() {
  //const [] = useState(0)

  return (
    <div className="h-screen bg-slate-800">
     <BrowserRouter>
      <Routes>
        <Route path="/"  element={<Landing/>}/> 
        <Route path="/game"  element={<Game/>}/> 
      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App
