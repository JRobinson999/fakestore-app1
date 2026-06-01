import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    API.get(`/products/${id}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  const handleDelete = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?",
    );

    if (!confirmDelete) return;

    API.delete(`/products/${id}`)
      .then(() => {
        alert("Product deleted!");
        navigate("/products");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  if (!product) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="container mt-4">
      <h2>{product.title}</h2>

      <img
        src={product.image}
        alt={product.title}
        style={{ width: "250px", height: "250px", objectFit: "contain" }}
      />

      <p>
        <strong>Price:</strong> ${product.price}
      </p>

      <p>
        <strong>Category:</strong> {product.category}
      </p>

      <p>{product.description}</p>

      <button className="btn btn-danger" onClick={handleDelete}>
        Delete Product
      </button>
    </div>
  );
}

export default ProductDetails;
