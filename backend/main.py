from fastapi import FastAPI
app = FastAPI()
@app.get("/")
def home():
    return {"message": "Kurdish Dictionary API is working!"}