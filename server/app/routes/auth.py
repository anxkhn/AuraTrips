from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session

from app.crud import user as user_crud
from app.database import get_db
from app.schemas.user import Token, UserCreate
from app.utils.auth import create_access_token, get_password_hash, verify_password

router = APIRouter()


@router.post("/signup", response_model=Token)
async def signup(user: UserCreate, db: Session = Depends(get_db)):
    try:
        db_user = user_crud.create_user(
            db, user, get_password_hash(user.password))
        access_token = create_access_token(data={"sub": db_user.email})
        return JSONResponse(content={"token": access_token}, status_code=201)
    except Exception as error:
        print(error)
        raise HTTPException(status_code=500, detail="Error signing up")


@router.post("/signin", response_model=Token)
async def signin(user: UserCreate, db: Session = Depends(get_db)):
    print(555555555)
    db_user = user_crud.get_user_by_email(db, email=user.email)
    if not db_user or not verify_password(user.password, db_user.hashed_password):
        raise HTTPException(
            status_code=401, detail="Incorrect email or password")
    access_token = create_access_token(data={"sub": db_user.email})
    return JSONResponse(content={"token": access_token}, status_code=200)


@router.post("/continue", response_model=Token)
async def continue_without_signup():
    access_token = create_access_token(data={"sub": "temporary_user"})
    return JSONResponse(content={"token": access_token})
