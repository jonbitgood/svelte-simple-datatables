<script>
	import { key } from '../../key.js'
	import { getContext } from 'svelte'

	const { options, rowCount, pageNumber, datatableWidth, columns } = getContext(key)
	export let ref = ''
	export let classList = ''
	$: pageCount = Array.from(
		Array(Math.ceil($rowCount / $options.rowsPerPage)).keys()
	)
	const slice = (arr, page) => {
		if(arr !== undefined) {
			if (page < 5) {
				return arr.slice(0, 5)
			} else if (page > arr.length - 4) {
				return arr.slice(arr.length - 5, arr.length)
			}
			return arr.slice(page - 2, page + 1)
		}
	}
	$: buttons = slice(pageCount, $pageNumber)
	const setPage = (number) => {
		pageNumber.set(number)
		columns.draw()
	}
</script>
{#if pageCount}
{#if $datatableWidth > 600}
	<section class="flex {classList}" {ref}>
		<button
			class:disabled={$pageNumber === 1}
			on:click={() => setPage($pageNumber - 1)}
		>
			{@html $options.labels.previous}
		</button>
		<button class:active={$pageNumber === 1} on:click={() => setPage(1)}>
			1
		</button>
		{#if pageCount.length > 6 && $pageNumber >= 5}
			<button class="ellipse">...</button>
		{/if}

		{#each buttons as n}
			{#if n > 0 && n < pageCount.length - 1}
				<button
					class:active={$pageNumber === n + 1}
					on:click={() => setPage(n + 1)}
				>
					{n + 1}
				</button>
			{/if}
		{/each}

		{#if pageCount.length > 6 && $pageNumber <= pageCount.length - 3}
			<button class="ellipse">...</button>
		{/if}

		{#if pageCount.length > 1}
			<button
				class:active={$pageNumber === pageCount.length}
				on:click={() => setPage(pageCount.length)}
			>
				{pageCount.length}
			</button>
		{/if}

		<button
			class="text"
			class:disabled={$pageNumber === pageCount.length}
			on:click={() => setPage($pageNumber + 1)}
		>
			{@html $options.labels.next}
		</button>
	</section>
{:else}
	<section
		class="flex mobile {classList}"
		class:css={$options.css}
	>
		<button class="rounded-l-md" class:disabled={$pageNumber === 1} on:click={() => setPage(1)}
			>&#10092;&#10092;</button
		>
		<button
			class:disabled={$pageNumber === 1}
			on:click={() => setPage($pageNumber - 1)}>&#10094;</button
		>
		<button
			class:disabled={$pageNumber === pageCount.length}
			on:click={() => setPage($pageNumber + 1)}>&#10095;</button
		>
		<button
			class="rounded-r-md"
			class:disabled={$pageNumber === pageCount.length}
			on:click={() => setPage(pageCount.length)}>&#10093;&#10093;</button>
	</section>
{/if}
{/if}

<style>
section button:first-child {
	@apply rounded-l-md;
}

section button:last-child {
	@apply rounded-r-md;
}

button {
	@apply relative inline-flex items-center bg-white dark:bg-gray-600 border-gray-300 text-gray-500 dark:text-gray-300 hover:bg-gray-50 px-4 py-2 border text-sm
}

button.active {
	@apply z-10 text-gray-900 dark:text-gray-100 font-bold;
}
</style>