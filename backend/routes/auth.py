from flask import Blueprint

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/login')
def login():
    return "Login Page"

@auth_bp.route('/register')
def register():
    return "Register Page"

@auth_bp.route('/')
def home():
    return "Welcome to AI Grievance Lodging System"
