import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

function EditProduct() {
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    API.get(`/products/${id}`)
      .then((response) => {
        const product = response.data;
        setTitle(product.title);
        setPrice(product.price);
        setCategory(product.category);
        setImage(product.image);
        setDescription(product.description);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedProduct = {
      title,
      price,
      category,
      image,
      description,
    };

    API.put(`/products/${id}`, updatedProduct)
      .then(() => {
        alert("Product updated!");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="container mt-4">
      <h2>Edit Product</h2>

      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-2"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          className="form-control mb-2"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <input
          className="form-control mb-2"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <input
          className="form-control mb-2"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        <textarea
          className="form-control mb-2"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button type="submit" className="btn btn-warning">
          Update Product
        </button>
      </form>
    </div>
  );
}

export default EditProduct;
