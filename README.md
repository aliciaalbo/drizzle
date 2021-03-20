# Drizzle
## _Weather based mood music on demand_

## Table of Contents

* [Summary](#summary)
* [Tech Stack](#tech-stack)
* [Features](#features)
* [Design Details](#design)
* [Local Installation](#installation)
* [About the Developer](#developer)

## <a name="summary"></a>Summary
**Drizzle** is a fun web app for generating music playlists based on the "mood" of your current weather. Generated playlists contain 20 tracks and are selected randomly from a database of over 15,000 mood-classified songs. Premium Spotify users can save their playlist to Spotify or listen directly in the browser.

Drizzle is available online at <a href="https://drizzle.aliciaalbo.com/">https://drizzle.aliciaalbo.com/</a>

## <a name="tech-stack"></a>Tech Stack
__Front End:__ HTML5, CSS3 Jinja2, JavaScript, React, Bootstrap, Webpack, Babel<br/>
__Back End:__ Python 3, Flask, SQLAlchemy<br/>
__Database:__ PostgreSQL<br/>
__APIs and SDKs:__ OpenWeather, Spotify Web API (with Spotipy), Spotify Web Playback SDK<br/>

## <a name="features"></a>Features

To generate a new playlist, simply enter your zip code:

<br/>![Weather lookup with zip code search](/static/img/anim-zipcode.gif)<br/><br/>

Non-U.S. visitors can enter latitude/longitude coordinates instead:

<br/>![Weather lookup with latitude/longitude search](/static/img/anim-latlon.gif)<br/><br/>

If the user wants a different selection, the "New Mix" button generates a new selection of tracks using the same weather data.

In order to interact with the playlist, the user must be a premium Spotify member and log into Spotify through OAuth. Drizzle requests permissions to create playlists directly to the user's account and perform playback functionality:

<br/>![Spotify OAuth](/static/img/anim-oauth.gif)<br/><br/>

## <a name="design"></a>Design Details

The backbone of Drizzle is the Postgres database. The database is populated with over 15,000 mood-keyword associated songs retrieved from the Spotify Web API. The Spotify API is queried for playlists containing mood related keywords. Each track in the playlist is associated with the mood keyword in the playlist title and stored in the Drizzle databse. The database also stores all possible weather conditions from the Open Weather API, mapped to mood keywords:

<br/>![Weather-Mood-Song mapping](/static/img/chart-db.jpg)<br/><br/>

OAuth is used to integrate with Spotify and the OAuth session is shared between Flask and React in following way:

<br/>![Spotify OAuth data flow](/static/img/chart-oauth.jpg)<br/><br/>

## <a name="installation"></a>Local Installation

#### Requirements:

- Python 3
- PostgreSQL
- React
- npm

To run this app on your local computer, please follow these steps:

Clone repository:
```
$ git clone https://github.com/aliciaalbo/drizzle.git
```

#### Setup Flask:

Create a virtual environment:
```
$ virtualenv env
```

Activate the virtual environment:
```
$ source env/bin/activate
```

Install dependencies:
```
$ pip3 install -r requirements.txt
```

#### Setup React:

Install dependencies, including Webpack and Babel:
```
npm install
```

#### Setup Credentials/Secrets:

From the project directory, create a file 'secrets.py' containing:
```
secret_key="<Flask secret key>"
db_uri="<PostgreSQL database URI>"
appid="<OpenWeather API Key>"
cid="<Spotify client ID>"
secret="<Spotify secret key>"
spotifyredirect="<Spotify Redirect URI>"
```

**secret_key** is needed by Flask to generate session cookies. It can be any random string of sufficient length for security.

**db_uri** should be in the format:
```
postgresql://<username>:<password>@<server>/<database>
```

In a local environment, the following URI should be sufficient:
```
postgresql:///drizzle
```

**appid** is a client ID you must generate to use the OpenWeather API. <a href="https://home.openweathermap.org/users/sign_up">Create an account on OpenWeather</a> then click on the 'API keys' tab. Copy the default key into your secrets.py:
```
appid="<OpenWeather API Key>"
```

To enable Spotify interactions, you need to create your own app on Spotify for Developers. Log in to Spotify and go to the <a href="https://developer.spotify.com/dashboard/applications">Spotify for Developers dashboard</a>. Click "Create an App" and complete the form for your app. Store the Client ID (**cid**) and Client Secret (**secret**) in your secrets.py. You must also create a callback URI where Spotify will send the user after logging in. Click on 'Edit Settings' and add your callback where it says "Redirect URIs". For a local setup, use "http://localhost:5000/callback" for your redirect URI and also set **spotifyredirect** to that value in secrets.py:
```
cid="<Spotify client ID>"
secret="<Spotify secret key>"
spotifyredirect="<Spotify Redirect URI>"
```

#### Setup the database:

Once your API credentials are sorted, you can create and populate your database.

With PostgreSQL installed, create your database 'drizzle':
```
$ createdb drizzle
```

Create your database tables:
```
$ python3 model.py
```

Seed the database by pulling track information from Spotify using your client ID and client secret:
```
$ python3 seed_database.py
```

#### Bundle JavaScript:
Drizzle uses Webpack to bundle the frontend scripts for faster loading. To bundle the files, run:
```
npm run build
```

To start the Flask web server, run:
```
$ python3 server.py
```

In your browser, visit <a href="http://localhost:5000/">http://localhost:5000/</a> and enjoy!

## <a name="developer"></a>About the Developer

Alicia Albo is a software engineer based in San Francisco. She is a former chemist and online marketing manager who uses her problem solving skills and business acumen to develop smart solutions for tricky problems.

Learn more about Alicia on her <a href="https://aliciaalbo.com/">personal site</a> or on <a href="https://www.linkedin.com/in/aliciaalbo/">LinkedIn</a>.
