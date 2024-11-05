from fastapi.encoders import jsonable_encoder



def imageinfo():
    return jsonable_encoder({
        'image': 'image.jpg',
        'size': '1024x768'
    })