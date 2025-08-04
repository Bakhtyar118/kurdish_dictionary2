from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.orm import declarative_base, sessionmaker, Session
from typing import List

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",  # for local dev
        "https://kurdish-dictionary2.vercel.app",  # for your deployed frontend
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
    word = Column(String, unique=True, index=True)    # Kurdish/Arabic/Latin
    plural = Column(String, nullable=True)            # Plural form
    latin = Column(String, index=True, nullable=True) # Latin spelling
    definition = Column(String, nullable=True)
    english = Column(String, nullable=True)
    kurmanji = Column(String, nullable=True)
    arabic = Column(String, nullable=True)
    farsi = Column(String, nullable=True)
    phrase = Column(String, nullable=True)
    note = Column(String, nullable=True)
    synonyms = Column(String, nullable=True)
    antonyms = Column(String, nullable=True)
    example = Column(String, nullable=True)
    regional = Column(String, nullable=True)
    ipa = Column(String, nullable=True)

Base.metadata.create_all(bind=engine)

class WordCreate(BaseModel):
    word: str
    plural: str = ""
    latin: str = ""
    definition: str = ""
    english: str = ""
    kurmanji: str = ""
    arabic: str = ""
    farsi: str = ""
    phrase: str = ""
    note: str = ""
    synonyms: str = ""
    antonyms: str = ""
    example: str = ""
    regional: str = ""
    ipa: str = ""

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
            plural=w.plural,
            latin=w.latin,
            definition=w.definition,
            english=w.english,
            kurmanji=w.kurmanji,
            arabic=w.arabic,
            farsi=w.farsi,
            phrase=w.phrase,
            note=w.note,
            synonyms=w.synonyms,
            antonyms=w.antonyms,
            example=w.example,
            regional=w.regional,
            ipa=w.ipa,
        )
        for w in words
    ]

@app.post("/words/", response_model=WordCreate)
def create_word(word: WordCreate, db: Session = Depends(get_db)):
    db_word = Word(
        word=word.word,
        plural=word.plural,
        latin=word.latin,
        definition=word.definition,
        english=word.english,
        kurmanji=word.kurmanji,
        arabic=word.arabic,
        farsi=word.farsi,
        phrase=word.phrase,
        note=word.note,
        synonyms=word.synonyms,
        antonyms=word.antonyms,
        example=word.example,
        regional=word.regional,
        ipa=word.ipa,
    )
    db.add(db_word)
    try:
        db.commit()
        db.refresh(db_word)
        return word
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=str(e))