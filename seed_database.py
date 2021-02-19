import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
import os
import time

from server import app

import os
import json

from datetime import datetime
import crud
import model
import server

model.connect_to_db(server.app)
model.db.create_all()

cid = os.environ['cid']
secret = os.environ['secret']


client_credentials_manager = SpotifyClientCredentials(client_id=cid, client_secret=secret)

spotify = spotipy.Spotify(client_credentials_manager=client_credentials_manager)

# first pass emotions/moods
# playlist_emotions = ['happy', 'sad', 'calm', 'excited', 'angry', 'suspense', 'pumped', 'relax', 'peaceful', 'serene', 'energy', 'uplift', 'melancholy', 'hopeful', 'alone']

# second pass
playlist_emotions = ['chill', 'party', 'dance', 'mellow', 'happy', 'sad', 'calm', 'excited', 'angry', 'suspense', 'pumped', 'relax', 'peaceful', 'serene', 'energy', 'uplift', 'melancholy', 'hopeful', 'alone']

# 'pensive' causing a problem

# playlist_emotions = ['chill']
for emotion in playlist_emotions:

    emotion_playlists = spotify.search(emotion, type="playlist")
    playlists = []

    for i, item in enumerate(emotion_playlists['playlists']['items']):
        playlists.append(item['id'])

    tracks = []
    titles = []
    artists = []


    for item in playlists:
        response = spotify.playlist_items(item,
                                    fields='items.track.id,items.track.name,items.track.artists[0].name,total',
                                    additional_types=['track'])
        for track in response['items']:
            try:
                tracks.append(track['track']['id'])
                titles.append(track['track']['name'])
                artist_name = ''
                for artist in track['track']['artists']:
                    # print(artist)
                    # print(artist['name'])
                    # try:
                    if artist_name == '':
                        # print(artist['name'])
                        artist_name = artist['name']   
                    else:
                        artist_name = artist_name + ', ' + artist['name']
                artists.append(artist_name)
                # print(artists)
                        # artists.append(artist['name'])
            except(TypeError):
                continue


    start_batch = 0
    batch_size = 100
    end_at = len(tracks) - 1

    while (start_batch < end_at):
        end_batch = start_batch + batch_size
        if end_batch > end_at:
            end_batch = end_at

        track_ids = tracks[start_batch:end_batch]
        track_info = spotify.audio_features(track_ids)

        for i in range(len(track_info)):
            try:
                track = track_info[i]
                acousticness = track['acousticness']
                track_id = track['id']
                danceability = track['danceability']
                duration_ms = track['duration_ms']
                energy = track['energy']
                instrumentalness = track['instrumentalness']
                key = track['key']
                liveness = track['liveness']
                loudness = track['loudness']
                mode = track['mode']
                name = titles[start_batch + i]
                speechiness = track['speechiness']
                tempo = track['tempo']
                valence = track['valence']
                mood = emotion
                artist = artists[start_batch + i]
            except(TypeError):
                continue


        
            new_track = crud.create_track(acousticness, 
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
                                    artist
                                    )

        start_batch += batch_size
        time.sleep(1)

weathers = {
    "Thunderstorm" : ['angry','excited', 'suspense'],
    "Drizzle" : ['chill','mellow','melancholy'],
    "Rain" :['realx', 'sad', 'chill'],
    "Snow" : ['calm', 'serene', 'peaceful'],
    "Mist" : ['pensive', 'mellow', 'uplift'],
    "Smoke" : ['pensive', 'suspense'],
    "Haze" :['uplift', 'sad'],
    "Fog" : ['calm', 'alone', 'peaceful'],
    "Sand" : ['suspense'],
    "Dust" : ['pensive', 'melancholy'],
    "Ash" : ['uplift', 'alone', 'sad' ],
    "Squall" : ['pumped', 'excite'],
    "Tornado" : ['excited', 'dance'],
    "Clear" : ['happy', 'pumped', 'party', 'dance' ],
    "Clouds" : ['happy', 'relax']
    }

for weather in weathers:
    weather = weather
    moods = (weathers[weather])

    for mood in moods:

        weather = weather
        mood = mood

        new_weather_mood = crud.create_weather_mood(weather, mood)

    






### just in case I want it later ###

# Make master hash of tracks to avoid dupicate insertion into
# tracks table due to songs boing on multiple playlists

# master_track_ids = set()

# Make list of playlist IDs
# happy_playlists = spotify.search("happy", type="playlist")
# playlists = []

# for i, item in enumerate(happy_playlists['playlists']['items']):
#     playlists.append(item['id'])

# # make list of track_ids from playlists
# tracks = []
# titles = []
# # for each id in list playlists, get the track objects
# # for each track ojbect, key into dict to get track id
# # append to list of track ids
# # also need to grab titles (items.track.name)
# for item in playlists:
#     response = spotify.playlist_items(item,
#                                 fields='items.track.id,, items.track.name,total',
#                                 additional_types=['track'])
#     # print(len(response['items']))
#     # playlist_tracks = spotify.playlist_items(item,fields=items(track.id))
#     # print(spotify.playlist(playlists[0]))
#     # print(response['items']) #returns [{'track':{'id':'string'}}, {'track':{'id':'string'}}, ...] 
#     # print(response['items'])
#     for track in response['items']:
#         # print(track['track']['id'])

#         #logic to check for track in master list not needed here  because 
#         # it runs first so all values will be OG
#         # if track['track']['id'] not in tracks:
#         tracks.append(track['track']['id'])
#         titles.append(track['track']['name'])
#             # master_track_ids.add(track['track']['id'])
# #print(len(titles))
# #print(titles)

# # print(len(tracks))

# # for slice? of 0:100 get those audio features
# #i= 0
# #j= 5

# #while j <len(tracks)-1:
# #    track_ids = tracks[i:j]

# start_batch = 0
# batch_size = 100
# end_at = len(tracks) - 1

# while (start_batch < end_at):
#     end_batch = start_batch + batch_size
#     if end_batch > end_at:
#         end_batch = end_at

#     track_ids = tracks[start_batch:end_batch]
#     track_info = spotify.audio_features(track_ids)
#     # print(type(track_ids))
#     for i in range(len(track_info)):
#         track = track_info[i]
#         acousticness = track['acousticness']
#         track_id = track['id']
#         danceability = track['danceability']
#         duration_ms = track['duration_ms']
#         energy = track['energy']
#         # explicit = track['explicit']
#         instrumentalness = track['instrumentalness']
#         key = track['key']
#         liveness = track['liveness']
#         loudness = track['loudness']
#         mode = track['mode']
#         name = titles[start_batch + i]
#         # print(name)
#         # not availible in audio feature
#         # popularity = track['popularity']
#         speechiness = track['speechiness']
#         tempo = track['tempo']
#         valence = track['valence']
#         mood = 'happy'
#         # print(valence)

    
#         new_track = crud.create_track(acousticness, 
#                                   danceability, 
#                                   duration_ms, 
#                                   energy,
#                                   track_id,
#                                   instrumentalness,
#                                   key,
#                                   liveness,
#                                   loudness,
#                                   mode,
#                                   name,
#                                   speechiness,
#                                   tempo,
#                                   valence, 
#                                   mood
#                                 )

#     start_batch += batch_size
#     time.sleep(1)