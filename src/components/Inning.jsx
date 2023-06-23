const Inning = ({ currentInning, targetInning }) => {
    let style = {};
    if (currentInning === targetInning) {
        style = { color: "red" };
    } else {
        style = { color: "black" };
    }
    return (
        <td width="100px">
            <span style={style}>{targetInning}</span>
        </td>
    );
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
    );
}

export default InningsRow;
