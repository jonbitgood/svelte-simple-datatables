<script>
	import { key } from '../../key.js'
	import { getContext } from 'svelte'

	const { options, pageNumber, rowCount } = getContext(key)
	$: start = $pageNumber * $options.rowsPerPage - $options.rowsPerPage + 1
	$: end = Math.min($pageNumber * $options.rowsPerPage, $rowCount)
	$: rows = $rowCount
</script>

<label class="flex flex-row text-sm font-medium leading-5 text-gray-700">
	<span class="relative inline-flex items-center bg-white px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 dark:bg-gray-600 dark:text-gray-300">{start}-{end}/{rows}</span>
	<select 
		class="relative inline-flex items-center border border-gray-300 bg-white pl-4 pr-6 py-2 text-sm text-gray-500 hover:bg-gray-50 dark:bg-gray-600 dark:text-gray-300 rounded-md" 
		bind:value={$options.rowsPerPage}>
		<option value="25">25</option>
		<option value="50">50</option>
		<option value="100">100</option>
	</select>
</label>