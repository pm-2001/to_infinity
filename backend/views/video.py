from fastapi.encoders import jsonable_encoder



def videoinfo():
    return jsonable_encoder({
        'video': 'video.jpg',
        'size': '1024x768'
    })