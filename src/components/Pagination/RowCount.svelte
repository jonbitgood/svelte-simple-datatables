<script>
	import { key } from '../../key.js'
	import { getContext } from 'svelte'

	const { options, pageNumber, rowCount } = getContext(key)
	$: start = $pageNumber * $options.rowsPerPage - $options.rowsPerPage + 1
	$: end = Math.min($pageNumber * $options.rowsPerPage, $rowCount)
	$: rows = $rowCount
</script>

{start}-{end}/{rows}