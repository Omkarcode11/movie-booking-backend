let seatValidation = (string) => {
    if (string.length == 2) return seat(string)
    else if (string.length == 5) {
        let str = string.split("-")
        return seat(str[0]) && seat(str[1]) && str[0][0] == str[1][0] && str[0][1] < str[1][1]
    }
    return false

}

function seat(string) {
    let seat = string.split("")
    if (isNaN(seat[0]) && !isNaN(seat[1] && seat[1] > 0 && seat[1] < 10 && seat[0] >= "A" && seat[0] <= "Z")) return true
    else return false

}