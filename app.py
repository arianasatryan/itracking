import os

from fastapi import FastAPI, File, UploadFile, Request
import fastapi
print(fastapi.__path__)
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse, Response

app = FastAPI()

templates = Jinja2Templates(directory="templates")
app.mount("/static", StaticFiles(directory="static"), name="static")


@app.post("/upload")
async def upload_video_get(file: UploadFile = File(...)):
    file_content = await file.read()
    return Response(content=file_content, media_type="video/mp4")

@app.get("/", response_class=HTMLResponse)
async def root(request: Request):
    return templates.TemplateResponse(
        "index.html", {"request": request}
    )