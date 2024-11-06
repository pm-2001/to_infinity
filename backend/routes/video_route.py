from fastapi import FastAPI, APIRouter, File, UploadFile
from views.video import videoinfo

router = APIRouter()

@router.post("/")
def text_desc(file: UploadFile = File(...)):
    return videoinfo(file)
