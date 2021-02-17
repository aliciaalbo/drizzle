from flask_sqlalchemy import SQLAlchemy
import psycopg2




db = SQLAlchemy()

class Track(db.Model):
    """Spotify track_ids and audio features"""
    __tablename__ = "tracks"

    track_pk = db.Column(db.Integer, primary_key=True, autoincrement=True)
    track_id = db.Column(db.String)
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
    name = db.Column(db.String)
    explicit = db.Column(db.Boolean)
    popularity = db.Column(db.Float)
    mood = db.Column(db.String)

    def __repr__(self):
        return f'<<song_id = {self.track_id}>>'

class MoodCriteria(db.Model):
    """audio features defining certain moods"""
    __tablename__ = "mood_criteria"

    mood = db.Column(db.String, primary_key=True)
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
    popularity = db.Column(db.Integer)
    explicit = db.Column(db.Boolean)

    def __repr__(self):
        return f'<<mood = {self.mood}>>'

class WeatherMood(db.Model):
    """weather conditions and their associated moods"""
    __tablename__ = "weather_moods"

    mood_weather_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    weather_condition = db.Column(db.String)
    mood = db.Column(db.String) 
    
    # add back in if analysis happens
    # db.ForeignKey("mood_criteria.mood")

    # criteria = db.relationship(MoodCriteria, backref="weather_moods")

class User(db.Model):
    """stores user data"""
    __tablename__ = "users"

    user_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    email = db.Column(db.String)
    fname = db.Column(db.String)
    lname = db.Column(db.String)
    password = db.Column(db.String)


class UserPlaylist(db.Model):
    """stores user favorited playlists"""
    __tablename__ = "user_playlists"

    playlist_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.user_id"))
    # Do I need mood? I think no
    # mood = db.Column(db.String)
    weather = db.Column(db.String)
    date = db.Column(db.DateTime)

    user = db.relationship(User, backref="user_playlists")

class PlaylistTracks(db.Model):
    """associates individual songs with playlists"""
    __tablename__ = "playlist_tracks"

    playlist_track_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    playlist_id = db.Column(db.Integer, db.ForeignKey("user_playlists.playlist_id"))
    user_id = db.Column(db.Integer, db.ForeignKey("users.user_id"))
    track_id = db.Column(db.String)
    name = db.Column(db.String)
    artists = db.Column(db.String)

    user = db.relationship(User, backref="playlist_tracks")
    playlist = db.relationship(UserPlaylist, backref="playlist_tracks")



def connect_to_db(flask_app, db_uri='postgresql:///songs', echo=True):
    flask_app.config['SQLALCHEMY_DATABASE_URI'] = db_uri
    flask_app.config['SQLALCHEMY_ECHO'] = echo
    flask_app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.app = flask_app
    db.init_app(flask_app)

    print('Connected to the db!')


if __name__ == '__main__':
    from server import app
    connect_to_db(app)
