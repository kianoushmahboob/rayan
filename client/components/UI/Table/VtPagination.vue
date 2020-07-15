<template>
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