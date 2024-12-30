from pydantic import BaseModel



class UserSignIn(BaseModel):
    name: str
    email: str
    skills: str
    work_history: str
    password: str
    is_admin: bool = False


class UserSignUp(BaseModel):
    email: str
    password: str