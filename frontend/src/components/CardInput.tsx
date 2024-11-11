import React, { useRef, useState } from "react";
import * as apiServices from "./apiServices";
import ListProduct from "./ListProduct";

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

// CardInput Component
const CardInput = () => {
  const [textInput, setTextInput] = useState<string>("");
  const [productData, setProductData] = useState<Product | null>(null);

  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  // Function to map response to Product array
  const mapResponseToProduct = (response: any) => {
    if (response && typeof response === "object") {
      const productsArray: Product[] = Object.entries(response).map(
        ([name, details]) => ({
          id: Math.floor(Math.random() * 1000), // Random ID for now
          name, // Product name key
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

      // Assuming we want to display only the first product for now
      if (productsArray.length > 0) {
        setProductData(productsArray[0]);
      }
    }
  };

  // Handle Text Submission
  const handleTextSubmit = async () => {
    try {
      const response = await apiServices.submitText(textInput);
      console.log("Text submitted successfully:", response);
      // Map the response structure to Product array
      mapResponseToProduct(response);
    } catch (error) {
      console.error("Error submitting text:", error);
    }
  };

  // Handle Image Upload
  const handleImageUpload = () => {
    imageInputRef.current?.click();
  };

  const handleImageSubmit = async () => {
    const imageFile = imageInputRef.current?.files?.[0];
    if (imageFile) {
      try {
        const response = await apiServices.submitImage(imageFile);
        console.log("Image uploaded successfully:", response);
        // Map the response structure to Product array
        mapResponseToProduct(response);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    } else {
      console.error("No image file selected");
    }
  };

  // Handle Video Upload
  const handleVideoUpload = () => {
    videoInputRef.current?.click();
  };

  const handleVideoSubmit = async () => {
    const videoFile = videoInputRef.current?.files?.[0];
    if (videoFile) {
      try {
        const response = await apiServices.submitVideo(videoFile);
        console.log("Video uploaded successfully:", response);
        // Map the response structure to Product array
        mapResponseToProduct(response);
      } catch (error) {
        console.error("Error uploading video:", error);
      }
    } else {
      console.error("No video file selected");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-5">
      <div className="row">
        {/* Text Input Card */}
        <div className="col-md-4 d-flex justify-content-center mb-4">
          <div
            className="card"
            style={{ width: "22rem", height: "22rem", padding: "1.5rem" }}
          >
            <div className="card-body text-center">
              <h5 className="card-title">Text Input Card</h5>
              <textarea
                className="form-control"
                placeholder="Enter your text here..."
                style={{ height: "7rem" }}
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
              ></textarea>
              <button
                className="btn btn-primary mt-3"
                onClick={handleTextSubmit}
              >
                Submit Text
              </button>
            </div>
          </div>
        </div>

        {/* Image Upload Card */}
        <div className="col-md-4 d-flex justify-content-center mb-4">
          <div
            className="card"
            style={{ width: "22rem", height: "22rem", padding: "1.5rem" }}
          >
            <div className="card-body text-center">
              <h5 className="card-title">Image Upload Card</h5>
              <input
                type="file"
                accept="image/*"
                ref={imageInputRef}
                style={{ display: "none" }}
                onChange={handleImageSubmit}
              />
              <button
                className="btn btn-primary mt-3"
                onClick={handleImageUpload}
              >
                Upload Image
              </button>
            </div>
          </div>
        </div>

        {/* Video Upload Card */}
        <div className="col-md-4 d-flex justify-content-center mb-4">
          <div
            className="card"
            style={{ width: "22rem", height: "22rem", padding: "1.5rem" }}
          >
            <div className="card-body text-center">
              <h5 className="card-title">Video Upload Card</h5>
              <input
                type="file"
                accept="video/*"
                ref={videoInputRef}
                style={{ display: "none" }}
                onChange={handleVideoSubmit}
              />
              <button
                className="btn btn-primary mt-3"
                onClick={handleVideoUpload}
              >
                Upload Video
              </button>
            </div>
          </div>
        </div>
        {productData && <ListProduct product={productData} />}
      </div>
    </div>
  );
};

export default CardInput;
