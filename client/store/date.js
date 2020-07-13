
export const state = () => ({
    currentDate: {
        date: '',
        time: '',
        timeWithSecond: '',
        year: '',
        month: '',
        day: '',
        hours: '',
        minute: '',
    }
})

export const mutations = {
    setDate: (state, date) => {
        state.currentDate = {...date}
    },
    
}

export const actions = {
    setDate: (vuexContext, date) => {
        vuexContext.commit('setDate', date)
    },
}

export const getters = {
    getCurrentDate(state) {
        return state.currentDate
    },
}
