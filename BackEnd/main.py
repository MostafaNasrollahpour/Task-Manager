# import section about library
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# import section about my defind
from schemas.users import UserSignIn, UserSignUp
from schemas.projects import ProjectCreated
from schemas.response import *
from database import *



app = FastAPI()

origins = [
    "*",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



@app.get('/')
async def home_page():
    return {
        "message": 'hello world'
    }


@app.post('/signin')
async def user_signin(user: UserSignIn):
    result = exist_user(user.email)
    if result:
        return EmailExist
    
    values: tuple = (
        user.name,
        user.email,
        user.skills,
        user.work_history,
        user.password,
        user.is_admin
    )
    
    result = insert_users(values)
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


@app.post('/create-project')
async def create_project(project: ProjectCreated):
    exist = exist_project(name=project.name, manager=project.manager, worker=project.worker)
    if exist:
        return ProjectExist
    
    values: tuple = (
        project.name,
        project.start_date,
        project.manager, 
        project.end_date,
        project.description,
        project.status,
        project.worker, 
        project.priority
    )
    
    result = insert_projects(values)
    if result:
        return OK
    return UnExpected