
export const state = () => ({

    page: 1,
    oldPage: 1,
})

export const mutations = {
 setPage(state, payLoad) {
     
     state.page = payLoad
     console.log('setPage store', state.page)
 },
 setOldPage(state, payLoad) {
     
    state.oldPage = payLoad
    console.log('setPage store', state.page)
}

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
    setPage(VueContext, payLoad) {
        VueContext.commit('setPage', payLoad)
    },

    setOldPage(VueContext, payLoad) {
        VueContext.commit('setOldPage', payLoad)

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

getPage(state) {
    return state.page
},
getOldPage(state) {
    return state.page
},

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
