const moment = require('jalali-moment')

// فرم کلی تاریخ مورد استفده در برنامه
const Date = {
    date: '',
    time: '',
    timeWithSecond: '',
    year: '',
    month: '',
    hours: '',
    day: '',
    currentMinute: '',
    currentSecond: '',
}

// برگداندن تاریخ و زمان حال حاضر
exports.Now = () => {
    const m = moment().locale('fa')
    Date.date = m.format('YYYY/MM/DD')
    Date.time = m.format('HH:mm')
    Date.timeWithSecond = m.format('HH:mm:ss')
    Date.year = m.format('YYYY')
    Date.month = m.format('MM')
    Date.day = m.format('DD')
    Date.hours = m.format('HH')
    Date.currentMinute = m.format('mm')
    Date.currentSecond = m.format('ss')
    return Date
}
