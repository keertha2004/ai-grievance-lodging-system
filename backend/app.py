from flask import Flask
from admin_routes import admin_bp


app = Flask(__name__)
app.secret_key = 'supersecret'  # required for session and flash messages

# Register your admin blueprint
app.register_blueprint(admin_bp)

if __name__ == '__main__':
    app.run(debug=True)
