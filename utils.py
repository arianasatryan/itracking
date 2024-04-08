from ultralytics import YOLO
import cv2

models = {
    "FaceRadio": YOLO('models/yolov8n-face.pt'),
    "PoseRadio": YOLO(f"yolov8x-pose.pt")
}

def detect(image_path, category, output_path, show_keypoints=True, show_boxes=True):
    assert category in models
    model = models[category]
    results = model.predict(source=image_path, conf=0.3, classes=0, stream=False, verbose=False)
    pil_image = results[0].plot(boxes=show_boxes, kpt_radius=int(show_keypoints)*3, pil=True, save=True, filename=output_path)
    return pil_image, results


def track(video_path, category, output_video_path, show_keypoints=True, show_boxes=True):
    assert category in models
    model = models[category]
    cap = cv2.VideoCapture(video_path)
    frame_width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    frame_height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    fps = int(cap.get(cv2.CAP_PROP_FPS))

    fourcc = cv2.VideoWriter_fourcc(*'MP4V')
    out = cv2.VideoWriter(output_video_path, fourcc, fps, (frame_width, frame_height))

    while cap.isOpened():
        success, frame = cap.read()
        if success:
            results = model.track(frame, persist=True)
            annotated_frame = results[0].plot(boxes=show_boxes, kpt_radius=int(show_keypoints)*3)
            out.write(annotated_frame)
        else:
            break
    return output_video_path

"""
activeModel= 'FaceRadio'
output_tmp_file_path = 'ztmp/test.mp4'
show_keypoints = True
show_boxes = True
track('/home/lab6/Downloads/5752729-hd_1920_1080_30fps.mp4', category=activeModel, output_video_path=output_tmp_file_path, show_keypoints=show_keypoints, show_boxes=show_boxes)
"""