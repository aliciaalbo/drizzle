
from flask import (Flask, render_template, request, flash, session, redirect)
from model import connect_to_db
import crud

app = Flask(__name__)

@app.route('/')
def show_homepage():
    """show homepage"""

    return render_template('homepage.html')