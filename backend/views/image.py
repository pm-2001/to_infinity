from fastapi.encoders import jsonable_encoder
from fastapi import status
from fastapi.responses import JSONResponse
from g4f.client import Client
from utils.json_extract import extract_json
from utils.image_generator import generate_images_from_json
import json
from pathlib import Path
import shutil
from g4f.Provider.GeminiPro import GeminiPro
from g4f.Provider.GeminiProChat import GeminiProChat


GEMINI_API_KEY=""
# clientimage = Client(provider=GeminiPro, api_key = GEMINI_API_KEY)
client = Client(provider=GeminiPro, api_key=GEMINI_API_KEY)

def imageinfo(file):
    try:
        # Save the uploaded file locally
        upload_folder = Path("uploaded_images")
        upload_folder.mkdir(exist_ok=True)
        file_path = upload_folder / file.filename

        with file_path.open("wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
    
        with file_path.open("rb") as img:
            ntpi1= '; only return name of product;without ``` '
            # prompt = set_lang_english+ntpi+image_identify_prompt_instructions2
            response = client.chat.completions.create(
                model="gemini-1.5-flash",
                messages=[{"role": "user", "content": ntpi1}],
                image=img
            )

        # Delete the locally saved image
        file_path.unlink()
        response_content = response.choices[0].message.content
        print(response_content)

        ntpi2= '; for the products given ,list product names as key and features as value in given prompt like this: {"Product name 1": ["feature 1","feature 2","feature 3"],"Product name 2": ["feature 1","feature 2","feature 3"],"Product name 3": ["feature 1","feature 2","feature 3"],}; without ```'
        prompt ='Product = '+response_content+ntpi2
        response = client.chat.completions.create(
            model="",
            messages=[{"role": "user", "content": prompt}],
        )
        response_text = response.choices[0].message.content
        print("Raw API response:", response_text)
        if response_text:
            try:
                response_json = extract_json(response_text)
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
        return JSONResponse(content={"error": str(e)}, status_code=500)