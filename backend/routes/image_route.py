from fastapi import FastAPI, APIRouter
from views.image import imageinfo

router = APIRouter()

@router.post("/")
def text_desc():
    return imageinfo()
