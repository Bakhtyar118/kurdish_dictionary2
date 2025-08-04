from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.orm import declarative_base, sessionmaker, Session
from typing import List

# 1. CREATE THE APP FIRST
app = FastAPI()

# 2. THEN ADD CORS MIDDLEWARE!
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://kurdish-dictionary2.vercel.app", "http://localhost:3000"],                
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Rest of your code ---

DATABASE_URL = "sqlite:///./kurdish_dictionary2.db"
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(bind=engine)
Base = declarative_base()

class Word(Base):
    __tablename__ = "words"
    id = Column(Integer, primary_key=True, index=True)
    word = Column(String, unique=True, index=True)
    latin = Column(String, index=True)
    definition = Column(String)
    english = Column(String)

Base.metadata.create_all(bind=engine)

class WordCreate(BaseModel):
    word: str
    latin: str
    definition: str
    english: str

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def read_root():
    return {"message": "API with SQLite works!"}

@app.get("/words/", response_model=List[WordCreate])
def list_words(db: Session = Depends(get_db)):
    words = db.query(Word).all()
    return [
        WordCreate(
            word=w.word,
            latin=w.latin,
            definition=w.definition,
            english=w.english
        )
        for w in words
    ]

@app.post("/words/", response_model=WordCreate)
def create_word(word: WordCreate, db: Session = Depends(get_db)):
    db_word = Word(
        word=word.word,
        latin=word.latin,
        definition=word.definition,
        english=word.english
    )
    db.add(db_word)
    try:
        db.commit()
        db.refresh(db_word)
        return word
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=str(e))