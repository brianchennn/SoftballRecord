import logo from './logo.svg';
import './App.css';
import styled from '@emotion/styled'
import { useState } from 'react'

const GuestTeam = "Yankees"
const HomeTeam = "Red Sox"

const ContainerStyle = styled.div`
  display: flex;
  //box-shadow: 10px 5px 5px black;
  width: 100%;
`

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
  align-items: center;
  text-align: center;
  ;
`

const ButtonStyle = styled.button`
  color: #012311;
  background-color: coral;
  font-size: 20px;
  ;
`

const CurrentInningStyle = styled.div`
  color: red;
  ;
`
const NotCurrentInningStyle = styled.div`
  color: black;
  ;
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

const InningsRow = ({ currentInning }) => {
  return (
    <tr>
      <td></td>
      <Inning currentInning={currentInning} targetInning={1} />
      <Inning currentInning={currentInning} targetInning={2} />
      <Inning currentInning={currentInning} targetInning={3} />
      <Inning currentInning={currentInning} targetInning={4} />
      <Inning currentInning={currentInning} targetInning={5} />
      <Inning currentInning={currentInning} targetInning={6} />
      <Inning currentInning={currentInning} targetInning={7} />
      <Inning currentInning={currentInning} targetInning={8} />
      <Inning currentInning={currentInning} targetInning={9} />
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
  const { currentInning } = props
  // const Innings = Array.from({ length: 9 }, (_, index) => index);
  const GuestScores = Array.from({ length: 9 }, (_, index) => -1);
  const homeScores = Array.from({ length: 9 }, (_, index) => -1);
  return (
    <div>
      <TableStyle>
        <table border="1">
          <tbody>
            <InningsRow currentInning={currentInning} />
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

const InputArea = (props) => {
  
  return (
    <>
      <ButtonStyle onclick={props.toNextInning}>
          Change
      </ButtonStyle>
    </>
  )
}

function RecordApp() {
  const [currentInning, setCurrentInning] = useState(1);
  const [isBottom, setBottom] = useState(0); 

  const toNextInning = () => {
    if (currentInning === 9) {
      setCurrentInning(1);
    } else {
      setCurrentInning(currentInning + 1);
    }
  }
  return (
    <>
      <div>
        <Header />
        <ScoreboardStyle />
        <ScoreBoard currentInning={currentInning} isBottom={isBottom} />
        
        <ButtonStyle onClick={toNextInning}>
          Change
        </ButtonStyle>
      </div>
    </>
  );
}

export default RecordApp;