import './App.css';
import { useState, useEffect, useCallback } from 'react'
import Header from './components/Header'
import ScoreBoard from './components/Score';
import { BattingOrder, PlayerNumber, Direction, BattingResult, Outs, Rbi, OutBoard } from './components/Batting';
import HistoryArea from './components/History';

var guest_team = "Yankees"
var home_team = "Red Sox"

function exportToCsv(filename, csvFile) {
  var blob = new Blob([csvFile], { type: 'text/csv;charset=unicode;' });
  if (navigator.msSaveBlob) { // IE 10+
    navigator.msSaveBlob(blob, filename);
  } else {
    var link = document.createElement("a");
    if (link.download !== undefined) { // feature detection
      // Browsers that support HTML5 download attribute
      var url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", filename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
}

function RecordApp() {
  const [isTeamNameSet, setIsTeamNameSet] = useState(0)
  const [history, setHistory] = useState([])
  const [currentInning, setCurrentInning] = useState(1)
  const [currentOuts, setCurrentOuts] = useState(0)
  const [currentPa, setCurrentPa] = useState(0)
  const [battingOrder, setBattingOrder] = useState(1)
  const [playerNumber, setPlayerNumber] = useState("")
  const [direction, setDirection] = useState("")
  const [battingResult, setBattingResult] = useState("")
  const [rbi, setRbi] = useState(0)
  const [accuScore, setAccuScore] = useState(0)
  const [isBottom, setBottom] = useState(0);
  const [scores, setScores] = useState(
    [
      Array.from({ length: 9 }, (_) => -1),
      Array.from({ length: 9 }, (_) => -1)
    ]
  )

  const handleChange = () => {
    scores[isBottom][currentInning - 1] = accuScore
    setAccuScore(0)
    setScores(scores)
    setCurrentOuts(0)
    if (isBottom === 0) {
      setBottom(1)
    } else {
      setBottom(0)
      setCurrentInning(currentInning + 1);
    }
  }

  const setByLastHistory = () => {
    setCurrentPa(history.at(-1).currentPa)
    setCurrentOuts(history.at(-1).currentOuts)
    setCurrentInning(history.at(-1).inning)
    setAccuScore(
      history.filter(hist => hist.inning === currentInning && hist.team === (isBottom ? home_team : guest_team))
        .reduce((sum, a) => sum + a.rbi, 0)
    )

    setBottom(history.at(-1).team === guest_team ? 0 : 1)
  }

  const handleSendClick = () => {

    setHistory([...history, {
      team: isBottom ? home_team : guest_team,
      inning: currentInning,
      battingOrder: battingOrder,
      playerNumber: playerNumber,
      direction: direction,
      battingResult: battingResult,
      rbi: rbi,
      currentOuts: currentOuts,
      accuScore: accuScore,
      currentPa: currentPa + 1
    }])
  }

  const handleUndoClick = () => {
    if (history.length === 0) {
      return
    }
    setHistory(history.filter((_, i) => { return i !== history.length - 1 }))
    // setByLastHistory();
  }

  const handleReset = useCallback(() => {
    if (history.length !== 0) {
      setHistory([])
    }
    setScores([Array.from({ length: 9 }, (_) => -1), Array.from({ length: 9 }, (_) => -1)])
    setCurrentPa(0)
    setCurrentOuts(0)
    setCurrentInning(1)
    setBottom(0)
    setAccuScore(0)
  }, [history.length])

  const handleExport = () => {
    var csv = ["\ufeff" + guest_team + ",局數,棒次,背號,打擊方向,打擊結果,出局數,打點\n",
    "\ufeff" + home_team + ",局數,棒次,背號,打擊方向,打擊結果,出局數,打點\n"]

    history.forEach(hist => {
      csv[hist.team === guest_team ? 0 : 1] += ","
      csv[hist.team === guest_team ? 0 : 1] += hist.inning + ","
      csv[hist.team === guest_team ? 0 : 1] += hist.battingOrder + ","
      csv[hist.team === guest_team ? 0 : 1] += hist.playerNumber + ","
      csv[hist.team === guest_team ? 0 : 1] += hist.direction + ","
      csv[hist.team === guest_team ? 0 : 1] += hist.battingResult + ","
      csv[hist.team === guest_team ? 0 : 1] += hist.currentOuts + ","
      csv[hist.team === guest_team ? 0 : 1] += hist.rbi + ","
      csv[hist.team === guest_team ? 0 : 1] += "\n"
    })
    let date = new Date().toLocaleDateString();

    exportToCsv(date, csv[0] + "\n\n" + csv[1])
  }

  useEffect(() => {
    if (history.length === 0) {
      handleReset()
      return
    }
    setByLastHistory();
    // eslint-disable-next-line
  }, [history])

  const updateGuestTeam = event => {
    guest_team = event.target.value
  }
  const updateHomeTeam = event => {
    home_team = event.target.value
  }
  const handleStart = () => {
    setIsTeamNameSet(1)
  }
  if (isTeamNameSet === 0) {
    return (
      <div>
        <Header />
        <div id='init-form-container'>
          <div className='input-field'>
            <label>Guest Team: </label>
            <input onChange={updateGuestTeam}></input>
          </div>
          <div className='input-field'>
            <label>Home Team: </label>
            <input onChange={updateHomeTeam}></input>
          </div>
          <button onClick={handleStart}>Start</button>
        </div>
      </div>
    )
  }

  return (
    <>
      <div>
        <Header />
        <div id='operation-container'>
          <button onClick={handleChange}>
            Change
          </button>
          <button onClick={handleExport} style={{ backgroundColor: "#02DF82" }}>
            Export
          </button>
          <button onClick={handleReset} style={{ backgroundColor: "#FF8040" }}>
            Reset
          </button>
        </div>
        <ScoreBoard
          currentInning={currentInning}
          isBottom={isBottom}
          history={history}
          home_team={home_team}
          guest_team={guest_team}
        />
      </div>

      <OutBoard history={history} />

      <div id='paform-container'>
        <p>打席數: {currentPa}</p>
        <form>
          <BattingOrder setBattingOrder={setBattingOrder} />
          <PlayerNumber setPlayerNumber={setPlayerNumber} />
          <Direction setDirection={setDirection} />
          <BattingResult setBattingResult={setBattingResult} />
          <Outs setCurrentOuts={setCurrentOuts} />
          <Rbi setRbi={setRbi} />
          <br />
        </form>
        <button onClick={handleSendClick}> 送出 </button>
        <button onClick={handleUndoClick}> Undo </button>
      </div>

      <HistoryArea history={history} isBottom={isBottom} />
    </>
  );
}

export default RecordApp;