from model import db, Track, Happy, Sad, Calm, Excited, Angry

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
                 valence
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
                 valence = valence  
                 )

    db.session.add(track)
    db.session.commit()

    return track

def create_happy_track(acoutsicness, 
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
                 valence
                 ):

    happy_track = Happy(acoutsicness = acoutsicness, 
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
                 valence = valence  
                 )

    db.session.add(happy_track)
    db.session.commit()

    return happy_track

def create_sad_track(acoutsicness, 
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
                 valence
                 ):

    sad_track = Sad(acoutsicness = acoutsicness, 
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
                 valence = valence  
                 )

    db.session.add(sad_track)
    db.session.commit()

    return sad_track


def create_calm_track(acoutsicness, 
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
                 valence
                 ):

    calm_track = Calm(acoutsicness = acoutsicness, 
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
                 valence = valence  
                 )

    db.session.add(calm_track)
    db.session.commit()

    return calm_track

def create_excited_track(acoutsicness, 
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
                 valence
                 ):

    excited_track = Excited(acoutsicness = acoutsicness, 
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
                 valence = valence  
                 )

    db.session.add(excited_track)
    db.session.commit()

    return excited_track

def create_angry_track(acoutsicness, 
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
                 valence
                 ):

    angry_track = Angry(acoutsicness = acoutsicness, 
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
                 valence = valence  
                 )

    db.session.add(angry_track)
    db.session.commit()

    return angry_track