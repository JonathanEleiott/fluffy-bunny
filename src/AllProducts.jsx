import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
// import { Link } from 'react-router-dom';

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getProducts = async() => {
      const response = await fetch(`https://api.escuelajs.co/api/v1/products`);
      const allProducts = await response.json();
      // console.log(allProducts);
      setProducts(allProducts);
    }

    getProducts();
  }, []);

  return (
    <section id="all-products">
      {
        products.map((singleProduct) => {
          return (
            // <Link to={`/products/${singleProduct.id}`} key={singleProduct.id}></Link>
            <section onClick={() => { navigate(`/products/${singleProduct.id}`) }} key={singleProduct.id}>
              <img 
                src={singleProduct.images[0].slice(2, -2)} // {singleProduct.images[0]} 
                alt={`A beautiful ${singleProduct.title}`}
                height="250"
                width="250"
              />

              <h2>{singleProduct.title}</h2>
            </section>
          ) 
        })
      }
    </section>
  )
}

export default AllProducts;