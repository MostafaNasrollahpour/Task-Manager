import pandas as pd

class CreateProjectsData:
    
    def __init__(self, file_path="projectsData.xlsx"):
        self.file_path = file_path
        self.fieldnames = ["name", "manager", "worker", "start_date", "end_date", "priority", "description", "status"]
        
        # Initialize an empty DataFrame with the specified columns
        self.df = pd.DataFrame(columns=self.fieldnames)
        
        # Save the initial DataFrame to the Excel file
        self._save_to_excel()

    def _save_to_excel(self):
        try:
            # Save the DataFrame to an Excel file
            self.df.to_excel(self.file_path, index=False)
        except Exception as e:
            print(f"Error saving to Excel file: {e}")

    def add_project(self, project_data):
        try:
            # Append the new project data as a row to the DataFrame
            new_row = pd.DataFrame([project_data])
            self.df = pd.concat([self.df, new_row], ignore_index=True)
            
            # Save the updated DataFrame to the Excel file
            self._save_to_excel()
        except Exception as e:
            print(f"Error adding project to Excel file: {e}")
