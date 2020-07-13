import Vue from 'vue'
import Input from './../components/UI/Input'
import Datapicker from './../components/UI/Datapicker'
import Select from './../components/UI/Select'
import Checkbox from './../components/UI/Checkbox'
import Textarea from './../components/UI/Textarea'
import Button from './../components/UI/Button'


// table components 
import Table from 'vue-tables-2'

import VtDataTable from '../components/UI/Table/VtDataTable.vue'
import VtTable from '../components/UI/Table/VtTable'
import VtGenericFilter from '../components/UI/Table/VtGenericFilter'
import VtSortControl from '../components/UI/Table/VtSortControl'
import VtPagination from '../components/UI/Table/VtPagination'
import VtPerPageSelector from '../components/UI/Table/VtPerPageSelector'
import VtTableHeading from '../components/UI/Table/VtTableHeading'
import VtFiltersRow from '../components/UI/Table/VtFiltersRow'

const components = { Input, Datapicker, Select, Checkbox, Textarea, Button, Table }

Vue.use(Table.ClientTable, {}, false, 'bootstrap4', {
  table: VtTable,
  genericFilter: VtGenericFilter,
  dataTable: VtDataTable,
  sortControl: VtSortControl,
  pagination: VtPagination,
  perPageSelector: VtPerPageSelector,
  tableHeading: VtTableHeading,
  filtersRow: VtFiltersRow
})

Object.entries(components).forEach(([name, component]) => {
  Vue.component(name, component)
})
