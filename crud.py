from model import db, connect_to_db, Track, PlaylistTracks, User, WeatherMood
from random import choice
# from bottle import route, run, request
import spotipy
from spotipy.oauth2 import SpotifyOAuth
import os
import secrets

def create_track(acoutsicness,
                 danceability,
                 duration_ms,
                 energy,
                 track_id,
                 instrumentalness,
                 key,
                 liveness,
                 loudness,
                 mode,
                 name,
                 speechiness,
                 tempo,
                 valence,
                 mood,
                 artist, 
                 album_art
                 ):

    track = Track(acoutsicness = acoutsicness,
                 danceability = danceability,
                 duration_ms = duration_ms,
                 energy = energy,
                 track_id = track_id,
                 instrumentalness = instrumentalness,
                 key = key,
                 liveness = liveness,
                 loudness = loudness,
                 mode = mode,
                 name = name,
                 speechiness = speechiness,
                 tempo = tempo,
                 valence = valence,
                 mood = mood,
                 artist = artist,
                 album_art = album_art
                 )

    db.session.add(track)
    db.session.commit()

    return track

# add user id (can grab from spotify response I think), remove fname, lname
def create_user(email, name, spotify_id, access_token, refresh_token):
    """add new user to db and stores their tokens"""

    user = User(email = email,
                name = name,
                spotify_id = spotify_id,
                access_token = access_token,
                refresh_token = refresh_token)

    db.session.add(user)
    db.session.commit()

    return user

def logout(email):
    """logs user out of spotify by deleting their tokens"""
    if (email):
        user = get_user_by_email(email)
        print(user)
        update_access_token(user.email, "")
        update_refresh_token(user.email, "")
        db.session.add(user)
        db.session.commit()
        return "Logout successful"
    return "Could not logout, no access token"



def get_user_by_access_token(access_token):
    return User.query.filter(User.access_token == access_token).first()

def get_user_by_email(email):
    """Gets a user by email"""
    return User.query.filter(User.email == email).first()

def get_access_token_by_email(email):
    """retrieves access token from db by email lookup"""
    return User.query(User.access_token).filter(User.email == email)

def get_refresh_token_by_email(email):
    """retrieves access token from db by email lookup"""
    return User.query(User.refresh_token).filter(User.email == email)

def update_access_token(email, access_token):
    """updates a user's spotify access token"""

    user = User.query.filter(User.email == email).first()
    user.access_token = access_token
    db.session.add(user)
    db.session.commit()

    return user


def update_refresh_token(email, refresh_token):
    """updates a user's spotify access token"""

    user = User.query.filter(User.email == email).first()
    user.refresh_token = refresh_token
    db.session.add(user)
    db.session.commit()

    return user

def create_weather_mood(weather, mood):
    """adds new mood-weather pair to db"""

    weather_mood = WeatherMood(weather_condition = weather,
                                mood = mood)

    db.session.add(weather_mood)
    db.session.commit()

    return weather_mood

def get_mood(weather):
    """gets list of moods associated with weather"""

    results =  db.session.query(WeatherMood.mood).filter(WeatherMood.weather_condition == weather).all()
    moods = [i[0] for i in results]
    return moods

def create_playlist(moods):
    """generate playlist of 20 random tracks based on mood input"""
    playlist_choice = []
    for mood in moods:
        mood_tracks = db.session.query(Track.track_id).filter(Track.mood==mood).all()

        results = [i[0] for i in mood_tracks]
        playlist_choice.extend(results)

    playlist = set()
    # try/except for edge case of <20 songs?
    while len(playlist) < 20:
        playlist.add(choice(playlist_choice))

    songs = []
    for trackid in playlist:
        title = db.session.query(Track.name).filter(Track.track_id==trackid).first()
        artist = db.session.query(Track.artist).filter(Track.track_id==trackid).first()
        album_art = db.session.query(Track.album_art).filter(Track.track_id==trackid).first()

        songs.append({ "trackid":str(trackid), "title":title[0], "artist":artist[0], "album_art":album_art[0] })

    return songs

def get_spotify_token(code):
    cid = secrets.cid
    secret = secrets.secret
    SPOTIFY_REDIRECT_URI = secrets.spotifyredirect
    SCOPE = 'user-read-email playlist-modify-public streaming user-read-private user-read-playback-state user-modify-playback-state user-library-read user-library-modify user-read-currently-playing'

    # CacheDBHandler is a custom class you need to write to store and retrieve cache in the DB, in cachedb.py
    auth_manager = SpotifyOAuth(cid, secret, SPOTIPY_REDIRECT_URI, scope=SCOPE, cache_path=None )
    # ignore cache until we make it work
    token_info = auth_manager.get_access_token(code, check_cache=False)
    return token_info

def get_spotify_credentials(code):
    """submits authorization code to spotify to get token and user email"""

    # https://github.com/plamere/spotipy/blob/master/spotipy/util.py
    # http://www.acmesystems.it/python_httpd

    # query db for access
    # check id fresh
    # if yes save play list
    cid = secrets.cid
    secret = secrets.secret
    SPOTIFY_REDIRECT_URI = secrets.spotifyredirect
    SCOPE = 'web-playback user-read-email playlist-modify-public streaming user-read-private user-read-playback-state user-modify-playback-state user-library-read user-library-modify user-read-currently-playing'
    CACHE = '.spotipyoauthcache'

    # CacheDB is a custom class you need to make to store the cache in the DB
    sp_oauth = oauth2.SpotifyOAuth(cid, secret, SPOTIPY_REDIRECT_URI, scope=SCOPE, cache_handler="CacheDB" )
    #sp_oauth = oauth2.SpotifyPKCE(cid,SPOTIPY_REDIRECT_URI,scope=SCOPE,cache_handler="CacheDB")

    """
def index():
    access_token = ""

    token_info = sp_oauth.get_cached_token()

    if token_info:
        print("Found cached token!")
        access_token = token_info['access_token']
    else:
        url = request.url
        code = sp_oauth.parse_response_code(url)
        if code != url:
            print("Found Spotify auth code in Request URL! Trying to get valid access token...")
            token_info = sp_oauth.get_access_token(code)
            access_token = token_info['access_token']

    if access_token:
        print("Access token available! Trying to get user information...")
        sp = spotipy.Spotify(access_token)
        results = sp.current_user()
        return results

    else:
        return htmlForLoginButton()

def htmlForLoginButton():
    auth_url = getSPOauthURI()
    htmlLoginButton = "<a href='" + auth_url + "'>Login to Spotify</a>"
    return htmlLoginButton

def getSPOauthURI():
    auth_url = sp_oauth.get_authorize_url()
    return auth_url

run(host='', port=8080)
    """


# def create_playlist_id(user_id, weather, date):
#     """creates a playlist for a user"""

#     playlist = UserPlaylist(user_id = user_id,
#                             weather = weather, 
#                             date = date)

#     db.session.add(playlist)
#     db.session.commit()

#     playlist_id = playlist.playlist_id
#     return playlist_id


### this needs work... may do tables differently 
### primary join?
# def save_playlist(user_id, playlist_id, playlist):
#     """associates tracks with playlists for a user"""


#     for track in playlist:
#         user_playlist_track = PlaylistTracks(user_id = user_id,
#                                              playlist_id = playlist_id
#                                              track_id = track,
#                  name = db.session.query(Track.name).filter(Track.track_id == track)
#                 #add artist data? Later. 
#                 )
    
#         db.session.add(user_playlist_track)
#         db.session.commit()

#     return user_playlist_track



if __name__ == '__main__':
    from server import app
    connect_to_db(app)
