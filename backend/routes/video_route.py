from fastapi import FastAPI, APIRouter
from views.video import videoinfo

router = APIRouter()

@router.get("/")
def text_desc():
    return videoinfo()
