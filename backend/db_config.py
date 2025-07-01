import pymysql

def get_connection():
    return pymysql.connect(
        host='localhost',
        user='root',
        password='your_password',
        db='grievance_db',
        cursorclass=pymysql.cursors.DictCursor
    )
