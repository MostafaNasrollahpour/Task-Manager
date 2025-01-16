# import section about library
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# import section about my defind
from schemas.users import UserSignIn, UserSignUp, CurrentUser
from schemas.projects import ProjectCreated, ProjectSelected, ProjectEdited, ProjectUpdate
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
        is_admin = check_admin(user.email)
        return {
            'is_succes': 'true',
            'is_admin': is_admin
        }
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


@app.post('/get-project')
async def get_project(user: CurrentUser):
    projects = get_project_from_db(user.email)
    return {
        'projects': projects
    }


@app.get('/get-users')
async def get_users():
    users = get_users_from_db()
    return {
        'users': users
    }


@app.post('/get-my-users-projects')
async def get_my_users_projects(user: CurrentUser):
    projects = get_sub_projects_from_db(user.email)
    return {
        'projects': projects
    }


@app.post('/get-my-projects')
async def get_my_projects(user: CurrentUser):
    projects = get_my_projects_from_db(user.email)
    return {
        'projects': projects
    }


@app.post('/add-admin')
async def add_admin(user: CurrentUser):
    result = add_admin_to_db(user.email)
    if result:
        return OK
    return UnExpected


@app.post('/get-one-project')
async def get_one_project(project: ProjectSelected):
    project = get_one_project_from_db(project.id)[0]
    return{
        'project': project
    }


@app.post('/edit-project')
async def edit_project(project: ProjectEdited):
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
    delete_project(project.id)
    result = insert_projects(values)
    if result:
        return OK
    return UnExpected


@app.post('/update-status')
async def update_status(project: ProjectUpdate):
    result = update_project_status(project_id=project.id, new_status=project.status)
    if result:
        return OK
    return UnExpected


@app.post('/delete-project')
async def delete_project_by_id(project: ProjectSelected):
    result = delete_project(id=project.id)
    if result:
        return OK
    return UnExpected

