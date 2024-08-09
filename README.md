# assignment

## How to run in local?

1. Make sure docker is installed and have it running in the background. We use docker to run the mongodb in local
2. clone the project `git clone https://github.com/pksharma132/assignment.git`
3. cd in to the project and run `bash setup.sh`. This will pull the mongodb image and start a mongodb instance 
4. now cd in `backend` and run `npm start`
5. switch to `user-management` and run `npm start`
6. The service must be running on port `3000`.
7. Import the post man collection in the root directory of the project in your post man app / website and hit and verify the endpoints.