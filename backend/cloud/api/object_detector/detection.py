import numpy as np
import cv2
from urllib.request import urlopen

def Detect_Objects(image_url):

    PROTOTXT_PATH = "models/MobileNetSSD_deploy.prototxt"
    MODEL_PATH = "models/MobileNetSSD_deploy.caffemodel"
    MIN_CONF = 0.001
    CLASSES = ['person']

    # Load image from url:
    req = urlopen(image_url)
    arr = np.array(bytearray(req.read()), dtype=np.uint8)
    image = cv2.imdecode(arr, -1)

    COLOURS = np.random.uniform(0, 255, size=(len(CLASSES), 3))
    RED = (255,0,0)

    net = cv2.dnn.readNetFromCaffe(PROTOTXT_PATH, MODEL_PATH)

    height, width = image.shape[0], image.shape[1]
    blob = cv2.dnn.blobFromImage(cv2.resize(image, (300, 300)), 0.007, (300,300), 130)

    net.setInput(blob)
    detected_objects = net.forward()

    return detected_objects[0][0][6]
    # returned data will be in the form of:
    # [ 0. class, confidence, top-left, top-right, bottom-left, bottom-right ]

    # for i in range(detected_objects.shape[2]):
    #     confidence = detected_objects[0][0][i][2]

    #     if confidence > MIN_CONF:
    #         class_index = int(detected_objects[0,0,i,1])
    #         if class_index == 15:
                
    #             # retrieve coordinates of detected object:
    #             top_left_x = int(detected_objects[0, 0, i, 3] * width)
    #             top_left_y = int(detected_objects[0, 0, i, 4] * height)
    #             bottom_right_x = int(detected_objects[0, 0, i, 5] * width)
    #             bottom_right_y = int(detected_objects[0, 0, i, 6] * height)

    #             # prediction_text = f"{CLASSES[class_index]}: {confidence:.2f}%"
    #             prediction_text = f"Detected Object: {confidence:.2f}%"
    #             # cv2.rectangle(image, (top_left_x, top_left_y), (bottom_right_x, bottom_right_y), COLOURS[class_index[3]])
    #             cv2.rectangle(image, (top_left_x, top_left_y), (bottom_right_x, bottom_right_y), RED)
    #             cv2.putText(image, prediction_text, (top_left_x, 
    #                         top_left_y-15 if top_left_y>30 else top_left_y+15), 
    #                         cv2.FONT_HERSHEY_SIMPLEX, 0.6, RED, 2)
            
    # cv2.imshow("Detected Objects", image)
    # cv2.waitKey(0)
    # cv2.destroyAllWindows