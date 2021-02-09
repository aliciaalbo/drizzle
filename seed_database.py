"""Script to seed database"""

# from model import connect_to_db, db
from server import app

import os
import json

from datetime import datetime
import pandas as pd
import crud
import model
import server

model.connect_to_db(server.app)
model.db.create_all()

data = pd.read_csv("data.csv", nrows=5)

# print (list(enumerate(data)))


for i, item in enumerate(data):
    # print(i)
    acousticness = data.iloc[i, 0]
    # print(acousticness)
    danceability = data.iloc[i, 2]
    duration_ms = data.iloc[i, 3]
    energy = data.iloc[i, 4]
    if data.iloc[i, 5] == 0:
        explicit = False
    else:
        explicit = True
    # print(explicit)
    track_id = data.iloc[i, 6]
    instrumentalness = data.iloc[i, 7]
    key = data.iloc[i, 8]
    liveness = data.iloc[i, 9]
    loudness = data.iloc[i, 10]
    mode = data.iloc[i, 11]
    name = data.iloc[i, 12]
    popularity = data.iloc[i, 13]
    speechiness = data.iloc[i, 15]
    tempo = data.iloc[i, 16]
    valence = data.iloc[i, 17]
    # print(data.iloc[i])
    # print(data.iloc[2])
    # acousticness = data.iloc[i][0]
    # print(acousticness)
    # print(data.iloc[i, 3])
    # print(data.iloc[3,i][0]) 
    # print(data.iloc[3,i])
    # print(data.iloc[i, 3])

    new_track = crud.create_track(acousticness, 
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
                                )


