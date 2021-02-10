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

# Make master hash of tracks to avoid dupicate insertion into
# tracks table due to songs boing on multiple playlists

master_track_ids = set()

# Make list of playlist IDs
happy_playlists = spotify.search("happy", type="playlist", limit=1)
playlists = []

for i, item in enumerate(happy_playlists['playlists']['items']):
    playlists.append(item['id'])

# make list of track_ids from playlists
tracks = []
titles = []
# for each id in list playlists, get the track objects
# for each track ojbect, key into dict to get track id
# append to list of track ids
# also need to grab titles (items.track.name)
for item in playlists:
    response = spotify.playlist_items(item,
                                fields='items.track.id,, items.track.name,total',
                                additional_types=['track'])
    # print(len(response['items']))
    # playlist_tracks = spotify.playlist_items(item,fields=items(track.id))
    # print(spotify.playlist(playlists[0]))
    # print(response['items']) #returns [{'track':{'id':'string'}}, {'track':{'id':'string'}}, ...] 
    # print(response['items'])
    for track in response['items']:
        # print(track['track']['id'])

        #logic to check for track in master list not needed here  because 
        # it runs first so all values will be OG
        if track['track']['id'] not in tracks:
            tracks.append(track['track']['id'])
            titles.append(track['track']['name'])
            master_track_ids.add(track['track']['id'])
#print(len(titles))
#print(titles)

# print(len(tracks))

# for slice? of 0:100 get those audio features
#i= 0
#j= 5

#while j <len(tracks)-1:
#    track_ids = tracks[i:j]

start_batch = 0
batch_size = 100
end_at = len(tracks) - 1

while (start_batch < end_at):
    end_batch = start_batch + batch_size
    if end_batch > end_at:
        end_batch = end_at

    track_ids = tracks[start_batch:end_batch]
    track_info = spotify.audio_features(track_ids)
    # print(type(track_ids))
    for i in range(len(track_info)):
        track = track_info[i]
        acousticness = track['acousticness']
        track_id = track['id']
        danceability = track['danceability']
        duration_ms = track['duration_ms']
        energy = track['energy']
        # explicit = track['explicit']
        instrumentalness = track['instrumentalness']
        key = track['key']
        liveness = track['liveness']
        loudness = track['loudness']
        mode = track['mode']
        name = titles[start_batch + i]
        # print(name)
        # not availible in audio feature
        # popularity = track['popularity']
        speechiness = track['speechiness']
        tempo = track['tempo']
        valence = track['valence']
        # print(valence)

    
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
                                  valence
                                )
        new_happy_track = crud.create_happy_track(acousticness, 
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
                                )
    start_batch += batch_size
    time.sleep(1)



# sad_playlists = spotify.search("sad", type="playlist")
# playlists = []

# for i, item in enumerate(sad_playlists['playlists']['items']):
#     playlists.append(item['id'])

# tracks = []
# titles = []

# for item in playlists:
#     response = spotify.playlist_items(item,
#                                 fields='items.track.id,, items.track.name,total',
#                                 additional_types=['track'])
#     for track in response['items']:
#         if track['track']['id'] not in master_track_ids:
#             master_track_ids.add(track['track']['id'])
#             if track['track']['id'] not in tracks:
#                 tracks.append(track['track']['id'])
#                 titles.append(track['track']['name'])


# start_batch = 0
# batch_size = 100
# end_at = len(tracks) - 1

# while (start_batch < end_at):
#     end_batch = start_batch + batch_size
#     if end_batch > end_at:
#         end_batch = end_at

#     track_ids = tracks[start_batch:end_batch]
#     track_info = spotify.audio_features(track_ids)

#     for i in range(len(track_info)):
#         track = track_info[i]
#         acousticness = track['acousticness']
#         track_id = track['id']
#         danceability = track['danceability']
#         duration_ms = track['duration_ms']
#         energy = track['energy']
#         instrumentalness = track['instrumentalness']
#         key = track['key']
#         liveness = track['liveness']
#         loudness = track['loudness']
#         mode = track['mode']
#         name = titles[start_batch + i]
#         speechiness = track['speechiness']
#         tempo = track['tempo']
#         valence = track['valence']


    
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
#                                   valence
#                                 )
#         new_sad_track = crud.create_sad_track(acousticness, 
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
#                                   valence
#                                 )
#     start_batch += batch_size
#     time.sleep(1)

# calm_playlists = spotify.search("calm", type="playlist")
# playlists = []

# for i, item in enumerate(calm_playlists['playlists']['items']):
#     playlists.append(item['id'])

# tracks = []
# titles = []

