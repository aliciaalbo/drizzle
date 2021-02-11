from model import db, connect_to_db, Track
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

def create_playlist(moods):
    """generate playlist of 20 random tracks based on mood input"""
    playlist_choice = []
    for mood in moods:
        mood_tracks = db.session.query(Track.track_id).filter(Track.mood==mood).all()

        results = [i[0] for i in mood_tracks]
        playlist_choice.extend(results)

    playlist = set()
    while len(playlist) < 21:
        playlist.add(choice(playlist_choice))

    print(playlist)


def save_playlist(user_id, date, weather_condition, song_id_array):
    """allows a user to save a generated playlist"""



if __name__ == '__main__':
    from server import app
    connect_to_db(app)