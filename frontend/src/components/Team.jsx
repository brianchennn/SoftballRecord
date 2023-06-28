const HomeTeam = ({ isBottom, teamname }) => {
    if (isBottom === 1) {
        return (
            <td style={{ color: "red" }}>{teamname}</td>
        )
    } else {
        return (
            <td style={{ color: "black" }}>{teamname}</td>
        )
    }
}

const GuestTeam = ({ isBottom, teamname }) => {
    if (isBottom === 1) {
        return (
            <td style={{ color: "black" }}>{teamname}</td>
        )
    } else {
        return (
            <td style={{ color: "red" }}>{teamname}</td>
        )
    }
}

export { HomeTeam, GuestTeam };