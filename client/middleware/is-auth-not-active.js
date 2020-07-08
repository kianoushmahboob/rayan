import isActive from './is-active'

export default function (context) {
    if (!context.store.getters['login/isAuthenticated']) {
        context.redirect("/login");
    }
}