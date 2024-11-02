from fastapi import FastAPI
from routes import image_route
app = FastAPI()



app.include_router(image_route.router, prefix="/image")

@app.get("/")
def home():
    return {"server is running"}
