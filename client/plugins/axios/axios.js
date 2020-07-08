export default function ({ $axios, redirect, store }) {

    $axios.onError(error => {

    })
    $axios.setBaseURL(process.env.SERVER_BASE_URL)

    $axios.onResponse((response) => {
        if (response.data.date) {
            store.dispatch("date/setDate", response.data.date);
        }
    })
}