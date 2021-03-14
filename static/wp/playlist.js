import React from 'react';

function ShowPlaylist(props) {
  const handleClick = (e, idx, trackid) => {
    e.preventDefault();
    // only work if playback already started... for now
    if (props.playbackToggle === 'yes') {
      let activeIdx = 0;
      // pass in list of uris, curtrackid (default 0), determine idx of active track
      if (props.curTrackId) {
        for (const uri in props.playstate.uris) {
          if (props.curTrackId === uri) {
            break;
          }
          activeIdx++;
        }
        // shouldn't happen
        if (activeIdx > 19) { activeIdx = 0; }
      }
      console.log('clicked on ',idx,trackid,props.curTrackId,activeIdx);
      // then figure out how many fwd/prev to jump to get to clicked track
      // props.webplayer.player.previousTrack().then(() => {
      // });
    }
  };

  return (
    <div className="playlist container">
      {props.playlist.map((song, index) => {
        const rowclasses = song.trackid === props.curTrackId ? 'playlist-row row playlist-row-active' : 'playlist-row row';
        const songNum = index+1;
        // const space = &nbsp; + songNum;
        return (
      <div className={rowclasses} id={song.trackid} idx={index} key={song.trackid} onClick={e => { handleClick(e, index, song.trackid) }}>
        <div className="playlist-number col-auto my-auto">{songNum}</div>
        <div className="playlist-album col-auto my-auto"><img src="https://i.scdn.co/image/ab67616d0000b2737359994525d219f64872d3b1" /></div>
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