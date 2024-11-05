from fastapi import FastAPI, APIRouter,Request
from pydantic import BaseModel
from views.text import textinfo

router = APIRouter()

class Text(BaseModel):
    text: str

@router.post("/")
def text_desc(request :Text):
    return textinfo(request)