
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
}

export const actions = {
    setPage(VueContext, payLoad) {
        VueContext.commit('setPage', payLoad)
    },
    setOldPage(VueContext, payLoad) {
        VueContext.commit('setOldPage', payLoad)
    }
}

export const getters = {
getPage(state) {
    return state.page
},
getOldPage(state) {
    return state.page
},
}
