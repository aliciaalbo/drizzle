from flask import (Flask, render_template, request, flash, session, redirect, jsonify)
from model import connect_to_db
import crud
from random import choice
from jinja2 import StrictUndefined
import dload
import os
from spotipy.oauth2 import SpotifyOAuth
import spotipy
import sys
import pprint
import json

app = Flask(__name__)
app.secret_key = "GFRWYU83752ounfatgr25DCFgw8795trhegsfjdvn"
app.jinja_env.undefined = StrictUndefined

"""uses client id and secret + auth code to fetch tokens and email"""
cid = os.environ['cid']
secret = os.environ['secret']
SPOTIPY_REDIRECT_URI = 'http://localhost:5000/callback'
SCOPE = 'user-read-playback-state user-read-currently-playing playlist-modify-public user-read-email'
auth_manager = SpotifyOAuth(cid, secret, SPOTIPY_REDIRECT_URI, scope=SCOPE, cache_path=None )

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

"""
@app.route('/users', methods=["POST"])
def create_new_user():
    # Creates a new user.
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
"""

@app.route('/api')
def parse_api():
    """catches and parses data from external api call and runs appropriate functions"""
    do = request.args.get('do')
    if do == "zipcodeToPlaylist":
        weather = request.args.get('weather')
        moods = crud.get_mood(weather)
        songs = crud.create_playlist(moods)
        print(songs)
        return jsonify(songs)
    elif do == "getWeather":
        appid = os.environ['appid']
        zipcode = request.args.get('zip')
        weatherurl = 'https://api.openweathermap.org/data/2.5/weather?zip='+zipcode+',us&appid='+appid
        print(weatherurl)
        return dload.json(weatherurl)
    elif do == "savePlaylist":
        trackids = request.args.get('trackids').split(",")
        access_token = request.args.get('access_token')
        if (access_token):
            user = crud.get_user_by_access_token(access_token)
            sp = spotipy.Spotify(auth_manager=auth_manager)
            plist = sp.user_playlist_create(user.spotify_id, 'Weather mood')
            sp.playlist_add_items(plist['id'], trackids)
            print("Playlist added: ", plist['id'])
            return jsonify(plist['id'])
        return ""
        #email = request.args.get('email')
        #user = request.args.get('id')
        #access_token = crud.get_access_token_by_email(email)
        #refresh_token = crud.get_refresh_token_by_email(email)

        # try:
        #     user_playlist_create(user, name, public=True, collaborative=False, description='')


    #return redirect('/')

@app.route('/callback')
def get_email_and_token():
    if request.args.get('code'):
        #token = crud.get_spotify_token(request.args.get('code'))
        token_info = auth_manager.get_access_token(request.args.get('code'), check_cache=False)
        spotify = spotipy.Spotify(auth_manager=auth_manager)
        email = spotify.me()["email"]
        name = spotify.me()["display_name"]
        spotify_id = spotify.me()["id"]
        access_token = token_info['access_token']
        refresh_token = token_info['refresh_token']
        if crud.get_user_by_email(email):
            # Do something to login.. send access token to react? 
            # then if access toekn show save playlist buttn that isn't made yet
            crud.update_access_token(email, access_token)
            crud.update_refresh_token(email, refresh_token)
        else:
            crud.create_user(email, name, spotify_id, access_token, refresh_token)

        # set the access token cookie for React
        response = redirect('/', 302)
        # secure=True only if using https, otherwise it won't set the cookie
        response.set_cookie('access_cookie', access_token, secure=False, httponly=False)
        return response

    # email = sp.user(email)
    # pprint.pprint(email)
    # # token = crud.get_spotify_credentials(code)
    return redirect('/')

if __name__ == '__main__':
    connect_to_db(app)
    app.run(host='0.0.0.0', debug=True)
 