# Post2Product

 > ## Installation
 clone this repository 

- open in any text editor 
-  `cd Post2Product`
> ## 1. Web application

### a. backend
1. `cd backend`

2. create a virtual environment
- `python -m venv env`

for linux / MacOS
- `source env/bin/activate`
for windows
- `.\env\Scripts\activate`

- `pip install -r requirements.txt`
3. make a .env file in /backend

### AWS Configuration

The project also requires AWS credentials for accessing various AWS services. Below are the necessary details provided by the AWS website:

- *AWS Access Key*: your_aws_access_key
- *AWS Secret Key*: your_aws_secret_key
- *S3 Bucket Name*: your_bucket_name

### Google Vortex AI Configuration

The project also requires Google Cloud credentials for accessing Google Cloud services. Below are the necessary details provided by the Google Cloud Console:

- *Google API KEY*: google gemini api key

- add all these keys into .env file.



4. `uvicorn main:app --reload`


### b. frontend
- `cd frontend`
- `npm install`
- `npm run dev`


### Home page
![image](https://github.com/user-attachments/assets/e8396231-e494-418c-a831-1dc89ea5495f)

### Loading Page
![image](https://github.com/user-attachments/assets/b05e23aa-afef-4ced-a7c9-9e2462e1c6cf)

### Result Page
![image](https://github.com/user-attachments/assets/eb2a1909-0bb5-466e-946c-3758c767d25b)

![image](https://github.com/user-attachments/assets/75965c48-de7e-4167-b1b0-887e963192b7)

