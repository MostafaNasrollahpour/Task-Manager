from pydantic import BaseModel

class ProjectCreated(BaseModel):
    name: str
    start_date: str
    manager: str 
    end_date: str 
    description: str 
    status: int = 0
    worker: str
    priority: int
    

class ProjectSelected(BaseModel):
    id: int


class ProjectEdited(ProjectCreated):
    id: int