
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Order from './components/Order';

function App() {
  return (
    <Router>
      <div>
        <Routes>
        
          <Route path="/" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/order" element={<Order/>}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
