from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Track(db.Model):
    """Spotify track_ids and audio features"""
    __tablename__ = "songs"

    track_id = db.Column(db.String, primary_key = True)
    danceability = db.Column(db.Float)
    energy = db.Column(db.Float)
    key = db.Column(db.Integer)
    loudness = db.Column(db.Float)
    mode = db.Column(db.Integer)
    speechiness = db.Column(db.Float)
    acoutsicness = db.Column(db.Float)
    instrumentalness = db.Column(db.Float)
    liveness = db.Column(db.Float)
    valence = db.Column(db.Float)
    tempo = db.Column(db.Float)
    uri = db.Column(db.String)
    track_href = db.Column(db.String)
    analysis_url = db.Column(db.String)
    duration_ms = db.Column(db.Integer)
    time_signature = db.Column(db.Integer)

    def __repr__(self):
        return f'<<song_id = {self.song_id}>>'

class MoodCriteria(db.Model):
    """audio features defining certain moods"""
    __tablename__ = "mood_criteria"

    mood = db.Column(db.String, primary_key = True)
    danceability = db.Column(db.Float)
    energy = db.Column(db.Float)
    key = db.Column(db.Integer)
    loudness = db.Column(db.Float)
    mode = db.Column(db.Integer)
    speechiness = db.Column(db.Float)
    acoutsicness = db.Column(db.Float)
    instrumentalness = db.Column(db.Float)
    liveness = db.Column(db.Float)
    valence = db.Column(db.Float)
    tempo = db.Column(db.Float)
    uri = db.Column(db.String)
    track_href = db.Column(db.String)
    analysis_url = db.Column(db.String)
    duration_ms = db.Column(db.Integer)
    time_signature = db.Column(db.Integer)

    def __repr__(self):
        return f'<<mood = {self.mood}>>'

class WeatherMood(db.Model):
    """weather conditions and their associated moods"""
    __tablename__ = "weather_moods"

    mood_weather_id = db.Column(db.Integer, primary_key = True, autoincrement = True)
    weather_condition = db.Column(db.String)
    mood = db.Column(db.String, db.ForeignKey("MoodCriteria.mood"))

    criteria = db.relationship(MoodCriteria, backref="weather_moods")

class User(db.Model):
    """stores user data"""
    __tablename__ = "users"

    user_id = db.Column(db.Integer, primary_key = True, autoincrement = True)
    email = db.Column(db.String)
    mood = db.Column(db.String, db.ForeignKey("MoodCriteria.mood"))

class UserPlaylist(db.Model):
    """stores user favorited playlists"""
    __tablename__ = "user_playlists"

    playlist_id = db.Column(db.Integer, primary_key = True, autoincrement = True)
    # playlist_song_ids = db.Column(db.string)
    user_id = db.Column(db.Integer, db.ForeignKey("User.user_id"))
    mood = db.Column(db.String)
    weather = db.Column(db.String)
    date = db.Column(db.DateTime)

    user = db.relationship(User, backref="UserPlaylist")

class PlaylistTracks(db.Model):
    """associates individual songs with playlists"""
    __tablename__ = "playlist_tracks"

    playlist_track_id = db.Column(db.Integer, primary_key = True, autoincrement = True)
    playlist_id = db.Column(db.Integer, db.ForeignKey("UserPlaylist.playlist_id"))
    user_id = db.Column(db.Integer, db.ForeignKey("User.user_id"))
    track_id = db.Column(db.String)
    title = db.Column(db.String)
    artists = db.Column(db.String)

    user = db.relationship(User, backref="PlaylistTracks")
    playlist = user = db.relationship(UserPlaylist, backref="PlaylistTracks")



