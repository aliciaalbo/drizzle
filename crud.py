from model import db, connect_to_db, Track, PlaylistTracks, User, WeatherMood
from random import choice


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
                 mood
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
                 mood = mood
                 )

    db.session.add(track)
    db.session.commit()

    return track

def create_user(email, password, fname, lname):
    """add new user to db"""

    user = User(email = email,
                password = password,
                fname = fname,
                lname = lname)
    
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

# def create_playlist(moods):
#     """generate playlist of 20 random tracks based on mood input"""
#     playlist_choice = []
#     for mood in moods:
#         mood_tracks = db.session.query(Track.track_id).filter(Track.mood==mood).all()

#         results = [i[0] for i in mood_tracks]
#         playlist_choice.extend(results)

#     playlist = set()
#     # try/except for edge case of <20 songs
#     while len(playlist) < 21:
#         playlist.add(choice(playlist_choice))

#     return playlist


def get_user_by_email(email):
    """Gets a user by email"""

    return User.query.filter(User.email == email).first()



def create_playlist_id(user_id, weather, date):
    """creates a playlist for a user"""

    playlist = UserPlaylist(user_id = user_id,
                            weather = weather, 
                            date = date)

    db.session.add(playlist)
    db.session.commit()

    playlist_id = playlist.playlist_id
    return playlist_id


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