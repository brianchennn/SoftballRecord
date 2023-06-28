import { HomeTeam, GuestTeam } from "../components/Team";
import InningsRow from "./Inning";

const Score = ({ score, histLen, currentInning, inn, isBottom, team }) => {
    if (histLen === 0) {
        return (
            <td></td>
        )
    } else {
        let style = {};
        if (currentInning === inn && ((isBottom === 0 && team === "Guest") || (isBottom === 1 && team === "Home"))) {
            style = { color: "red" };
        } else {
            style = { color: "black" };
        }
        return (
            <td><span style={style}>{score}</span></td>
        )
    }
}

const ScoreBoard = ({ currentInning, isBottom, history, home_team, guest_team }) => {
    const _9 = Array.from({ length: 9 }, (_, index) => index + 1)
    const guestHistory = history.filter(hist => hist.team === guest_team)
    const homeHistory = history.filter(hist => hist.team === home_team)
    return (
        <div id="scoreboard">
            <table border="1">
                <tbody>
                    <InningsRow currentInning={currentInning} />
                    <tr>
                        <GuestTeam isBottom={isBottom} teamname={guest_team} />

                        {_9.map((inn, _) => (
                            <Score key={inn}
                                score={
                                    guestHistory.filter(hist => hist.inning === inn).reduce((sum, a) => sum + a.rbi, 0) +
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
                        <HomeTeam isBottom={isBottom} teamname={home_team} />

                        {_9.map((inn, _) => (
                            <Score key={inn}
                                score={
                                    homeHistory.filter(hist => hist.inning === inn).reduce((sum, a) => sum + a.rbi, 0) +
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
        </div>
    )
}

export default ScoreBoard;