import './App.css';
import { GiHamburgerMenu } from 'react-icons/gi';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import { Header } from './components/Header';
import { Navbar } from './components/Navbar';
import { Home } from './components/Home';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Datosuser } from './components/conectphp/Datosuser';
import Login from './components/login/Login';
import Register from './components/register/Register';


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
            <Route path='/Register' exact={true} Component={Register} />
            <Route path='/Login' exact={true} Component={Login} />
            </Routes>
        
          <Routes>
              <Route path='/' exact={true} Component={Home} />
              <Route path='/about' exact={true} Component={About} />
              <Route path='/Contact' exact={true} Component={Contact} />
              <Route path='/Datosuser' exact={true} Component={Datosuser} />
          </Routes>
        </div>

      </Router>
    </>
  );
}

export default App;
