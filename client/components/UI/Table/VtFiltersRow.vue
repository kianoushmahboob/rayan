<template>
	<tr class="VueTables__filters-row">
		<th v-if="props.hasChildRow && props.opts.childRowTogglerFirst && props.opts.showChildRowToggler"></th>
		<!-- هدر های جدول  -->
		<!-- داخل جدول گرفته میشود  heading  کلاس های هدر از  -->
		<th v-for="(column, index) in props.columns" :key="index" :class="getClass[index]">
			<component v-if="props.filterable(column)" :is="props.filterType(column)" :column="column" />
			<vnodes :vnodes="props.slots[`filter__${column}`]" />
		</th>
		<th
			v-if="props.hasChildRow && !props.opts.childRowTogglerFirst && props.opts.showChildRowToggler"
		>
			<span>head4</span>
		</th>
	</tr>
</template>

<script>
	import { mapGetters } from "vuex";
	import VtDateFilter from "vue-tables-2/compiled/components/VtDateFilter";
	import VtListFilter from "vue-tables-2/compiled/components/VtListFilter";
	import VtTextFilter from "vue-tables-2/compiled/components/VtTextFilter";

	export default {
		name: "VtFiltersRow",
		props: ["props"],
		data() {
			return {
				getClass: []
			};
		},
		components: {
			VtDateFilter,
			VtListFilter,
			VtTextFilter,
			vnodes: {
				functional: true,
				render: (h, ctx) => ctx.props.vnodes
			}
		},
		watch: {
			// getClass کردن اطلاعات در ارایه push خواندن کلاس های هدر و
			"props.opts"(newVal) {
				for (const key in this.props.opts.headings) {
					this.getClass.push(key);
				}
			}
		}
	};
</script>
<style lang="scss" scoped>
	tr th div input {
		width: 95%;
		background-color: #f2f2f2;
		padding: 10px;
		border-radius: 5px;
		box-shadow: inset 1px 1px 3px #000;
	}
</style>