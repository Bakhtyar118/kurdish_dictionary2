from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy import create_engine, Column, Integer, String, Text
from sqlalchemy.orm import declarative_base, sessionmaker, Session
from typing import List, Optional

app = FastAPI()

# Allow your deployed frontend and local dev frontend to talk to the API
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://kurdish-dictionary2.vercel.app",  # your Vercel frontend
        "http://localhost:3000",                   # local dev
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DATABASE_URL = "sqlite:///./kurdish_dictionary2.db"
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(bind=engine)
Base = declarative_base()

class Word(Base):
    __tablename__ = "words"
    id = Column(Integer, primary_key=True, index=True)
    word = Column(String, unique=True, index=True)
    latin = Column(String, index=True)
    plural = Column(String)
    ipa = Column(String)
    definition = Column(Text)
    english = Column(Text)
    kurmanji = Column(Text)
    arabic = Column(Text)
    farsi = Column(Text)
    phrase = Column(Text)
    note = Column(Text)
    synonyms = Column(Text)
    antonyms = Column(Text)
    example = Column(Text)
    regional = Column(Text)

Base.metadata.create_all(bind=engine)

class WordCreate(BaseModel):
    word: str
    latin: Optional[str] = ""
    plural: Optional[str] = ""
    ipa: Optional[str] = ""
    definition: Optional[str] = ""
    english: Optional[str] = ""
    kurmanji: Optional[str] = ""
    arabic: Optional[str] = ""
    farsi: Optional[str] = ""
    phrase: Optional[str] = ""
    note: Optional[str] = ""
    synonyms: Optional[str] = ""
    antonyms: Optional[str] = ""
    example: Optional[str] = ""
    regional: Optional[str] = ""

    class Config:
        orm_mode = True

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/", tags=["Root"])
def read_root():
    return {"message": "API with SQLite works!"}

@app.get("/words/", response_model=List[WordCreate])
def list_words(db: Session = Depends(get_db)):
    return db.query(Word).all()

@app.post("/words/", response_model=WordCreate)
def create_word(word: WordCreate, db: Session = Depends(get_db)):
    db_word = db.query(Word).filter(Word.word == word.word).first()
    if db_word:
        raise HTTPException(status_code=400, detail="Word already exists")
    new_word = Word(**word.dict())
    db.add(new_word)
    db.commit()
    db.refresh(new_word)
    return new_word

@app.put("/words/{word_id}", response_model=WordCreate)
def update_word(word_id: int, word: WordCreate, db: Session = Depends(get_db)):
    db_word = db.query(Word).filter(Word.id == word_id).first()
    if not db_word:
        raise HTTPException(status_code=404, detail="Word not found")
    for key, value in word.dict().items():
        setattr(db_word, key, value)
    db.commit()
    db.refresh(db_word)
    return db_word

@app.delete("/words/{word_id}")
def delete_word(word_id: int, db: Session = Depends(get_db)):
    db_word = db.query(Word).filter(Word.id == word_id).first()
    if not db_word:
        raise HTTPException(status_code=404, detail="Word not found")
    db.delete(db_word)
    db.commit()
    return {"ok": True, "message": "Word deleted"}