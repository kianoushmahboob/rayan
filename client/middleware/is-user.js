export default function(context) {
    if (!context.store.getters['login/isUser']()) {
        context.redirect("/profile");
    }
}