// convert Date to String
export const dateToString = (date) => {
    return date.toLocaleString("en-US")
}

// convert String to Date
export const stringToDate = (str) => {
    return new Date(str)
}

// get String of current time
export const getCurrentTimeStr = () => {
    return dateToString(new Date())
}

// Add (Double)hourOffset to (String)baseTime, get new (String)time
export const getNewTimeStr = (baseTimeStr, hourOffset) => {
    console.log(baseTimeStr, hourOffset)
    const date = stringToDate(baseTimeStr);
    console.log(date)
    date.setTime(date.getTime() + 1000 * 60 * Math.round(60 * hourOffset))
    console.log(dateToString(date))
    return dateToString(date)
}

// Check if timeStrA smaller than timeStrB
export const smallerThan = (timeStrA, timeStrB) => {
    return stringToDate(timeStrA) < stringToDate(timeStrB)
}