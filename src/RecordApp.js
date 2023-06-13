import './App.css';
import styled from '@emotion/styled'
import { useState, useEffect, useCallback } from 'react'

var GuestTeam = "Yankees"
var HomeTeam = "Red Sox"

const OutsContainerStyle = styled.div`
  border-radius: 50%;
  display: inline-block;
  margin-up: 10px;
  margin-bottom: 10px;
  align-items: center;
  text-align: center;
  width: 100%;
`
const PaFormContainerStyle = styled.div`
  margin-up: 10px;
  margin-bottom: 10px;
  align-items: center;
  text-align: center;
  width: 100%
`
const HistoryContainerStyle = styled.div`
  border-radius: 50%;
  margin-up: 10px;
  margin-bottom: 10px;
  align-items: center;
  text-align: center;
  width: 100%
`
const InputStyle = styled.div`
  font-font-size-adjust: 0.90;
  font-family: 微軟正黑體;
  margin-left: 20px;
  margin-right: 20px;
  margin-up: 20px;
  margin-bottom: 20px;
`
const HeaderStyle = styled.div`
  font-color: #010101;
  font-size: 40px;
  width: 100%;
  text-align: center;
  ;
`
const ScoreboardStyle = styled.div`
  margin:0px auto;
  display: flex;
  width: 100%;
  text-align: center;
`
const TableStyle = styled.div`
  margin:0px auto;
  display: flex;
  font-size: 30px;
  font-family: 微軟正黑體;
  align-content: center;
  align-self: center;
  align-items: center;
  text-align: center;
`
const HistoryTableStyle = styled.table`
  margin:0px auto;
  border-style: solid;
  border: 1px dotted;
  font-size: 15px;
  border-collapse: collapse;
  font-family: 微軟正黑體;
  width: 80%;
`
const ButtonStyle = styled.button`
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  color: #012311;
  height: 40px;

  margin: 20px 20px 40px 40px;
  font-size: 20px;
  text-align: center;
  background-color: ${({bgcolor}) => bgcolor};
  &:hover {
    background-color: lightblue;
  };
  
`
const ButtonContainerStyle = styled.div`
 margin:0px auto;
 width: 100%;
 text-align: center;
`
const CurrentInningStyle = styled.div`
  color: red;
`
const NotCurrentInningStyle = styled.div`
  color: black;
`
const OutSign = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-right: 5px;
  background-color: lightgrey;
`
const OutSign2 = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-right: 5px;
  background-color: yellow;
`

const Header = () => (
  <h1>
    <HeaderStyle>
      比賽紀錄
    </HeaderStyle>
  </h1>
)

const Inning = ({ currentInning, targetInning }) => {
  if (currentInning === targetInning) {
    return (
      <td width="100px">
        <CurrentInningStyle>
          {targetInning}
        </CurrentInningStyle>
      </td>
    )
  } else {
    return (
      <td width="100px">
        <NotCurrentInningStyle>
          {targetInning}
        </NotCurrentInningStyle>
      </td>
    )
  }
}

const PrintTeam = ({ isBottom, team }) => {
  if (team === "Guest") {
    if (isBottom === 0) {
      return (
          <td><font color="red">{GuestTeam}</font></td>
      )
    } else {
      return (
          <td><font color="black">{GuestTeam}</font></td>
      )
    }
  } else if (team === "Home") {
    if (isBottom === 1) {
      return (
          <td><font color="red">{HomeTeam}</font></td>
      )
    } else {
      return (
          <td><font color="black">{HomeTeam}</font></td>
      )
    }
  }
}

const InningsRow = ({ currentInning, GuestScores }) => {
  const Innings = Array.from({ length: 9 }, (_, index) => index);
  return (
    <tr>
      <td></td>
      {Innings.map((score, index) => (
        <Inning key={index} currentInning={currentInning} targetInning={index + 1} />
      ))}

      <td width="70px">R</td>
      <td width="70px">H</td>
      <td width="70px">E</td>
    </tr>
  )
}

const Score = ({ score, histLen, currentInning, inn, isBottom, team }) => {
  if (histLen === 0) {
    return (
      <td></td>
    )
  } else {
    if (currentInning === inn && ((isBottom === 0 && team === "Guest") || (isBottom === 1 && team === "Home"))) {
      return (
          <td> <font color="red">{score}</font> </td>
      )
    } else {
      return (
        <td> {score} </td>
      )
    }
  }
}

