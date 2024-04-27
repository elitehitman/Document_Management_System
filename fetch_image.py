import mysql.connector
from PIL import Image
from io import BytesIO

def fetch_image(stud_reg_no, doc_id, db_connection, table_name):
    try:
        # Prepare the SELECT statement
        select_query = "SELECT doc_img FROM {} WHERE stud_reg_no = %s AND doc_id = %s".format(table_name)
        
        # Execute the SELECT statement
        cursor = db_connection.cursor()
        cursor.execute(select_query, (stud_reg_no, doc_id))
        
        # Fetch the image data
        row = cursor.fetchone()
        if row:
            # Extract the image data from the tuple
            image_data = row[0]

            # Display the image
            img = Image.open(BytesIO(image_data))
            img.show()

            print("Image fetched successfully.")

        else:
            print("Image not found for student registration number {} and document ID {}.".format(stud_reg_no, doc_id))

    except Exception as e:
        print("Error fetching image:", e)

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

        # Student registration number and document ID to fetch image
        stud_reg_no = "221080067"
        doc_id = "d2"

        # Call the function to fetch the image
        fetch_image(stud_reg_no, doc_id, conn, table_name)

    except Exception as e:
        print("Error:", e)

    finally:
        # Close the database connection
        if 'conn' in locals():
            conn.close()
