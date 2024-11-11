import React from "react";
import { Product } from "./apiServices";
import { updateAmazonUrl } from "./amazonUrl";

interface ListProductProps {
  product: Product[];
}

const ListProduct: React.FC<ListProductProps> = ({ product }) => {
  return (
    <div className="row justify-content-center">
      {product.map((item, index) => {
        const amazonUrl = updateAmazonUrl(item.name, item.features);
        
        return (
          <div key={index} className="col-12 col-md-11 col-lg-10" style={{ width: "100%" }}>
            <div
              className="card d-flex flex-row m-3"
              style={{
                width: "100%",
                maxWidth: "100%",
                maxHeight: "300px",
                padding: "15px",
                borderRadius: "15px",
                background: "linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)",
                color: "white",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.2s ease-in-out",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <img
                src={item.image_link}
                className="card-img-left"
                alt={item.name}
                style={{
                  width: "300px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  maxHeight: "300px",
                }}
              />
              <div className="card-body d-flex flex-column">
                <h3 className="card-title">{item.name}</h3>
                <p className="card-text" style={{ fontSize: "18px" }}>
                  {item.description}
                </p>
                <div className="row">
                  <div className="col-4">
                    <h5>Price:</h5>
                    <p>{item.price}</p>
                  </div>
                  <div className="col-4">
                    <h5>Category:</h5>
                    <p>{item.category}</p>
                  </div>
                  <div className="col-4">
                    <h5>Features:</h5>
                    <p>{item.features.join(", ")}</p>
                  </div>
                </div>

                <div className="row mt-1">
                  <div className="col-12 d-flex justify-content-start">
                    <button
                      className="btn"
                      style={{
                        backgroundColor: "#FFD700",
                        color: "white",
                        borderRadius: "50px",
                        padding: "0.5rem 1rem",
                        border: "none",
                        transition: "transform 0.2s ease-in-out",
                        width: "150px",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.transform = "scale(1.05)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.transform = "scale(1)")
                      }
                    >
                      <a
                        href={amazonUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          textDecoration: "none",
                          color: "white",
                          fontWeight: "bold",
                        }}
                      >
                        Buy Now
                      </a>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ListProduct;