const ScoreBoard = ({ currentInning, isBottom, history }) => {
  const _9 = Array.from({length: 9}, (_, index) => index+1)
  const guestHistory = history.filter(hist => hist.team === GuestTeam)
  const homeHistory = history.filter(hist => hist.team === HomeTeam)
  return (
    <ScoreboardStyle>
      <TableStyle>
        <table border="1">
          <tbody>
            <InningsRow currentInning={currentInning} />
            <tr>
              <PrintTeam isBottom={isBottom} team="Guest" />
              
              {_9.map((inn, _) => (
                <Score key={inn} 
                       score={
                              guestHistory.filter(hist => hist.inning === inn).reduce((sum ,a) => sum + a.rbi, 0) + 
                              guestHistory.filter(hist => hist.inning === inn).filter(hist => hist.battingResult.includes("雙殺得1分")).length + 
                              guestHistory.filter(hist => hist.inning === inn).filter(hist => hist.battingResult.includes("雙殺得2分")).length * 2 
                       }
                       currentInning={currentInning} 
                       inn={inn}
                       isBottom={isBottom}
                       team="Guest"
                       histLen={guestHistory.filter(hist => hist.inning === inn).length} 
                />
              ))}
              
              <td> {/* Run */}
                {guestHistory.reduce((sum, a) => sum + a.rbi, 0) + 
                 guestHistory.filter(hist => hist.battingResult.includes("雙殺得1分")).length + 
                 guestHistory.filter(hist => hist.battingResult.includes("雙殺得2分")).length * 2} 
              </td>
              <td> {/* Hit */}
                {guestHistory.filter(hist => hist.battingResult.includes("安打") || hist.battingResult.includes("全壘打")).reduce((sum, a) => sum + 1, 0)} 
              </td>
              <td> {/* Error */}
                {guestHistory.filter(hist => hist.battingResult.includes("失誤")).length} 
              </td>
            </tr>
            <tr>
              <PrintTeam isBottom={isBottom} team="Home" />
              
              {_9.map((inn, _) => (
                <Score key={inn} 
                       score={
                              homeHistory.filter(hist => hist.inning === inn).reduce((sum ,a) => sum + a.rbi, 0) + 
                              homeHistory.filter(hist => hist.inning === inn).filter(hist => hist.battingResult.includes("雙殺得1分")).length + 
                              homeHistory.filter(hist => hist.inning === inn).filter(hist => hist.battingResult.includes("雙殺得2分")).length * 2 
                       }
                       currentInning={currentInning}
                       inn={inn}
                       isBottom={isBottom}
                       team="Home"
                       histLen={homeHistory.filter(hist => hist.inning === inn).length} 
                />
              ))}
              <td> 
                {homeHistory.reduce((sum, a) => sum + a.rbi, 0) +
                 homeHistory.filter(hist => hist.battingResult.includes("雙殺得1分")).length + 
                 homeHistory.filter(hist => hist.battingResult.includes("雙殺得2分")).length * 2} 
              </td>
              <td> {/* Hit */}
                {homeHistory.filter(hist => hist.battingResult.includes("安打") || hist.battingResult.includes("全壘打")).reduce((sum, a) => sum + 1, 0)} 
              </td>
              <td> {/* Error */}
                {homeHistory.filter(hist => hist.battingResult.includes("失誤")).length} 
              </td>
            </tr>
          </tbody>
        </table>
      </TableStyle>
    </ScoreboardStyle>
  )
}

const OutBoard = ({ history }) => {
  var outs = 0
  if (history.length === 0) {
    outs = 0
  } else {
    outs = history.at(-1).currentOuts
  }

  outs = (outs >= 3) ? 0 : outs


  const O1 = Array.from({length: outs}, (_, index) => index)
  const O2 = Array.from({length: 2 - outs}, (_, index) => index)
  return (
    <OutsContainerStyle>
      <div>
        <h3 align="center">
          Outs
        </h3>
        {O1.map((op, index) => (
          <OutSign2 key={index}> </OutSign2>
        ))}
        {O2.map((op, index) => (
          <OutSign key={index+3}></OutSign>
        ))}
      </div>
    </OutsContainerStyle>
  )
}

