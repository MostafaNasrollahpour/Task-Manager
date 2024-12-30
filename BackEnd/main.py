# import section about library
from fastapi import FastAPI


# import section about my defind
from schemas.users import UserSignIn, UserSignUp
from schemas.response import *
from database import *



app = FastAPI()



@app.post('/signin')
async def user_signin(user: UserSignIn):
    values: tuple = (
        user.name,
        user.email,
        user.skills,
        user.work_history,
        user.password,
        user.is_admin
    )
    result = exist_user(user.email)
    if result:
        return EmailExist
    result = insert(values)
    if result:
        return OK
    return UnExpected


@app.post('/signup')
async def user_signup(user: UserSignUp):
    exist = exist_user(user.email)
    if not exist:
        return NotEmailExist
    is_password = password_checker(user.email, user.password)
    if is_password:
        return OK
    return IncorrectPassword