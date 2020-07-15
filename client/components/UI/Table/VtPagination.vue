<template>

        <!-- پیجینیشن بالای هدر  -->
        <v-pagination
            v-if="props.totalPages>1"
                :length="props.totalPages"
                v-model="props.page"
                total-visible="10"
                color="red darken-3"
                @input="click"/>

	<!-- پیجینیشن بالای هدر  -->
	<v-pagination
		v-if="props.totalPages>1"
		:length="props.totalPages"
		v-model="props.page"
		total-visible="10"
		color="red darken-3"
		@input="page => props.setPage(page)"
	/>

</template>

<script>
	import Pagination from "vue-pagination-2";


    export default {
        name: "VtPagination",
        components: {
            Pagination
        },
        data() {
            return {
                paginate: 1
            }
        },
        props: ['props'],
        computed: {
            page() {
					return this.$store.getters["table/getPage"];
            }
        },
        methods: {
            click(e) {
					this.$store.dispatch("table/setPage", e);
                this.props.setPage(e)
                                                // console.log('vpaginae table page', e)

            }
        },
        watch: {
            page(newValue) {
                // this.paginate = newValue
                console.log('aaaaaaaaaaaaa', newValue)
                                // this.props.setPage(newValue)
                                // console.log('vpaginae table page', newValue)
                                //                 this.props.setPage(newValue)


            }
        }
    }

	export default {
		name: "VtPagination",
		components: {
			Pagination
		},
		props: ["props"],
		data() {
			return {
				paginate: {
					pages: [],
					currentPage: 0
				}
			};
		},
		computed: {
			paginateGoOutside() {
				return this.$store.getters["table/changePaginateGoOutside"];
			},
			paginateGoInside() {
				return this.$store.getters["table/changePaginateGoInside"];
			}
		},
		watch: {
			"props.page"(currentPage, oldPage) {
				this.paginate.currentPage = currentPage;
			},
			paginateGoOutside(val) {
				const newPage = this.paginate.pages.pop();
				this.props.setPage(newPage);
			},
			paginateGoInside(val) {
				this.paginate.currentPage =
					this.paginate.currentPage == 0 ? 1 : this.paginate.currentPage;
				this.paginate.pages.push(this.paginate.currentPage);
				this.props.setPage(1);
			}
		}
	};

</script>