import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import HomePage from './pages/Homepage/';
import Welcome from './pages/Welcome/';
import Account from './pages/Account/';

function App() {

  return (

    <div className='App'>
      <Router>
        <Routes>

          <Route path="/" element={<Welcome />} />
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/account" element={<Account />} />

        </Routes>
      </Router>
    </div>

  )
}

export default App;