from fastapi import FastAPI
from starlette.middleware import Middleware
from starlette.middleware.cors import CORSMiddleware
from routes import image_route, text_route, video_route

origins = [
    "http://localhost",
    "http://localhost:3000",
    "http://localhost:5173",
]

middleware = [
    Middleware(
        CORSMiddleware,
        allow_origins=['*'],
        allow_credentials=True,
        allow_methods=['*'],
        allow_headers=['*']
    )
]
app = FastAPI(middleware=middleware)
# Include routers
app.include_router(image_route.router, prefix="/image")
app.include_router(text_route.router, prefix="/text")
app.include_router(video_route.router, prefix="/video")

# Home route
@app.get("/")
def home():
    return {"message": "Server is running"}
