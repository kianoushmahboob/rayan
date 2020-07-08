<template>
        <!-- پیجینیشن بالای هدر  -->
        <v-pagination
            v-if="props.totalPages>1"
                :length="props.totalPages"
                v-model="props.page"
                total-visible="10"
                color="red darken-3"
                @input="page => props.setPage(page)"/>
</template>

<script>
    import Pagination from 'vue-pagination-2'

    export default {
        name: "VtPagination",
        components: {
            Pagination
        },
        props: ['props']
    }
</script>