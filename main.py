import os
import tempfile
from typing import List

from fastapi import FastAPI, File, Form, UploadFile, Request
from fastapi.responses import HTMLResponse, Response, FileResponse
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles

from utils import detect, track

app = FastAPI()
app.mount("/assets", StaticFiles(directory="assets"), name="assets")
templates = Jinja2Templates(directory=".")


@app.post("/upload/image")
async def upload_image(file: UploadFile = File(...), activeModel: str = Form(...), activeOptions: List[str] = Form()):
    try:
        file_extension = os.path.splitext(file.filename)[1]        
        with tempfile.NamedTemporaryFile(suffix=file_extension, delete=False) as tmp_file:
            tmp_file.write(await file.read())
            tmp_file_path = tmp_file.name

        with tempfile.NamedTemporaryFile(suffix=".jpg", delete=False) as output_tmp_file:
            output_tmp_file_path = output_tmp_file.name

        show_keypoints = 'KeypointsCheckbox' in activeOptions
        show_boxes = 'BoxesCheckbox' in activeOptions

        detect(tmp_file_path, category=activeModel, output_path=output_tmp_file_path, show_keypoints=show_keypoints, show_boxes=show_boxes)
        response = FileResponse(path=output_tmp_file_path, media_type="image/jpeg")
        os.remove(tmp_file_path)
        return response
    except Exception as e:
        print("Error:", e, flush=True)
        return {"error": "An error occurred while processing the file"}
    finally:
        if os.path.exists(tmp_file_path):
            os.remove(tmp_file_path)


@app.post("/upload/video")
async def upload_video(file: UploadFile = File(...), activeModel: str = Form(...), activeOptions: List[str] = Form()):
    try:
        # file_extension = os.path.splitext(file.filename)[1]
        # with tempfile.NamedTemporaryFile(suffix=file_extension, dir='ztmp', delete=False) as tmp_file:
        #     tmp_file.write(await file.read())
        #     tmp_file_path = tmp_file.name

        # with tempfile.NamedTemporaryFile(suffix=file_extension, dir='ztmp', delete=False) as output_tmp_file:
        #     output_tmp_file_path = output_tmp_file.name

        # show_keypoints = 'KeypointsCheckbox' in activeOptions
        # show_boxes = 'BoxesCheckbox' in activeOptions
        # print(tmp_file_path, output_tmp_file_path, flush=True)

        # track(tmp_file_path, category=activeModel, output_video_path=output_tmp_file_path, show_keypoints=show_keypoints, show_boxes=show_boxes)
        
        response = FileResponse(path='ztmp/tmpn8n43agb.mp4', media_type="video/mp4")
        # os.remove(tmp_file_path)
        return response
    except Exception as e:
        print("Error:", e, flush=True)
        return {"error": "An error occurred while processing the file"}


@app.get("/", response_class=HTMLResponse)
async def root(request: Request):
    return templates.TemplateResponse(
        "index.html", {"request": request}
    )