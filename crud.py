from model import db, Track 
# Happy, Sad, Calm, Excited, Angry

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