const ButtonArea = ({ handleChange, handleReset, handleExport }) => {

  return (
    <ButtonContainerStyle>
      <ButtonStyle onClick={handleChange} bgcolor={'#66B3FF'}>
        Change
      </ButtonStyle>
      <ButtonStyle onClick={handleExport} bgcolor={'#02DF82'}>
        Export
      </ButtonStyle>
      <ButtonStyle onClick={handleReset} bgcolor={'#FF8040'}>
        Reset
      </ButtonStyle>
    </ButtonContainerStyle>
  )
}

const BattingOrder = ({ setBattingOrder }) => {
  const Options = Array.from({ length: 11 }, (_, index) => index + 1)
  
 const handleChange = event => setBattingOrder(event.target.value)
  
  return (
    <InputStyle>
      <label>棒次: </label>
      <select onChange={handleChange}>
        <option></option>
        {Options.map((op, index) => (
          <option key={index}>{op}</option>
        ))}
      </select>
    </InputStyle>
  )
}

const PlayerNumber = ({ setPlayerNumber }) => {

  const handleChange = event => setPlayerNumber(event.target.value)

  return (
    <InputStyle>
      <label>背號: </label>
      <input onChange={handleChange} />
    </InputStyle>
  )
}

const Direction = ({ setDirection }) => {
  const PositionCode = ['', '1 (投手)', '2 (捕手)', '3 (一壘)', '4 (二壘)', '5 (三壘)', '6 (游擊)', '7 (左外)', '8 (中外)', '9 (右外)', '10 (自由)'];
  
  const handleChange = event => setDirection(event.target.value)

  return (
    <InputStyle>
      <label>打擊方向: </label>
      <select onChange={handleChange}>
        {PositionCode.map((position, index) => (
          <option key={index}>
            {position}
          </option>
        ))}
      </select>
    </InputStyle>
  )
}

const BattingResult = ({ setBattingResult }) => {
  const Result = ['未定義', 'GO (滾地出局)', 'FO (飛球出局)', 'FC (野手選擇)', 'E (對手失誤)', 
                  'K (被三振)', 'BB (保送)', 'SF (高飛犧牲打)', '1B (一壘安打)', '2B (二壘安打)', 
                  '3B (三壘安打)', 'HR (全壘打)', 'DP (雙殺)' , 'DP (雙殺得1分)', 'DP (雙殺得2分)'];

  const handleChange = event => setBattingResult(event.target.value)

  return (
    <InputStyle>
      <label>打擊結果: </label>
      <select onChange={handleChange}>
        {Result.map((result, index) => (
          <option key={index}>
            {result}
          </option>
        ))}
      </select>
    </InputStyle>
  )
}

const Outs = ({ setCurrentOuts }) => {
  const Result = [0, 1, 2, 3];

  const handleChange = event => setCurrentOuts(event.target.value)

  return (
    <InputStyle>
      <label>出局: </label>
      <select onChange={handleChange}>
        {Result.map((result, index) => (
          <option key={index}>
            {result}
          </option>
        ))}
      </select>
    </InputStyle>
  )
}

const Rbi = ({ setRbi }) => {
  const Result = [0, 1, 2, 3, 4];

  const handleChange = event => setRbi(parseInt(event.target.value))

  return (
    <InputStyle>
      <label>打點: </label>
      <select onChange={handleChange}>
        {Result.map((result, index) => (
          <option key={index}>
            {result}
          </option>
        ))}
      </select>
    </InputStyle>
  )
}

