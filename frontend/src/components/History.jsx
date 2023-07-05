const HistoryArea = ({ history }) => {
    const attributes = ['隊伍', '局數', '棒次', '背號', '打擊方向', '打擊結果', '出局數', '打點']

    return (
        <div id='history-container'>
            <table>
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
            </table>
        </div>
    )
}

export default HistoryArea;