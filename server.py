from flask import (Flask, render_template, request, flash, session, redirect, jsonify)
from model import connect_to_db
import crud
from random import choice
from jinja2 import StrictUndefined

app = Flask(__name__)
app.secret_key = "GFRWYU83752ounfatgr25DCFgw8795trhegsfjdvn"
app.jinja_env.undefined = StrictUndefined

@app.route('/')
def show_homepage():
    """show homepage"""
    return render_template('homepage.html')

# @app.route('/login', methods=["POST"])
# def log_in_user():
#     """Logs user in."""

#     email = request.form.get('email')
#     password = request.form.get('password')

#     user = crud.get_user_by_email(email)

#     if user:
#         if password == user.password:
#             session['user'] = user.user_id
#             flash("You logged in! Good job.")
#         else:
#             flash("Passwords don't match. Try again.")
#     else:
#         flash("User does not exist. Please create an account.")

#     return redirect ('/')

@app.route('/users', methods=["POST"])
def create_new_user():
    """Creates a new user."""
    email = request.form.get('email')
    password = request.form.get('password')
    confirm_password = request.form.get('confirm-password')
    fname = request.form.get('fname')
    lname = request.form.get('lname')

    if crud.get_user_by_email(email): 
        flash("An account with this email exists. Please Log In.")
    else:
        if password == confirm_password:
            crud.create_user(email, password, fname, lname)
            flash("You did it, please log in")
    
    return redirect('/')




@app.route('/api')
def parse_api():
    """catches and parses data from external api call and runs appropriate functions"""
    do = request.args.get('do')
    weather = request.args.get('weather')

    if do == "zipcodeToPlaylist":
        moods = crud.get_mood(weather)
        songs = crud.create_playlist(moods)
        print(songs)
        return jsonify(songs)


        
    #return redirect('/')

if __name__ == '__main__':
    connect_to_db(app)
    app.run(host='0.0.0.0', debug=True)
 