<script>
	import SearchInput from './SearchInput.svelte'
	import PaginationRowCount from './PaginationRowCount.svelte'
	import PaginationButtons from './PaginationButtons.svelte'
	import { onMount, onDestroy } from 'svelte'
	import { setContext, getContext } from 'svelte'
	import { key } from './key.js'
	import { initContext } from './createContext.js'
	import { getDataTable } from './datatable.js'
	import { t, locale } from "$lib/i18n";

	export let data = []
	export let classList = ''
	export let rowsPerPage = 25

	const settings = {
		sortable: true,
		pagination: true,
		rowPerPage: rowsPerPage,
		columnFilter: true,
		scrollY: false,
		labels: {
			search: $t('table_search'),
			filter: $t('table_filter'),
			noRows: $t('table_no_rows'),
			info: '{start} - {end} / {rows}', // $t("table_info", {rows: rows}), //
			previous: '<svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" /></svg>',
			next: '<svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" /></svg>'
		},
		blocks: {
			searchInput: false,
			paginationButtons: false,
			paginationRowCount: false
		}
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

<div class="mt-4 flex rounded-md shadow-sm">
	<div class="relative w-1/2 mx-auto">
	<div class="relative flex items-stretch flex-grow focus-within:z-10">
	  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-300 dark:text-gray-600">
		<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
		  <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
		</svg>
	  </div>
	  <SearchInput classList="focus:ring-blue-500 focus:border-blue-500 block w-full rounded pl-10 sm:text-sm border-gray-300 text-gray-700 dark:bg-gray-300" />
	  <button type="button" class="-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
		<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
		</svg>
	  </button>
	</div>
	</div>
  </div>

	<div class="dt-table">
		<table>
			<slot />
		</table>
	</div>

	<div class="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-100 px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
		<div class="flex-1 flex items-center justify-between text-sm">
			<PaginationRowCount />
			<nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
			  <PaginationButtons />
			</nav>
		</div>
	  </div>

</section>