const HistoryArea = ({ history }) => {
  const attributes = ['隊伍','局數','棒次','背號','打擊方向','打擊結果','出局數','打點']

  return (
    <HistoryContainerStyle>
      <HistoryTableStyle>

      <tbody>
      <tr>
        {attributes.map((attr, index) => (<td key={index}>{attr}</td>))}
      </tr>
      {history.slice().reverse().map((hist, index) => (
              <tr key={index}>
                <td key={index.toString() + "team"}>{hist.team}</td>
                <td key={index.toString() + "inning"}>{hist.inning}</td>
                <td key={index.toString() + "battingOrder"}>{hist.battingOrder}</td>
                <td key={index.toString() + "playerNumber"}>{hist.playerNumber}</td>
                <td key={index.toString() + "direction"}>{hist.direction}</td>
                <td key={index.toString() + "battingResult"}>{hist.battingResult}</td>
                <td key={index.toString() + "outs"}>{hist.currentOuts}</td>
                <td key={index.toString() + "rbi"}>{hist.rbi} </td>
              </tr>
            
          
        ))}
        </tbody>

        </HistoryTableStyle>
    </HistoryContainerStyle>
  )
}

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
    scores[isBottom][currentInning-1] = accuScore
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
      history.filter(hist => hist.inning === currentInning && hist.team === (isBottom ? HomeTeam : GuestTeam))
          .reduce((sum, a) => sum + a.rbi, 0)
    )

    setBottom(history.at(-1).team === GuestTeam ? 0 : 1)
  }

  const handleSendClick = () => {

    setHistory([...history, {
      team: isBottom ? HomeTeam : GuestTeam,
      inning: currentInning,
      battingOrder: battingOrder,
      playerNumber: playerNumber,
      direction: direction,
      battingResult: battingResult,
      rbi: rbi,
      currentOuts: currentOuts,
      accuScore: accuScore,
      currentPa: currentPa+1
    }])
  }

  const handleUndoClick = () => {
    if (history.length === 0) {
      return
    }
    setHistory(history.filter((_, i) => {return i !== history.length-1}))
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
    var csv = ["\ufeff" + GuestTeam + ",局數,棒次,背號,打擊方向,打擊結果,出局數,打點\n",
               "\ufeff" + HomeTeam + ",局數,棒次,背號,打擊方向,打擊結果,出局數,打點\n"]

    history.forEach(hist => {
      csv[hist.team === GuestTeam ? 0 : 1] += ","
      csv[hist.team === GuestTeam ? 0 : 1] += hist.inning + ","
      csv[hist.team === GuestTeam ? 0 : 1] += hist.battingOrder + ","
      csv[hist.team === GuestTeam ? 0 : 1] += hist.playerNumber + ","
      csv[hist.team === GuestTeam ? 0 : 1] += hist.direction + ","
      csv[hist.team === GuestTeam ? 0 : 1] += hist.battingResult + ","
      csv[hist.team === GuestTeam ? 0 : 1] += hist.currentOuts + ","
      csv[hist.team === GuestTeam ? 0 : 1] += hist.rbi + ","
      csv[hist.team === GuestTeam ? 0 : 1] += "\n"
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
    GuestTeam = event.target.value
  }
  const updateHomeTeam = event => {
    HomeTeam = event.target.value
  }
  const handleStart = () => {
    setIsTeamNameSet(1)
  }
  if (isTeamNameSet === 0) {
    return (
      <OutsContainerStyle>
        <Header />
        <InputStyle>
          <label>Guest Team: </label>
          <input onChange={updateGuestTeam}></input>
        </InputStyle>
        <InputStyle>
          <label>Home Team: </label>
          <input onChange={updateHomeTeam}></input>
        </InputStyle>
        <ButtonStyle onClick={handleStart}>
          Start
        </ButtonStyle>
      </OutsContainerStyle>
    )
  }

  return (
    <>
      <div>
        <Header />
        <ButtonArea 
          handleChange={handleChange} 
          handleReset={handleReset} 
          handleExport={handleExport} />
        <ScoreBoard
          currentInning={currentInning}
          isBottom={isBottom}
          scores={scores}
          history={history}
          />
      </div>
      <OutsContainerStyle>
        <OutBoard history={history} />
      </OutsContainerStyle>


      <PaFormContainerStyle>
        <ButtonStyle onClick={handleSendClick}> 送出 </ButtonStyle>
        <ButtonStyle onClick={handleUndoClick}> Undo </ButtonStyle>
        <p>打席數: {currentPa}</p>
        <BattingOrder setBattingOrder={setBattingOrder} />
        <PlayerNumber setPlayerNumber={setPlayerNumber} />
        <Direction setDirection={setDirection} />
        <BattingResult setBattingResult={setBattingResult} />
        <Outs setCurrentOuts={setCurrentOuts} />
        <Rbi setRbi={setRbi} />
      </PaFormContainerStyle>
    
      <HistoryArea history={history} isBottom={isBottom} />

    </>
  );
}

export default RecordApp;