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