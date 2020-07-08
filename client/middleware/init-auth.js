export default function (context) {
    context.store.dispatch('login/initAuth', context.req)
}