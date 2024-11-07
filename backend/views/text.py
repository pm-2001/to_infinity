from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from fastapi import status
from g4f.client import Client
from utils.json_extract import extract_json
from utils.image_generator import generate_images_from_json
import json
from g4f.Provider.GeminiPro import GeminiPro
from g4f.Provider.GeminiProChat import GeminiProChat
import google.generativeai as genai
from dotenv import load_dotenv
load_dotenv()
import os



GEMINI_API_KEY=os.getenv("GEMINI_API_KEY")

client = Client(provider=GeminiPro, api_key=GEMINI_API_KEY)


# extract keywords related to each object described here and list them like this: {"Product Name": {"description": ["detailed description"],"price": ["cost of product"],"variations": ["size/color variations (if applicable)"],"category": ["product category"],"features": ["key features"],"specifications": ["specifications"]}} and if required details are missing, mention NULL in the list

def textinfo(request):
    if request.text:
        # ntpi= 'extract keywords related to each object described here and list them like this: {"Product name 1": ["feature 1","Feature 2","feature 3"],"Product name 2": ["feature 1","Feature 2","feature 3"],"Product name 3": ["feature 1","Feature 2","feature 3"],}without ```'

        ntpi= ';extract keywords related to each object described here and list them like this: {"Product Name": {"description": ["detailed description in one paragraph"],"price": ["cost of product"],"variations": ["size/color variations (if applicable)"],"category": ["product category"],"features": ["key features"],"specifications": ["specifications"]}} and if required details are missing, mention NULL in the list ; without ```'

        print("Request text:", request.text)
        prompt = request.text + ntpi
        
        try:
            response = client.chat.completions.create(
                model="",
                messages=[{"role": "user", "content": prompt}],
            )
            
            # Print raw response for debugging
            response_text = response.choices[0].message.content
            print(response_text)
            cleaned_text = response_text.replace("```json", "").replace("```", "").strip()
            
            if cleaned_text:
                try:
                    response_json = extract_json(cleaned_text)
                    print("Parsed JSON:", response_json)             
                    if response_json:
                        new_json = generate_images_from_json(response_json)
                        print("Generated JSON for images:", new_json)
                        return new_json
                    else:
                        msg = [{"message": "Incorrect data/missing data in the JSON response"}]
                        return JSONResponse(content=jsonable_encoder(msg), status_code=status.HTTP_404_NOT_FOUND)
                
                except json.JSONDecodeError:
                    msg = [{"message": "Error parsing JSON response from the model"}]
                    return JSONResponse(content=jsonable_encoder(msg), status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
            else:
                msg = [{"message": "Empty or invalid response from the model"}]
                return JSONResponse(content=jsonable_encoder(msg), status_code=status.HTTP_404_NOT_FOUND)
        
        except Exception as e:
            # Log and return error message
            print(f"Error making API request: {e}")
            msg = [{"message": "Error making API request"}]
            return JSONResponse(content=jsonable_encoder(msg), status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    else:
        msg = [{"message": "Text is required in the request"}]
        return JSONResponse(content=jsonable_encoder(msg), status_code=status.HTTP_400_BAD_REQUEST)
    return request