// convert Date to String
export const dateToString = (date) => {
    return date.toLocaleString()
}

// convert String to Date
export const stringToDate = (str) => {
    const dateTime = str.split(',')
    const dateArr = dateTime[0].split('/')
    const timeArr = dateTime[1].split(':')
    return new Date(dateArr[2], dateArr[1], dateArr[0], timeArr[0], timeArr[1], timeArr[2])
}

// get String of current time
export const getCurrentTimeStr = () => {
    return dateToString(new Date())
}

// Add (Double)hourOffset to (String)baseTime, get new (String)time
export const getNewTimeStr = (baseTimeStr, hourOffset) => {
    const date = stringToDate(baseTimeStr);
    date.setTime(date.getTime() + 1000 * 60 * Math.round(60 * hourOffset))
    return dateToString(date)
}

// Check if timeStrA smaller than timeStrB
export const smallerThan = (timeStrA, timeStrB) => {
    return stringToDate(timeStrA) < stringToDate(timeStrB)
}