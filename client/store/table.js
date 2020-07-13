
export const state = () => ({
    refresh: false,
    search: ''
})

export const mutations = {
    refreshStop: (state) => {
        state.refresh = false
    }, refreshStart: (state) => {
        state.refresh = true
    },
    setSearch(state, search) {
        state.search = search
    }
}

export const actions = {
    refreshStop: (vuexContext) => {
        vuexContext.commit('refreshStop')
    },
    refreshStart: (vuexContext) => {
        vuexContext.commit('refreshStart')
    },
    setSearch(vuexContext, search) {
        vuexContext.commit('setSearch', search)

    }
}

export const getters = {
    refresh(state) {
        return state.refresh
    },
    search(state) {
        return state.search
    }
}
