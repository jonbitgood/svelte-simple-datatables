<script>
    import { key } from './key.js'
	import { getContext } from 'svelte'
	const { options, columns } = getContext(key)
    
    export let selectedColumn
</script>


{#each $columns as column}
    {#if column.key == selectedColumn}
        <th class="filter" class:css={$options.css}>
            <input
                type="text"
                placeholder={$options.labels.filter}
                class="browser-default"
                on:input={(e) => columns.filter(column.key, e.target.value)}
            />
        </th>
    {:else}
        <th class="filter"></th>
    {/if}
{/each}