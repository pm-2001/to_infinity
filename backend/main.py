from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import image_route, text_route, video_route

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(image_route.router, prefix="/image")
app.include_router(text_route.router, prefix="/text")
app.include_router(video_route.router, prefix="/video")

# Home route
@app.get("/")
def home():
    return {"message": "Server is running"}
