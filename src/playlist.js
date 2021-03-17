import React from 'react';

function ShowPlaylist(props) {
  return (
    <div className="playlist container">
      {props.playlist.map((song, index) => {
        const rowclasses = song.trackid === props.curTrackId ? 'playlist-row row playlist-row-active' : 'playlist-row row';
        const songNum = index+1;
        return (
      <div className={rowclasses} id={song.trackid} idx={index} key={song.trackid}>
        <div className="playlist-number col-auto my-auto">{songNum}</div>
        <div className="playlist-album col-auto my-auto"><img src={song.album_art} /></div>
        <div className="playlist-trackinfo col my-auto">
          <div className="playlist-title">{song.title}</div>
          <div className="playlist-artist">{song.artist}</div>
        </div>
     </div>
        )}
      )}
    </div>
  );
}

export default ShowPlaylist;