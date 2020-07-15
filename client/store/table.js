
export const state = () => ({
    refresh: false,
    search: '',
    paginateGoInside: false,
    paginateGoOutside: false,
})

export const mutations = {
    refreshStop: (state) => {
        state.refresh = false
    }, refreshStart: (state) => {
        state.refresh = true
    },
    setSearch(state, search) {
        state.search = search
    },
    changePaginateGoInside(state) {
        state.paginateGoInside = !state.paginateGoInside
    },
    changePaginateGoOutside(state) {
        state.paginateGoOutside = !state.paginateGoOutside
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
    },
    changePaginateGoInside(vuexContext) {
        vuexContext.commit("changePaginateGoInside")
    },
    changePaginateGoOutside(vuexContext) {
        vuexContext.commit("changePaginateGoOutside")
    }
}

export const getters = {
    refresh(state) {
        return state.refresh
    },
    search(state) {
        return state.search
    },
    changePaginateGoInside(state) {
        return state.paginateGoInside
    },
    changePaginateGoOutside(state) {
        return state.paginateGoOutside
    }
}
