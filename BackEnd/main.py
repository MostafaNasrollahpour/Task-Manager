from fastapi import FastAPI
from models.models import *
from schema.database import *

app = FastAPI()

@app.post('/signin')
async def user_signin(user: UserSignIn):
    data = (
        user.name,
        user.email,
        user.skills,
        user.work_history,
        user.password,
        user.is_admin
    )
    
    if not insert(data):
        return {
            'detail': 'fase'
        }

    return {
        'detail': 'true'
    }
