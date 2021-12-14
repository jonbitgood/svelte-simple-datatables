<script>
	import { key } from './key.js'
	import { getContext } from 'svelte'

	export let ref = ''
	export let classList = ''

	const { options, pageNumber, columns, globalFilters } = getContext(key)

	const search = (value) => {
		pageNumber.set(1)
		globalFilters.set(value)
		columns.redraw()
	}
</script>

<input
	class={classList}
	type="text"
	placeholder={$options.labels.search}
	on:input={(e) => search(e.target.value)}
	{ref}
/>
