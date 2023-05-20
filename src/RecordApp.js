import logo from './logo.svg';
import './App.css';
import styled from '@emotion/styled'
import { useState } from 'react'

const GuestTeam = "Yankees"
const HomeTeam = "Red Sox"

const ContainerStyle = styled.div`
  display: flex;
  margin-up: 100px;
  margin-bottom: 10px;
  align-items: center;
  text-align: center;
  width: 100%;
`
const InputStyle = styled.div`
  font-font-size-adjust: 0.90;
  font-family: 微軟正黑體;
  margin-left: 20px;
  margin-right: 20px;
`
const HeaderStyle = styled.div`
  font-color: #010101;
  font-size: 40px;
  width: 100%;
  text-align: center;
  ;
`
const ScoreboardStyle = styled.div`
 display: flex;
 background-color: pink;
 width: 100%;
 text-align: center;
 border:1px solid #000;
 ;
`
const TableStyle = styled.div`
  font-size: 30px;
  border-collapse: collapse;
  font-family: 微軟正黑體;
  align-content: center;
  align-self: center;
  align-items: center;
  text-align: center;
`
const ButtonStyle = styled.button`
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  color: #012311;
  height: 40px;
  width: 100px;
  margin-left: 40px;
  margin-right: 40px;
  margin-up: 40px;
  margin-bottom: 40px;
  font-size: 20px;
  text-align: center;
  background-color: ${(bg) => bg};
  &:hover {
    background-color: lightblue;
  };
  
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
  if (currentInning == targetInning) {
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

const PrintGuestTeam = ({ isBottom }) => {
  if (isBottom === false) {
    return (
        <td><font color="red">{GuestTeam}</font></td>
    )
  } else {
    return (
        <td key={GuestTeam}>{GuestTeam}</td>
    )
  }
}

const PrintHomeTeam = ({ isBottom }) => {
  if (isBottom === true) {
    return (
      <td><font color="red">{HomeTeam}</font></td>
    )
  } else {
    return (  
        <td key={HomeTeam}>{HomeTeam}</td>
    )
  }
}

const InningsRow = ({ currentInning }) => {
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

const Score = (props) => {
  const { score } = props;
  if (score === -1) {
    return (
      <td></td>
    )
  } else {
    return (
      <td>
        score
      </td>
    )
  }
}

const ScoreBoard = (props) => {
  const { currentInning, isBottom, GuestScores, HomeScores } = props
  // const Innings = Array.from({ length: 9 }, (_, index) => index);

  return (
    <div>
      <TableStyle>
        <table border="1">
          <tbody>
            <InningsRow currentInning={currentInning} />
            <tr>
              <PrintGuestTeam isBottom={isBottom} />
              {GuestScores.map((score, index) => (
                <Score key={index} score={score} />
              ))}
            </tr>
            <tr>
              <PrintHomeTeam isBottom={isBottom} />
              {HomeScores.map((score, index) => (
                <Score key={index} score={score} />
              ))}
            </tr>
          </tbody>
        </table>
      </TableStyle>
    </div>
  )
}

const OutBoard = ({currentOuts}) => {
  const O1 = Array.from({length: currentOuts}, (_, index) => index)
  const O2 = Array.from({length: 3 - currentOuts}, (_, index) => index)
  return (
    <ContainerStyle>
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
    </ContainerStyle>
  )
}

const ButtonArea = ({ changeInning }) => {
  const bg = 'blue'
  return (
    <>
      <ButtonStyle onClick={changeInning} bg={bg}>
        Change
      </ButtonStyle>
      <ButtonStyle bg={bg}>
        Submit
      </ButtonStyle>
      <ButtonStyle bg={bg}>
        Button3
      </ButtonStyle>
    </>
  )
}

const BattingOrder = ({setBattingOrder}) => {

  const Options = Array.from({ length: 11 }, (_, index) => index + 1)
  return (
    <InputStyle>
      <label>棒次: </label>
      <select>
        {Options.map((op, index) => (
          <option key={index}>{op}</option>
        ))}
      </select>
    </InputStyle>
  )
}

const PlayerNumber = () => {
  return (
    <InputStyle>
      <label>背號: </label>
      <input>

      </input>
    </InputStyle>
  )
}

const Direction = () => {
  const PositionCode = ['1 (投手)', '2 (捕手)', '3 (一壘)', '4 (二壘)', '5 (三壘)', '6 (游擊)', '7 (左外)', '8 (中外)', '9 (右外)', '10 (自由)'];
  return (
    <InputStyle>
      <label>打擊方向: </label>
      <select>
        {PositionCode.map((position, index) => (
          <option key={index}>
            {position}
          </option>
        ))}
      </select>
    </InputStyle>
  )
}

const BattingResult = () => {
  const Result = ['GO (滾地出局)', 'FO (飛球出局)', 'FC (野手選擇)', 'E (對手失誤)', 'K (被三振)', 'BB (保送)', 'SF (高飛犧牲打)', '1B (一壘安打)', '2B (二壘安打)', '3B (三壘安打)', 'HR (全壘打)'];
  return (
    <InputStyle>
      <label>打擊結果: </label>
      <select>
        {Result.map((result, index) => (
          <option key={index}>
            {result}
          </option>
        ))}
      </select>
    </InputStyle>
  )
}

const Rbi = () => {
  const Result = ['0 RBI', '1 RBI', '2 RBI', '3 RBI', '4 RBI'];
  return (
    <InputStyle>
      <label>打點: </label>
      <select>
        {Result.map((result, index) => (
          <option key={index}>
            {result}
          </option>
        ))}
      </select>
    </InputStyle>
  )
}

const OutsSelect = () => {
  const Result = ['0', '1', '2', '3'];
  return (
    <InputStyle>
      <label>出局: </label>
      <select>
        {Result.map((result, index) => (
          <option key={index}>
            {result}
          </option>
        ))}
      </select>
    </InputStyle>
  )
}


const PaFormArea = () => {
  const [battingOrder, setBattingOrder] = useState(0)
  const [playerNumber, setPlayerNumber] = useState("")
  const [direction, setDirection] = useState("")
  const [battingResult, setBattingResult] = useState("")
  const [outs, setOuts] = useState(0)
  const [rbi, setRbi] = useState("")

  const Options = Array.from({ length: 11 }, (_, index) => index + 1)
  return (
    <>
      <ButtonStyle>
        送出
      </ButtonStyle>
      <div></div>
      <BattingOrder setBattingOrder={setBattingOrder} />
      <PlayerNumber setPlayerNumber={setPlayerNumber} />
      <Direction setDirection={setDirection} />
      <BattingResult setBattingResult={setBattingResult} />
      <OutsSelect setOuts={setOuts} />
      <Rbi setRbi={setRbi} />
    </>
  )
}

function RecordApp() {
  const [currentInning, setCurrentInning] = useState(1);
  const [currentOuts, setCurrentOuts] = useState(0);
  const [isBottom, setBottom] = useState(false);
  const GuestScores = Array.from({ length: 9 }, (_, index) => -1);
  const HomeScores = Array.from({ length: 9 }, (_, index) => -1);

  const changeInning = () => {
    if (isBottom === false) {
      setBottom(true)
    }
    else if (currentInning === 9) {
      setBottom(false)
      setCurrentInning(1);
    } else {
      setBottom(false)
      setCurrentInning(currentInning + 1);
    }
  }
  return (
    <>
      <div>
        <Header />
        <ButtonArea changeInning={changeInning} />
        <ScoreboardStyle />
        <ScoreBoard
          currentInning={currentInning}
          isBottom={isBottom}
          GuestScores={GuestScores}
          HomeScores={HomeScores} />
      </div>
      <ContainerStyle>
        <OutBoard currentOuts={currentOuts} />
      </ContainerStyle>
      <ContainerStyle>
        <PaFormArea />
      </ContainerStyle>
    </>
  );
}

export default RecordApp;