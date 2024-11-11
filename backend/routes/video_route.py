from fastapi import FastAPI, APIRouter, File, UploadFile
from views.video import videoinfo

router = APIRouter()

@router.post("/")
def video_desc(file: UploadFile = File(...)):
    return videoinfo(file)
