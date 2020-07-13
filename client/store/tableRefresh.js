
export const state = () => ({
    refresh: false,
    refreshButtonClicked: false
})

export const mutations = {
    refreshStop: (state) => {
        state.refresh = false
    }, refreshStart: (state) => {
        state.refresh = true
    },
    refreshButtonClicked: (state) => {
        state.refreshButtonClicked = !state.refreshButtonClicked
    }

}

export const actions = {
    refreshStop: (vuexContext) => {
        vuexContext.commit('refreshStop')
    },
    refreshStart: (vuexContext) => {
        vuexContext.commit('refreshStart')
    },
    refreshButtonClicked: (vuexContext) => {
        vuexContext.commit('refreshButtonClicked')
    }
}

export const getters = {
    refresh(state) {
        return state.refresh
    },
    refreshButtonClicked(state) {
        return state.refreshButtonClicked
    }
}
