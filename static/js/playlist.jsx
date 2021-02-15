function getPlaylist(zipcode) {
    return ;
  }
  
  function Die(props) {
  
    const [diceValue, setDiceValue] = React.useState('?')
  
    function roll() {
      const rollResult = getRandomNum(props.sides);
      setDiceValue(rollResult)
    }
  
    return (
      <button className="die" onClick={roll}>
        <i>sides={props.sides}</i>
        <b>{diceValue}</b>
      </button>
    );
  }