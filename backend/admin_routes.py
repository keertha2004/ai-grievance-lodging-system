from flask import Blueprint, render_template, request, redirect, url_for, flash, session
import pymysql
from db_config import get_db_connection


admin_bp = Blueprint('admin', __name__)

# Admin Login Route
@admin_bp.route('/admin-login', methods=['GET', 'POST'])
def admin_login():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']

        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM users WHERE email=%s AND password=%s AND role='admin'", (email, password))
        admin = cursor.fetchone()
        conn.close()

        if admin:
            session['admin_email'] = email
            return redirect('/admin-dashboard')
        else:
            flash("Invalid admin credentials")
    
    return render_template('admin_login.html')

# Admin Dashboard Route
@admin_bp.route('/admin-dashboard')
def admin_dashboard():
    if 'admin_email' not in session:
        return redirect('/admin-login')

    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("""
        SELECT c.complaint_id, u.username, c.complaint_text, c.status, c.created_at
        FROM complaints c
        JOIN users u ON c.user_id = u.user_id
    """)
    complaints = cursor.fetchall()
    conn.close()

    return render_template('admin_dashboard.html', complaints=complaints)

# Update Status Route
@admin_bp.route('/update-status/<int:complaint_id>', methods=['POST'])
def update_status(complaint_id):
    if 'admin_email' not in session:
        return redirect('/admin-login')

    new_status = request.form['status']
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("UPDATE complaints SET status=%s WHERE complaint_id=%s", (new_status, complaint_id))
    conn.commit()
    conn.close()

    flash("Complaint status updated.")
    return redirect('/admin-dashboard')
