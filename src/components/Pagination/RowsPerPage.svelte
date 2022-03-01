<script>
	import { key } from '../../key.js'
	import { getContext } from 'svelte'

	const { options } = getContext(key)

</script>

<select 
	class="relative py-2 pl-3 pr-10 text-left transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md cursor-default focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5" 
	bind:value={$options.rowsPerPage}>
	<option value="9999999999">All</option>
	<option value="25">25</option>
	<option value="50">50</option>
	<option value="100">100</option>
</select>
