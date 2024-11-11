import React, { useRef, useState, useEffect } from "react";
import * as apiServices from "./apiServices";
import ListProduct from "./ListProduct";
import Loader from "./Loader";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  features: string[];
  specifications?: string[];
  image_link: string;
}

const CardInput = () => {
  const [textInput, setTextInput] = useState<string>("");
  const [productsData, setProductsData] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  const mapResponseToProduct = (response: any) => {
    if (response && typeof response === "object") {
      const productsArray: Product[] = Object.entries(response).map(
        ([name, details]) => ({
          id: Math.floor(Math.random() * 1000),
          name,
          description:
            (details as any).description[0] || "No description available",
          price:
            (details as any).price[0] !== "NULL"
              ? (details as any).price[0]
              : "N/A",
          category: (details as any).category[0] || "Uncategorized",
          features: (details as any).features || [],
          specifications:
            (details as any).specifications[0] !== "NULL"
              ? (details as any).specifications
              : [],
          image_link: (details as any).image_link || "",
        })
      );

      if (productsArray.length > 0) {
        setProductsData(productsArray);
      }
    }
  };

  const handleTextSubmit = async () => {
    setLoading(true);
    try {
      const response = await apiServices.submitText(textInput);
      console.log("Text submitted successfully:", response);
      mapResponseToProduct(response);
      setLoading(false);
    } catch (error) {
      console.error("Error submitting text:", error);
    }
  };

  const handleImageUpload = () => {
    imageInputRef.current?.click();
  };

  const handleImageSubmit = async () => {
    setLoading(true);
    const imageFile = imageInputRef.current?.files?.[0];
    if (imageFile) {
      try {
        const response = await apiServices.submitImage(imageFile);
        console.log("Image uploaded successfully:", response);

        mapResponseToProduct(response);
        setLoading(false);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    } else {
      console.error("No image file selected");
    }
  };

  const handleVideoUpload = () => {
    videoInputRef.current?.click();
  };

  const handleVideoSubmit = async () => {
    setLoading(true);
    const videoFile = videoInputRef.current?.files?.[0];
    if (videoFile) {
      try {
        const response = await apiServices.submitVideo(videoFile);
        console.log("Video uploaded successfully:", response);
        mapResponseToProduct(response);
        setLoading(false);
      } catch (error) {
        console.error("Error uploading video:", error);
      }
    } else {
      console.error("No video file selected");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-5">
      <div className="container">
        {/* First Row for Cards: Text, Image, and Video */}
        <div className="row gx-5">
          {/* Text Card */}
          <div className="col-md-4 d-flex justify-content-center mb-3">
            <div
              className="card shadow-lg"
              style={{
                width: "22rem",
                height: "22rem",
                padding: "1.5rem",
                borderRadius: "15px",
                background: "linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)",
                color: "white",
                transition: "transform 0.2s ease-in-out",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              <div className="card-body text-center">
                <b>
                  <h3 className="card-title">Text</h3>
                </b>
                <textarea
                  className="form-control"
                  placeholder="Enter your text here..."
                  style={{
                    height: "12rem",
                    borderRadius: "10px",
                    borderColor: "#B39DDB",
                    color: "#333",
                  }}
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                ></textarea>
                <button
                  className="btn mt-3 animated-btn"
                  onClick={handleTextSubmit}
                  style={{
                    background: "linear-gradient(135deg, #FFA500, #FFD700)", // Orange to Yellow gradient
                    color: "white",
                    borderRadius: "50px", // Rounded edges
                    padding: "0.5rem 1.5rem",
                    border: "none",
                    transition: "transform 0.2s ease-in-out",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.05)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                >
                  Submit Text
                </button>
              </div>
            </div>
          </div>

          {/* Image Card */}
          <div className="col-md-4 d-flex justify-content-center mb-3">
            <div
              className="card shadow-lg"
              style={{
                width: "22rem",
                height: "22rem",
                padding: "1.5rem",
                borderRadius: "15px",
                background: "linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)",
                color: "white",
                transition: "transform 0.2s ease-in-out",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              <div className="card-body text-center">
                <b>
                  <h3 className="card-title">Image</h3>
                </b>
                {/* Inserted image preview */}
                <img
                  src="/src/assets/image.png"
                  alt="Preview"
                  className="img-fluid mb-3"
                  style={{ maxHeight: "170px", borderRadius: "8px" }}
                />
                <div className="input-group justify-content-center">
                  <input
                    type="file"
                    accept="image/*"
                    ref={imageInputRef}
                    style={{ display: "none" }}
                    onChange={handleImageSubmit}
                  />
                  <button
                    className="btn mt-3 animated-btn"
                    onClick={handleImageUpload}
                    style={{
                      background: "linear-gradient(135deg, #FFA500, #FFD700)", // Orange to Yellow gradient
                      color: "white",
                      borderRadius: "50px", // Rounded edges
                      padding: "0.5rem 1.5rem",
                      border: "none",
                      transition: "transform 0.2s ease-in-out",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.transform = "scale(1.05)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.transform = "scale(1)")
                    }
                  >
                    Choose Image
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Video Card */}
          <div className="col-md-4 d-flex justify-content-center mb-3">
            <div
              className="card shadow-lg"
              style={{
                width: "22rem",
                height: "22rem",
                padding: "1.5rem",
                borderRadius: "15px",
                background: "linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)",
                color: "white",
                transition: "transform 0.2s ease-in-out",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              <div className="card-body text-center">
                <b>
                  <h3 className="card-title">Video</h3>
                </b>
                {/* Inserted video thumbnail preview */}
                <img
                  src="/src/assets/video.png"
                  alt="Video Preview"
                  className="img-fluid mb-3"
                  style={{ maxHeight: "170px", borderRadius: "8px" }}
                />
                <div className="input-group justify-content-center">
                  <input
                    type="file"
                    accept="video/*"
                    ref={videoInputRef}
                    style={{ display: "none" }}
                    onChange={handleVideoSubmit}
                  />
                  <button
                    className="btn mt-3 animated-btn"
                    onClick={handleVideoUpload}
                    style={{
                      background: "linear-gradient(135deg, #FFA500, #FFD700)", // Orange to Yellow gradient
                      color: "white",
                      borderRadius: "50px", // Rounded edges
                      padding: "0.5rem 1.5rem",
                      border: "none",
                      transition: "transform 0.2s ease-in-out",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.transform = "scale(1.05)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.transform = "scale(1)")
                    }
                  >
                    Choose Video
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Second Row for ListProduct */}
        <div
          className="row justify-content-center mt-3 mb-5"
          style={{ width: "100%" }}
        >
          {/* Ensure the component inside takes up full width */}
          {loading && <Loader />}
          {!loading && <ListProduct product={productsData} />}
        </div>
      </div>
    </div>
  );
};

export default CardInput;
