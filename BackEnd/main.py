# import section about library
from fastapi import FastAPI


# import section about my defind
from schemas.users import UserSignIn



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
