const randomPickListIndex = (total, count) => {
    let numbers = []

    if (total <= count) {
        for (var i = 0; i < total; i++){
            numbers.push(i)
        }
        return numbers
    }

    while (numbers.length < count) {
        const num = Math.floor(Math.random() * (total + 1))
        if (!numbers.includes(num)) {
            numbers.push(num)
        }
    }

    return numbers
}

const randomNum = (total) => {
    const num = Math.floor(Math.random() * (total))
    return num
}

module.exports = { randomNum, randomPickListIndex }