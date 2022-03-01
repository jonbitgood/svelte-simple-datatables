<script>
    import RangeSlider from "svelte-range-slider-pips";
    import { key } from './key.js'
	import { getContext } from 'svelte'
	const { id, options, columns } = getContext(key)

</script>
{#if options.get().filters.length > 0}

    <div class="p-8">
{#each options.get().filters as filter}
{#each $columns as column}
    {#if column.name === filter.key}
        <div class="pt-4">
    {#if filter.type === 'select'}
        {#if filter.label}
        <label for={column.key} class="block text-sm font-medium text-gray-700"> {filter.label} </label>
        {/if}
        <select id={column.key} on:change={(e) => columns.filter(column.key, e.target.value, filter.operation)}  class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md dark:bg-gray-900">
            {#each filter.options as option}
                <option value="{option.value}">{option.label}</option>
            {/each}
        </select>
    {/if}

    {#if filter.type === 'slider'}

    {#if filter.label}
    <div class="block text-sm font-medium text-gray-700"> {filter.label} </div>
    {/if}

        <RangeSlider on:change={(e) => {
            columns.filter(column.key, filter.values, filter.operation)
            }} bind:values={filter.values} min={filter.min} max={filter.max} pips all='label' pipstep={filter.step} />
    {/if}
</div>
    {/if}
{/each}
{/each}
</div>

{/if}