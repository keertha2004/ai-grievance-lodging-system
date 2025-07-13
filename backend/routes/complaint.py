from flask import Blueprint

complaint_bp = Blueprint('complaint', __name__)

@complaint_bp.route('/submit-complaint')
def submit_complaint():
    return "Submit Complaint Page"
