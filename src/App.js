import Navbar from './Components/Navbar'
import About from './Components/About'
import Home from './Components/Home'
import NoteState from './context/Notes/NoteState'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <>
    <NoteState>
      <Router>
      <Navbar/>
      <div className="container">
       <Routes>
        <Route exact path='/Home' element={<Home/>}/>
        <Route exact path='/About' element={<About/>}/>
       </Routes>
     </div>
      </Router>
      </NoteState>
    </>
  );
}

export default App;
