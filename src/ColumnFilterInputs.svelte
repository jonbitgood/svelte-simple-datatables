<script>
    import Menu from './components/Menu.svelte'
    import { key } from './key.js'
	import { getContext } from 'svelte'
	const { id, options, columns } = getContext(key)

    let active_filters = []

</script>
<section aria-labelledby="filter-heading">
  <h2 id="filter-heading" class="sr-only">Filters</h2>
  <div class="relative z-10 bg-white border-b border-gray-200 pb-4">
    <div class="max-w-7xl mx-auto px-4 flex items-center justify-center pt-4 sm:px-6 lg:px-8">
       <div class="-mx-4 flex items-center">
         {#if options.get().filters.length > 0}
             {#each options.get().filters as filter}
                 {#each $columns as column}
                     {#if column.name === filter.key}
                     <Menu class="px-4 relative inline-block text-left">
                         <button slot="trigger" type="button" class="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900" aria-expanded="false">
                           <span>{filter.label}</span>
                           <svg class="flex-shrink-0 mr-4 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                             <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                           </svg>
                         </button>
                         <div slot="menu" class="origin-top-right absolute right-0 mt-2 bg-white rounded-md shadow-2xl p-4 ring-1 ring-black ring-opacity-5 focus:outline-none">
                           <form class="space-y-4">
                             <fieldset on:change={(e) => {columns.filter(column.key, e.target.value, filter.operation);}} class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md dark:bg-gray-900">
                                 {#each filter.options as option, index}
                                 <div class="flex items-center">
                                     <input id={column.name + index } name={column.key + '[]'} value={option.value} bind:checked={active_filters[column.name + index]} type="checkbox" class="h-4 w-4 border-gray-300 rounded text-primary-600 focus:ring-primary-500">
                                     <label for={column.name + index } class="ml-3 pr-6 text-sm font-medium text-gray-900 whitespace-nowrap"> {option.label} </label>
                                   </div>
                                 {/each}
                             </fieldset>
                           </form>
                         </div>
                       </Menu>
                     {/if}
                 {/each}
             {/each}
         {/if}
       </div>
    </div>
  </div>
<!--
  <div class="bg-gray-100">
    <div class="max-w-7xl mx-auto py-3 px-4 sm:flex sm:items-center sm:px-6 lg:px-8">
      <h3 class="text-xs font-semibold uppercase tracking-wide text-gray-500">
        Filters
        <span class="sr-only">, active</span>
      </h3>
      <div aria-hidden="true" class="hidden w-px h-5 bg-gray-300 sm:block sm:ml-4"></div>
      <div class="mt-2 sm:mt-0 sm:ml-4">
        {#each active_filters as active_filter}
        <div class="-m-1 flex flex-wrap items-center">
          <span class="m-1 inline-flex rounded-full border border-gray-200 items-center py-1.5 pl-3 pr-2 text-sm font-medium bg-white text-gray-900">
            <span>{active_filter}</span>
            <button type="button" class="flex-shrink-0 ml-1 h-4 w-4 p-1 rounded-full inline-flex text-gray-400 hover:bg-gray-200 hover:text-gray-500">
              <span class="sr-only">Remove filter for Objects</span>
              <svg class="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
                <path stroke-linecap="round" stroke-width="1.5" d="M1 1l6 6m0-6L1 7" />
              </svg>
            </button>
          </span>
        </div>
        {/each}
      </div>
    </div>
  </div>
-->
</section>