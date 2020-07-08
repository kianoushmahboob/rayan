
export const state = () => ({
    refresh: false
})

export const mutations = {
    refreshStop: (state) => {
        state.refresh = false
    }, refreshStart: (state) => {
        state.refresh = true
    },

}

export const actions = {
    refreshStop: (vuexContext) => {
        vuexContext.commit('refreshStop')
    },
    refreshStart: (vuexContext) => {
        vuexContext.commit('refreshStart')
    },
}

export const getters = {
    refresh(state) {
        return state.refresh
    },
}
