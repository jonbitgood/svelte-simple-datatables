<script>
	import { key } from './key.js'
	import { getContext } from 'svelte'

	const { options, pageNumber, rowCount, datatableWidth } = getContext(key)
	$: start = $pageNumber * $options.rowsPerPage - $options.rowsPerPage + 1
	$: end = Math.min($pageNumber * $options.rowsPerPage, $rowCount)
	$: rows = $rowCount
	$: info = $options.labels.info
		.replace('{start}', `<b>${start}</b>`)
		.replace('{end}', `<b>${end}</b>`)
		.replace('{rows}', `<b>${rows}</b>`)
</script>

<aside>
	{#if $datatableWidth > 600}
		{#if rows > 0}
			{@html info}
		{:else}
			{@html $options.labels.noRows}
		{/if}
	{:else}
		{@html `<b>${start}</b>-<b>${end}</b>/<b>${rows}</b>`}
	{/if}
</aside>