# for item in playlists:
#     response = spotify.playlist_items(item,
#                                 fields='items.track.id,, items.track.name,total',
#                                 additional_types=['track'])
#     for track in response['items']:
#         if track['track']['id'] not in master_track_ids:
#             master_track_ids.add(track['track']['id'])
#             if track['track']['id'] not in tracks:
#                 tracks.append(track['track']['id'])
#                 titles.append(track['track']['name'])


# start_batch = 0
# batch_size = 100
# end_at = len(tracks) - 1

# while (start_batch < end_at):
#     end_batch = start_batch + batch_size
#     if end_batch > end_at:
#         end_batch = end_at

#     track_ids = tracks[start_batch:end_batch]
#     track_info = spotify.audio_features(track_ids)

#     for i in range(len(track_info)):
#         track = track_info[i]
#         acousticness = track['acousticness']
#         track_id = track['id']
#         danceability = track['danceability']
#         duration_ms = track['duration_ms']
#         energy = track['energy']
#         instrumentalness = track['instrumentalness']
#         key = track['key']
#         liveness = track['liveness']
#         loudness = track['loudness']
#         mode = track['mode']
#         name = titles[start_batch + i]
#         speechiness = track['speechiness']
#         tempo = track['tempo']
#         valence = track['valence']


    
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
#                                   valence
#                                 )
#         new_calm_track = crud.create_calm_track(acousticness, 
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
#                                   valence
#                                 )
#     start_batch += batch_size
#     time.sleep(1)


# excited_playlists = spotify.search("excited", type="playlist")
# playlists = []

# for i, item in enumerate(excited_playlists['playlists']['items']):
#     playlists.append(item['id'])

# tracks = []
# titles = []

# for item in playlists:
#     response = spotify.playlist_items(item,
#                                 fields='items.track.id,, items.track.name,total',
#                                 additional_types=['track'])
#     for track in response['items']:
#         if track['track']['id'] not in master_track_ids:
#             master_track_ids.add(track['track']['id'])
#             if track['track']['id'] not in tracks:
#                 tracks.append(track['track']['id'])
#                 titles.append(track['track']['name'])


# start_batch = 0
# batch_size = 100
# end_at = len(tracks) - 1

# while (start_batch < end_at):
#     end_batch = start_batch + batch_size
#     if end_batch > end_at:
#         end_batch = end_at

#     track_ids = tracks[start_batch:end_batch]
#     track_info = spotify.audio_features(track_ids)

#     for i in range(len(track_info)):
#         track = track_info[i]
#         acousticness = track['acousticness']
#         track_id = track['id']
#         danceability = track['danceability']
#         duration_ms = track['duration_ms']
#         energy = track['energy']
#         instrumentalness = track['instrumentalness']
#         key = track['key']
#         liveness = track['liveness']
#         loudness = track['loudness']
#         mode = track['mode']
#         name = titles[start_batch + i]
#         speechiness = track['speechiness']
#         tempo = track['tempo']
#         valence = track['valence']


    
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
#                                   valence
#                                 )
#         new_excited_track = crud.create_excited_track(acousticness, 
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
#                                   valence
#                                 )
#     start_batch += batch_size
#     time.sleep(1)

# angry_playlists = spotify.search("angry", type="playlist")
# playlists = []

# for i, item in enumerate(angry_playlists['playlists']['items']):
#     playlists.append(item['id'])

# tracks = []
# titles = []

# for item in playlists:
#     response = spotify.playlist_items(item,
#                                 fields='items.track.id,, items.track.name,total',
#                                 additional_types=['track'])
#     for track in response['items']:
#         if track['track']['id'] not in master_track_ids:
#             master_track_ids.add(track['track']['id'])
#             if track['track']['id'] not in tracks:
#                 tracks.append(track['track']['id'])
#                 titles.append(track['track']['name'])

# start_batch = 0
# batch_size = 100
# end_at = len(tracks) - 1

# while (start_batch < end_at):
#     end_batch = start_batch + batch_size
#     if end_batch > end_at:
#         end_batch = end_at

#     track_ids = tracks[start_batch:end_batch]
#     track_info = spotify.audio_features(track_ids)

#     for i in range(len(track_info)):
#         track = track_info[i]
#         acousticness = track['acousticness']
#         track_id = track['id']
#         danceability = track['danceability']
#         duration_ms = track['duration_ms']
#         energy = track['energy']
#         instrumentalness = track['instrumentalness']
#         key = track['key']
#         liveness = track['liveness']
#         loudness = track['loudness']
#         mode = track['mode']
#         name = titles[start_batch + i]
#         speechiness = track['speechiness']
#         tempo = track['tempo']
#         valence = track['valence']


    
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
#                                   valence
#                                 )
#         new_angry_track = crud.create_angry_track(acousticness, 
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
#                                   valence
#                                 )
#     start_batch += batch_size
#     time.sleep(1)
