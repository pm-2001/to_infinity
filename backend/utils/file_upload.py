from fastapi import UploadFile
import boto3

BUCKET_NAME = 'amazonhackon'
AWS_ACCESS_KEY_ID = 'AKIA47CRXMU3YRR2UXW7'
AWS_SECRET_ACCESS_KEY = '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'

s3 = boto3.client('s3', aws_access_key_id=AWS_ACCESS_KEY_ID,aws_secret_access_key=AWS_SECRET_ACCESS_KEY)

def s3fileUpload(file_content:UploadFile,item_name:str):
    if file_content:
        print("file content")
        s3.upload_fileobj(file_content,BUCKET_NAME,f"{item_name}.png")
        link = "https://d1voydi2q6xpb1.cloudfront.net/"f"{item_name}.png"
        return link
    else:
        return "error in uploading"