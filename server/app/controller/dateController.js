const autoBind = require('auto-bind')
const moment = require('jalali-moment')

class DateController {
    constructor() {
        autoBind(this)
        this.currentDate = null
        this.currentTime = null
        this.currentYear = null
        this.currentMonth = null
        this.currentDay = null
        this.currentHour = null
        this.currentMinute = null

        this.initProperties()
        this.Date = {
            date: this.currentDate,
            time: this.currentTime
        }
    }

    initProperties() {
        const m = moment().locale('fa')
        this.currentDate = m.format('YYYY/MM/DD')
        this.currentTime = m.format('HH:mm')
        this.currentYear = m.format('YYYY')
        this.currentMonth = m.format('MM')
        this.currentDay = m.format('DD')
        this.currentHour = m.format('HH')
        this.currentMinute = m.format('mm')
    }
}

module.exports = DateController

