export default function(context) {
    return context.store.getters['login/isUserActive']()
}