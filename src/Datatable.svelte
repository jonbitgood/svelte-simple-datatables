<script>
	import SearchInput from './SearchInput.svelte'
	import Menu from './components/Menu.svelte'
	import PaginationRowsPerPage from './components/Pagination/RowsPerPage.svelte'
	import PaginationRowCount from './components/Pagination/RowCount.svelte'
	import PaginationButtons from './components/Pagination/PaginationButtons.svelte'
	import { onMount, onDestroy } from 'svelte'
	import { setContext, getContext } from 'svelte'
	import { key } from './key.js'
	import { initContext } from './createContext.js'
	import { getDataTable } from './datatable.js'
	import ColumnFilterInputs from './ColumnFilterInputs.svelte'

	export let data = []
	export let classList = ''
	export let rowsPerPage = 25
	export let filters = {}
	export let perPageOptions = [25, 50, 100]

	const settings = {
		sortable: true,
		pagination: true,
		rowPerPage: rowsPerPage,
		columnFilter: true,
		scrollY: false,
		labels: {
			info: '{start} - {end} / {rows}', // $t("table_info", {rows: rows}), //
			previous: '<svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" /></svg>',
			next: '<svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" /></svg>'
		},
		filters: filters
	}

	//Initialize context for all stores.
	setContext(key, {})
	initContext()

	const { rows } = getContext(key)
	export const dataRows = rows

	const datatable = getDataTable()
	const { id, options } = getContext(key)

	
	$: {
		datatable.setRows(data)
		options.update(settings)
	}

	onMount(() => datatable.init())
	onDestroy(() => datatable.reset())
</script>

<section
	id={$id}
	class="datatable {classList}"
	class:scroll-y={$options.scrollY}
>

<div class="mt-4 flex rounded-md">
	<div class="relative w-1/2 mx-auto">
	<div class="relative flex items-stretch grow focus-within:z-10">
	  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-300 dark:text-gray-600">
		<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
		  <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
		</svg>
	  </div>
	  <SearchInput classList="focus:ring-secondary-500 focus:border-secondary-500 block w-full rounded pl-10 sm:text-sm border-gray-300 text-gray-700 dark:bg-gray-300" />
	</div>
	</div>
  </div>

  	<ColumnFilterInputs />
  
	<div class="dt-table flex flex-row">
		<table class="relative w-full">
			<slot />
		</table>
	</div>

	<div class="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-100 px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
		<div class="flex-1 flex items-center justify-between text-sm">
			<PaginationRowsPerPage />
			<nav class="relative z-0 inline-flex rounded-md -space-x-px" aria-label="Pagination">
			  <PaginationButtons />
			</nav>
		</div>
	  </div>

</section>

<style>

table tbody td {
	@apply px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300;
}

table thead {
	@apply bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-400 h-12;
}

table table thead th {
	@apply relative px-6 py-3 text-left text-xs dark:bg-gray-900 text-gray-500 dark:text-gray-100 uppercase tracking-wider;
}

table .even {
	@apply bg-gray-200 dark:bg-gray-600;
}

table thead th:before {
	content: '▲';
	position: absolute;
	opacity: 0.5;
	left: 7px;
	top: 11px;
}

table thead th:after {
	content: '▼';
	position: absolute;
	opacity: 0.5;
	left: 7px;
	top: 21px;
}

table thead th.desc:before,
table thead th.asc:after {
	opacity: 1;
}
</style>
