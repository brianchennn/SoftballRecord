import logo from './logo.svg';
import './App.css';
import styled from '@emotion/styled'
import { useState } from 'react'

const GuestTeam = "Yankees"
const HomeTeam = "Red Sox"

const HeaderStyle = styled.div`
  background-color: #ededed;
  font-size: 20px;
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
  ;
`

const CurrentInningStyle = styled.div`
  font-color: red;
  ;
`
const NotCurrentInningStyle = styled.div`
  font-color: black;
  ;
`

const Header = () => (
  <h1>
    <HeaderStyle>
      比賽紀錄
    </HeaderStyle>
  </h1>
)
 
const InningsRow = ({currentInning, Innings}) => {

  return (
    <tr>
      <td key="0" width="100px"></td>
      {Innings.map((item, index) => (
        <td width="100px" key={index}>
          {item+1}
        </td>
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
  const Innings = Array.from({ length: 9 }, (_, index) => index);
  const GuestScores = Array.from({ length: 9 }, (_, index) => -1);
  const homeScores = Array.from({ length: 9 }, (_, index) => -1);
  return (
    <div>
      <TableStyle>
        <table border="1">
          <tbody>
            <InningsRow currentInning={props.currentInning} Innings={Innings}/>
          <tr>
            <td key={GuestTeam}>{GuestTeam}</td>
            {GuestScores.map((score, index) => (
                <Score key={index} score={score} />
            ))}
          </tr>
          <tr>
            <td key={HomeTeam}>{HomeTeam}</td>
            {homeScores.map((score, index) => (
              <Score key={index} score={score} />
            ))}
          </tr>
          </tbody>
        </table>
      </TableStyle>
    </div>
  )
}

const InputArea = () => {
  return
}

function RecordApp() {
  const [currentInning, setCurrentInning] = useState(1);

  const toNextInning = () => setCurrentInning(currentInning+1);
  return (
    <>
    <div>
      <Header />
      <ScoreboardStyle />
      <ScoreBoard currentInning={currentInning}/>
      <InputArea />
    </div>
    </>
  );
} 

export default RecordApp;