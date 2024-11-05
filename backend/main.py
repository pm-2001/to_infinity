from fastapi import FastAPI
from routes import image_route, text_route, video_route
app = FastAPI()



app.include_router(image_route.router, prefix="/image")
app.include_router(text_route.router, prefix="/text")
app.include_router(video_route.router, prefix="/video")

@app.get("/")
def home():
    return {"server is running"}
