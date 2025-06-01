import './App.css';
import { GiHamburgerMenu } from 'react-icons/gi';
import { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Routes} from 'react-router-dom';

import { Header } from './components/Header';
import { Navbar } from './components/Navbar';
import { Home } from './components/Home';
import { About } from './components/About';

// import { Sidebar } from './components/Sidebar';



function App() {
  
  const [showNav, setShowNav] = useState(true);

  return (
    <>
      <Router>
        <Header>
          <GiHamburgerMenu onClick={() => setShowNav(!showNav)}/>
        </Header>
        {/* <Sidebar /> */}
        <Navbar show={showNav} />

          <div className='main'>
        <Routes>
            <Route path='/' exact={true} Component={Home} />
            <Route path='/about' exact={true} Component={About} />
        </Routes>
          </div>

      </Router>
    </>
  );
}

export default App;
