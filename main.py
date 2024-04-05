import os
from fastapi import FastAPI, File, Form, UploadFile, Request
from fastapi.responses import HTMLResponse, Response
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles


app = FastAPI()
app.mount("/assets", StaticFiles(directory="assets"), name="assets")
templates = Jinja2Templates(directory=".")


@app.post("/upload/image")
async def upload_image(file: UploadFile = File(...), activeModel: str = Form(...)):
    file_content = await file.read()
    return Response(content=file_content, media_type="image/jpeg")


@app.post("/upload/video")
async def upload_video(file: UploadFile = File(...), activeModel: str = Form(...)):
    print(activeSwitch, flush=True)
    file_content = await file.read()
    return Response(content=file_content, media_type="video/mp4")


@app.get("/", response_class=HTMLResponse)
async def root(request: Request):
    return templates.TemplateResponse(
        "index.html", {"request": request}
    )