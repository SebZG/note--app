import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import HomePage from './pages/Homepage/';
import Welcome from './pages/Welcome/';

function App() {

  return (

    <div className='App'>
      <Router>
        <Routes>

          <Route path="/" element={<Welcome />} />
          <Route path="/homepage" element={<HomePage />} />

        </Routes>
      </Router>
    </div>

  )
}

export default App;