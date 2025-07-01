from flask import Flask
from routes.auth import auth_bp
from routes.complaint import complaint_bp
from routes.admin import admin_bp

app = Flask(__name__)
app.secret_key = 'your_secret_key'  # Replace with a real one in production

# Register Blueprints
app.register_blueprint(auth_bp)
app.register_blueprint(complaint_bp)
app.register_blueprint(admin_bp)

if __name__ == '__main__':
    app.run(debug=True)



