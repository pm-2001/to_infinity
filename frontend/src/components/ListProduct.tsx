import React from "react";
import { Product } from "./apiServices";

interface ListProductProps {
  product: Product;
}

const ListProduct: React.FC<ListProductProps> = ({ product}) => {
  console.log("Product data:", product);
  return (
    <div className="row justify-content-center">
      <div className="col-12 col-md-11 col-lg-9">
        <div className="card d-flex flex-row m-3" style={{ width: "100%", padding: "15px" }}>
          <img
            src={product.image_link}
            className="card-img-left"
            alt={product.name}
            style={{ width: "300px", objectFit: "cover" }}
          />
          <div className="card-body d-flex flex-column">
            <h2 className="card-title">{product.name}</h2>
            <p className="card-text" style={{ fontSize: "18px" }}>
              {product.description}
            </p>
            <div className="row">
              <div className="col">
                <h5>Price:</h5>
                <p>{product.price}</p>
              </div>
              <div className="col">
                <h5>Category:</h5>
                <p>{product.category}</p>
              </div>
            </div>
            <div className="row mt-1">
              <h5>Features:</h5>
              {product.features.map((feature, index) => (
                <span key={index} className="badge bg-secondary m-1">
                  {feature}
                </span>
              ))}
            </div>
            <div className="row mt-3">
              <button className="btn btn-primary" style={{ width: "120px" }}>
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListProduct;
