from pydantic import BaseModel, EmailStr
from typing import Optional


class UserBase(BaseModel):
    username: str
    email: EmailStr


class UserCreate(UserBase):
    password: str


class UserResponse(UserBase):
    id: int
    role: Optional[str]

    class Config:
        from_attributes = True
        
        
class Token(BaseModel):
    access_token: str
    token_type: Optional[str] = None


class UserLogin(BaseModel):
    email: EmailStr
    password: str
        
