import axios from "axios";

// Define types
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  features: string[];
  image_link: string;
}

// Axios instance
const apiClient = axios.create({
  baseURL: "http://127.0.0.1:8000",  // Ensure this is the correct URL for your API
  timeout: 10000000,
});

// API functions
export const submitText = async (text: string): Promise<any> => {
  const response = await apiClient.post("/text/", { text });
  console.log("Text submitted successfully:", response.data);
  return response.data;
};

export const submitImage = async (imageFile: File): Promise<any> => {
  console.log("Submitting image file:", imageFile);
  const formData = new FormData();
  formData.append('file', imageFile);  // Make sure the key "image" matches your backend's expected field name
  console.log(formData);
  try {
    const response = await axios.post('http://127.0.0.1:8000/image/',formData, {headers: {'content-type': 'multipart/form-data'},});
    return response.data;

  } catch (error) {
    const err = error as any;
    console.error("Error uploading image:", err.response?.data || err.message);
    throw error;  // Rethrow to handle in the calling component
  }
};

export const submitVideo = async (videoFile: File): Promise<any> => {
  const formData = new FormData();
  formData.append("file", videoFile);  // Same for video, if applicable
  const response = await apiClient.post("/video/", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const fetchProduct = async (productName: string): Promise<Product> => {
  const response = await apiClient.get<Product>(`/products/${productName}`);
  return response.data;
};
