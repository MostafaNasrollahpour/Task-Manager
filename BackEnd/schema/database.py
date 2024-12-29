import mysql.connector


def insert(values: tuple):
    try:
        # Establish connection
        connection = mysql.connector.connect(
            host="localhost",
            database="data_structure",
            user="root",
            password="Mosi_5180204453"
        )

        # Prepare the query
        query = "INSERT INTO users (full_name, skills, work_history, pass, is_admin) VALUES (%s, %s, %s, %s, %s)"

        # Create cursor and execute query
        cursor = connection.cursor()
        cursor.execute(query, values)

        # Commit changes
        connection.commit()

        # Verify insertion
        affected_rows = cursor.rowcount
        # print(f"{affected_rows} row(s) inserted successfully.")

    except mysql.connector.Error as error:
        print(f"Error: {error}")

    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()
            # print("MySQL connection is closed")


def run_query(query):
    try:
        conn = mysql.connector.connect(
            host="localhost",
            user="root",
            password="Mosi_5180204453",
            database="data_structure"
        )
        
        # Create cursor object
        cursor = conn.cursor(dictionary=True)
        
        # Execute the query
        cursor.execute(query)
        
        # Fetch all rows
        rows = cursor.fetchall()
        
        # Print each row
        for row in rows:
            print(row)
        
        # Close cursor and connection
        cursor.close()
        conn.close()
        
    except mysql.connector.Error as error:
        print(f"Error: {error}")