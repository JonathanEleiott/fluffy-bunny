import { Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react';

import AllProducts from './AllProducts.jsx';
import SingleProduct from './SingleProduct.jsx';
import Homepage from './Homepage.jsx';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem(`token`));

  const logOut = () => {
    localStorage.removeItem(`token`);
    setToken('');
  }

  return (
    <>
      <nav>
        <Link to='/'>Home</Link>
        <Link to='/products'>All Products</Link>
        {
          token ? <button onClick={logOut}>Log Out</button> : null
        }
        
      </nav>

      <h1>Fluffy Bunny</h1>

      <Routes>
        <Route path="/" element={<Homepage setToken={setToken} token={token} />} />
        <Route path="/products" element={<AllProducts />} />
        <Route path="/products/:id" element={<SingleProduct token={token} />} />
      </Routes>
    </>
  )
}

export default App
