import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const SingleProduct = ({ token }) => {
  const [selectedProduct, setSelectedProduct] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getProduct = async() => {
      const response = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`);
      const product = await response.json();
      setSelectedProduct(product);
    }

    getProduct()
  }, []);

  const buyNow = async() => {
    await fetch(`https://api.escuelajs.co/api/v1/products/${id}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json"
      }
    });

    navigate('/products');
  }

  return (
    <>
      {
        selectedProduct.images ? 
          <img 
            src={selectedProduct.images[0].slice(2, -2)} 
            alt={`A beautiful ${selectedProduct.title}`}
            height="300"
            width="300" 
          /> : 
          null
      }

      <h2>{selectedProduct.title}</h2>
      <h2>Price: ${selectedProduct.price}</h2>

      <p>{selectedProduct.description}</p>

      {
        token ? <button onClick={ buyNow }>Buy Now!</button> : null
      }
      

      <Link to='/products'>Back To All Products</Link>
    </>
    
  )
}

export default SingleProduct;