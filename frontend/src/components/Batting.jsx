const OutBoard = ({ history }) => {
    var outs = 0
    if (history.length === 0) {
        outs = 0
    } else {
        outs = history.at(-1).currentOuts
    }

    outs = (outs >= 3) ? 0 : outs


    const O1 = Array.from({ length: outs }, (_, index) => index)
    const O2 = Array.from({ length: 2 - outs }, (_, index) => index)
    return (
        <div id="outs-container">
            <div>
                <h3 align="center">
                    Outs
                </h3>
                {O1.map((op, index) => (
                    <div key={index} className="out-sign out"> </div>
                ))}
                {O2.map((op, index) => (
                    <div key={index + 3} className="out-sign no-out"></div>
                ))}
            </div>
        </div>
    )
}



const BattingOrder = ({ setBattingOrder }) => {
    const Options = Array.from({ length: 11 }, (_, index) => index + 1)

    const handleChange = event => setBattingOrder(event.target.value)

    return (
        <div className="input-field">
            <label>棒次: </label>
            <select onChange={handleChange}>
                <option></option>
                {Options.map((op, index) => (
                    <option key={index}>{op}</option>
                ))}
            </select>
        </div>
    )
}

const PlayerNumber = ({ setPlayerNumber }) => {

    const handleChange = event => setPlayerNumber(event.target.value)

    return (
        <div className="input-field">
            <label>背號: </label>
            <input onChange={handleChange} />
        </div>
    )
}

const Direction = ({ setDirection }) => {
    const PositionCode = ['', '1 (投手)', '2 (捕手)', '3 (一壘)', '4 (二壘)', '5 (三壘)', '6 (游擊)', '7 (左外)', '8 (中外)', '9 (右外)', '10 (自由)'];

    const handleChange = event => setDirection(event.target.value)

    return (
        <div className="input-field">
            <label>打擊方向: </label>
            <select onChange={handleChange}>
                {PositionCode.map((position, index) => (
                    <option key={index}>
                        {position}
                    </option>
                ))}
            </select>
        </div>
    )
}

const BattingResult = ({ setBattingResult }) => {
    const Result = ['未定義', 'GO (滾地出局)', 'FO (飛球出局)', 'FC (野手選擇)', 'E (對手失誤)',
        'K (被三振)', 'BB (保送)', 'SF (高飛犧牲打)', '1B (一壘安打)', '2B (二壘安打)',
        '3B (三壘安打)', 'HR (全壘打)', 'DP (雙殺)', 'DP (雙殺得1分)', 'DP (雙殺得2分)'];

    const handleChange = event => setBattingResult(event.target.value)

    return (
        <div className="input-field">
            <label>打擊結果: </label>
            <select onChange={handleChange}>
                {Result.map((result, index) => (
                    <option key={index}>
                        {result}
                    </option>
                ))}
            </select>
        </div>
    )
}

const Outs = ({ setCurrentOuts }) => {
    const Result = [0, 1, 2, 3];

    const handleChange = event => setCurrentOuts(event.target.value)

    return (
        <div className="input-field">
            <label>出局: </label>
            <select onChange={handleChange}>
                {Result.map((result, index) => (
                    <option key={index}>
                        {result}
                    </option>
                ))}
            </select>
        </div>
    )
}

const Rbi = ({ setRbi }) => {
    const Result = [0, 1, 2, 3, 4];

    const handleChange = event => setRbi(parseInt(event.target.value))

    return (
        <div className="input-field">
            <label>打點: </label>
            <select onChange={handleChange}>
                {Result.map((result, index) => (
                    <option key={index}>
                        {result}
                    </option>
                ))}
            </select>
        </div>
    )
}

export { BattingOrder, PlayerNumber, Direction, BattingResult, Outs, Rbi, OutBoard };