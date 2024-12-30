import mysql.connector


def run_query(query, params=None):
    try:
        conn = mysql.connector.connect(
            host="localhost",
            user="root",
            password="Mosi_5180204453",
            database="data_structure"
        )
        
        cursor = conn.cursor(dictionary=True)
        
        if params:
            cursor.execute(query, params)
        else:
            cursor.execute(query)
        
        rows = cursor.fetchall()
        
        cursor.close()
        conn.close()
        
        return rows
    
    except mysql.connector.Error as error:
        print(f"Error: {error}")
        return None

    finally:
        if conn.is_connected():
            conn.close()


def exist_user(email: str):
    result = run_query("SELECT * FROM users WHERE email = %s", (email,))
    if len(result) > 0:
        return True
    return False


def insert(values: tuple):
    try:
        connection = mysql.connector.connect(
            host="localhost",
            database="data_structure",
            user="root",
            password="Mosi_5180204453"
        )
        
        query = "INSERT INTO users (name, email, skills, work_history, password, is_admin) VALUES (%s, %s, %s, %s, %s, %s)"
        
        cursor = connection.cursor()
        cursor.execute(query, values)
        
        connection.commit()
        
        affected_rows = cursor.rowcount
        
    except mysql.connector.Error as error:
        # print(f"Error: {error}")
        return False
    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()
            # print("MySQL connection is closed")
            return True


def password_checker(email: str, password: str):
    result = run_query("SELECT password FROM users WHERE email = %s", (email,))[0]
    if result['password'] == password:
        return True
    return False