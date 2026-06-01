import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    API.get("/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="container mt-4">
      <h2>Products</h2>

      {products.map((product) => (
        <div key={product.id} className="card mb-3 p-3">
          <img
            src={product.image}
            alt={product.title}
            style={{ width: "150px", height: "150px", objectFit: "contain" }}
          />

          <h5>{product.title}</h5>

          <p>${product.price}</p>

          <Link to={`/products/${product.id}`} className="btn btn-primary">
            View Details
          </Link>

          <Link
            to={`/edit-product/${product.id}`}
            className="btn btn-secondary ms-2"
          >
            Edit
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Products;
