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
# to get account info for users: user-read-email
# to save playlist: playlist-modify-public
# to stream in player: streaming user-read-email user-read-private user-read-playback-state user-modify-playback-state
# to show the favorite button: user-library-read user-library-modify
# also in there for some reason: user-read-currently-playing
SCOPE = 'user-read-email playlist-modify-public streaming user-read-private user-read-playback-state user-modify-playback-state user-library-read user-library-modify user-read-currently-playing'
auth_manager = SpotifyOAuth(cid, secret, SPOTIPY_REDIRECT_URI, scope=SCOPE, cache_path=None )

@app.route('/')
def show_homepage():
    """show homepage"""

    return render_template('homepage.html')


@app.route('/api')
def parse_api():
    """catches and parses data from external api call and runs appropriate functions"""
    do = request.args.get('do')
    if do == "getInfo":
        access_token = session.get('access_token')
        if (access_token):
            user = crud.get_user_by_access_token(session.get('access_token'))
            return jsonify({ 'access_token': access_token, 'email': user.email, 'name': user.name })
        return jsonify({ 'access_token': "", 'email': "", 'name': "" })
    elif do == "zipcodeToPlaylist":
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
    elif do == "getWeatherLatLon":
        appid = os.environ['appid']
        lat = request.args.get('lat')
        lon = request.args.get('lon')
        weatherurl = 'https://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lon+'&appid='+appid
        print(weatherurl)
        return dload.json(weatherurl)
    elif do == "savePlaylist":
        trackids = request.args.get('trackids').split(",")
        access_token = request.args.get('access_token')
        username = request.args.get('username')
        weather = request.args.get('weather')
        city = request.args.get('city')
        playlist_name = f"{username}'s {weather} {city} Playlist"


        if (access_token):
            user = crud.get_user_by_access_token(access_token)
            
            sp = spotipy.Spotify(auth_manager=auth_manager)            
            #token_info = sp.refresh_access_token(user.refresh_token)
#        token_info = auth_manager.get_access_token(request.args.get('code'), check_cache=False)
#        spotify = spotipy.Spotify(auth_manager=auth_manager)
            plist = sp.user_playlist_create(user.spotify_id, playlist_name)
            print(plist)
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
    elif do == "logout":
        email = request.args.get('email')
        session.clear()
        if (email):
            return crud.logout(email)
        return "Could not logout, no access token"

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
        refresh_token = token_info['refresh_token']
        access_token = token_info['access_token']
        # set the access token in a session cookie so it will persist and can be grabbed by React through an API call
        session['access_token'] = access_token

        if crud.get_user_by_email(email):
            # Do something to login.. send access token to react? 
            # then if access toekn show save playlist buttn that isn't made yet
            crud.update_access_token(email, access_token)
            crud.update_refresh_token(email, refresh_token)
        else:
            crud.create_user(email, name, spotify_id, access_token, refresh_token)

        # set the access token cookie for React
        #response = redirect('/', 302)
        # secure=True only if using https, otherwise it won't set the cookie
        #response.set_cookie('access_cookie', access_token, secure=False, httponly=False)
        #return response

    # email = sp.user(email)
    # pprint.pprint(email)
    # # token = crud.get_spotify_credentials(code)
    return redirect('/')

if __name__ == '__main__':
    connect_to_db(app)
    app.run(host='0.0.0.0', debug=True)
 