from model import db, Track

def create_track(acoutsicness, 
                 danceability, 
                 duration_ms, 
                 energy, 
                 explicit,
                 track_id,
                 instrumentalness,
                 key,
                 liveness,
                 loudness,
                 mode,
                 name,
                 popularity,
                 speechiness,
                 tempo,
                 valence
                 ):

    track = Track(acoutsicness = acoutsicness, 
                 danceability = danceability, 
                 duration_ms = duration_ms, 
                 energy = energy, 
                 explicit = explicit,
                 track_id = track_id,
                 instrumentalness = instrumentalness,
                 key = key,
                 liveness = liveness,
                 loudness = loudness,
                 mode = mode,
                 name = name,
                 popularity = popularity,
                 speechiness = speechiness,
                 tempo = tempo,
                 valence = valence  
                 )

    db.session.add(track)
    db.session.commit()

    return track
