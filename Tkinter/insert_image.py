import mysql.connector

def insert_image(image_path, image_name, stud_reg_no, doc_id, flag, db_connection, table_name):
    try:
        # Open the image file in binary mode
        with open(image_path, "rb") as file:
            image_data = file.read()

        # Prepare the INSERT statement with placeholders for values
        insert_query = "INSERT INTO {} (stud_reg_no, doc_id, sub_dur_admission, doc_name, doc_img) VALUES (%s, %s, %s, %s, %s)".format(table_name)

        # Execute the INSERT statement with values
        cursor = db_connection.cursor()
        cursor.execute(insert_query, (stud_reg_no, doc_id, flag, image_name, image_data))
        db_connection.commit()

        print("Image inserted successfully.")

    except Exception as e:
        print("Error inserting image:", e)

    finally:
        # Close cursor
        if 'cursor' in locals():
            cursor.close()

if __name__ == "__main__":
    try:
        # Database connection parameters
        hostname = "localhost"
        username = "admin_Rohan"
        password = "Rohan@100"
        database = "Document_Management"

        # Create a database connection
        conn = mysql.connector.connect(
            host=hostname,
            user=username,
            password=password,
            database=database
        )

        # Check if the connection is successful
        if conn.is_connected():
            print("Connected to the database")
        else:
            print("Failed to connect to the database")
            exit()

        # Table name in the database
        table_name = "document"

        # Path to the image file
        image_path = r"/home/rohanparab/Documents/DBMS_docs/221080068/id.png"

        # Image name (as it will be stored in the database)
        image_name = "ID_CARD"

        # Student registration number and document ID
        stud_reg_no = "221080068"
        doc_id = "d11"
        flag = 0
        # Call the function to insert the image
        insert_image(image_path, image_name, stud_reg_no, doc_id, flag, conn, table_name)

    except Exception as e:
        print("Error:", e)

    finally:
        # Close the database connection
        if 'conn' in locals():
            conn.close()
