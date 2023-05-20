import logo from './logo.svg';
import './App.css';
import styled from '@emotion/styled'
import { useState } from 'react'

const GuestTeam = "Yankees"
const HomeTeam = "Red Sox"

const ContainerStyle = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  flex-direction: column;
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
`

const ButtonStyle = styled.button`
  color: #012311;
  background-color: coral;
  font-size: 20px;
`

const CurrentInningStyle = styled.text`
  color: red;
`
const NotCurrentInningStyle = styled.text`
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

const PrintGuestTeam = ({isBottom}) => {
  if (isBottom === false) {
    return (
       <CurrentInningStyle>
        <td>{GuestTeam}</td>
       </CurrentInningStyle>
        
    )
  } else {
    return (
      <NotCurrentInningStyle>
        <td key={GuestTeam}>{GuestTeam}</td>
      </NotCurrentInningStyle>
        
    )
  }
}

const PrintHomeTeam = ({isBottom}) => {
  if (isBottom === true) {
    return (
      <CurrentInningStyle>
      <td>{HomeTeam}</td>
     </CurrentInningStyle>
    )
  } else {
    return (
      <NotCurrentInningStyle>
        <td key={HomeTeam}>{HomeTeam}</td>
      </NotCurrentInningStyle>
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

const Outs = () => {
  return (
    <ContainerStyle>
    <div>
      <h3 align="center">
        Outs
      </h3>
      <OutSign />
      <OutSign />
      <OutSign />
    </div>
    </ContainerStyle>
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
        <ScoreboardStyle />
        <ScoreBoard 
          currentInning={currentInning} 
          isBottom={isBottom} 
          GuestScores={GuestScores} 
          HomeScores={HomeScores} />
        <Outs />
        <ButtonStyle onClick={changeInning}>
          Change
        </ButtonStyle>
      </div>
    </>
  );
}

export default RecordApp;