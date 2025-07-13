import pymysql

def get_db_connection():
    return pymysql.connect(
        host='localhost',
        user='root',
        password='',  # Use your actual MySQL password if set
        database='grievace_system',
        cursorclass=pymysql.cursors.DictCursor
    )
