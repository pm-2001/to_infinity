from fastapi import FastAPI, APIRouter
from views.image import imageinfo
from fastapi import File, UploadFile

router = APIRouter()

@router.post("/")
def image_upload(file : UploadFile = File(...)):
    print(type(file))
    return imageinfo(file)
