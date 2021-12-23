<script>
    import { key } from './key.js'
	import { getContext } from 'svelte'
	const { id, options, columns } = getContext(key)


</script>

{#each options.get().filters as filter}
{#each $columns as column}
    {#if column.name === filter.key}

    {#if filter.type === 'select'}
<select on:blur={(e) => columns.filter(column.key, e.target.value)}>
    {#each filter.options as option}
        <option value="{option.value}">{option.label}</option>
    {/each}
</select>
{/if}

    {/if}
{/each}


{/each}