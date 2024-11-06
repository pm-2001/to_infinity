from fastapi.encoders import jsonable_encoder
import os
import shutil
from fastapi.responses import JSONResponse
from fastapi import status
from g4f.client import Client
from utils.json_extract import extract_json
from utils.image_generator import generate_images_from_json
import g4f.Provider.GeminiPro as GeminiPro


GEMINI_API_KEY=""
# clientimage = Client(provider=GeminiPro, api_key = GEMINI_API_KEY)
client = Client(provider=GeminiPro, api_key=GEMINI_API_KEY)


import os
import tempfile
import moviepy.editor as mp
import speech_recognition as sr


temp_dir = tempfile.mkdtemp()
def transcribe_video(video_path):
    # Load the video file
    video = mp.VideoFileClip(video_path)

    # Extract audio from the video
    audio = video.audio

    # Save audio to a temporary file
    audio_temp_file = os.path.join(temp_dir, "temp_audio.wav")
    audio.write_audiofile(audio_temp_file)

    # Initialize the recognizer
    recognizer = sr.Recognizer()

    # Recognize speech from the audio
    with sr.AudioFile(audio_temp_file) as source:
        audio_data = recognizer.record(source)
        try:
            # Use Google Web Speech API to perform speech recognition
            transcript = recognizer.recognize_google(audio_data, language="en-US")  # Adjust language if needed
            return transcript
        except sr.UnknownValueError:
            return "Speech recognition could not understand audio"
        except sr.RequestError as e:
            return f"Could not request results from Google Speech Recognition service; {e}"

def videoinfo(file):
    try:
        # Save the uploaded video file temporarily
        video_path = os.path.join(temp_dir, file.filename)
        with open(video_path, "wb") as f:
            shutil.copyfileobj(file.file, f)
        # Transcribe the video
        transcription = transcribe_video(video_path)
        print("Transcription",transcription)
        ntpi= ';extract keywords related to each object described in text and list them like this: {"Product name 1": ["feature 1","Feature 2","feature 3"],"Product name 2": ["feature 1","Feature 2","feature 3"],"Product name 3": ["feature 1","Feature 2","feature 3"],}, without ```'

        prompt = "Text:"+transcription + ntpi
        response = client.chat.completions.create(
            model="",
            messages=[{"role": "user", "content": prompt}],
        )
        if response.choices[0].message.content:
            response_json = response.choices[0].message.content
            print(response_json)
            response_json = extract_json(response_json)
            if response_json:
                newjson = generate_images_from_json(response_json)
                # newjson = generate_images_from_json(response_json)
                print(newjson)
                return newjson  # Using the default Status code i.e. Status 200
            else:
                msg = [{"message": "Incorrect data/missing data"}]
                return JSONResponse(content=jsonable_encoder(msg), status_code=status.HTTP_404_NOT_FOUND)
        else:
            return f"Error: {response.status_code}, {response.text}"
    except:
        msg = [{"message": "Incorrect data/missing data"}]
        return JSONResponse(content=jsonable_encoder(msg), status_code=status.HTTP_404_NOT_FOUND)
    


