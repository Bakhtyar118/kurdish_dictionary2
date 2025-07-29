from fastapi import FastAPI, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.orm import declarative_base, sessionmaker, Session
from typing import List

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
# Your database file path (change as you wish)
DATABASE_URL = "sqlite:///./kurdish_dictionary2.db"

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(bind=engine)
Base = declarative_base()

# Define your SQLAlchemy model (DB table)
class Word(Base):
    __tablename__ = "words"
    id = Column(Integer, primary_key=True, index=True)
    word = Column(String, unique=True, index=True) # Main Kurdish word (Sorani, RTL)
    latin = Column(String, index=True) # Latin spelling (LTR)
    definition = Column(String) # Definition in Kurdish (RTL)
    english = Column(String) # English translation (LTR)

    # Create the database tables
Base.metadata.create_all(bind=engine)

# Define Pydantic model for API
class WordCreate(BaseModel):    
    word: str
    latin: str
    definition: str
    english: str


# Initialize FastAPI app
app = FastAPI()

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
# Home endpoint        
@app.get("/")
def read_root():
    return {"message": "API with SQLite works!"}

# POST endpoint to add new word
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