import { writable, derived } from 'svelte/store'
//import { options } from './options.js'
//import { pageNumber, rowCount } from './state.js'
//import { globalFilters, localFilters } from './filters.js'
import { getContext, setContext } from 'svelte'
import { key } from '../key.js'


const createData = () => {
	const { subscribe, set, update } = writable([])
	return {
		subscribe, set,
		sort: (key, direction) => update(store => {
			try {
				store.sort((a, b) => {
					if (typeof(key(b)) === "boolean") {
						return key(a) ? ((direction == 'asc') ? 1 : -1) : ((direction == 'desc') ? 1 : -1)
					} else {
						return (direction == 'asc') ? key(b).localeCompare(key(a)) : key(a).localeCompare(key(b))
					}
				})
				return store
			} catch (e) {
				return store.sort( (a, b) => parseFloat(key(b)) - parseFloat(key(a)))
			}
		}),
	}
}


function getData(){
	const {options, pageNumber, rowCount, globalFilters, localFilters} = getContext(key);

	const data = createData();

	const filtered = derived(
		[data, globalFilters, localFilters],
		([$data, $globalFilters, $localFilters]) => {
			if ($globalFilters) {
				$data = $data.filter( item => {
					return Object.keys(item).some( k => {
						return item[k].toString().toLowerCase().indexOf($globalFilters.toString().toLowerCase()) > -1
					})
				})
			}
			if ($localFilters.length > 0) {
				$localFilters.forEach(filter => {
					return $data = $data.filter( item => filter.key(item).toString().toLowerCase().indexOf(filter.value.toString().toLowerCase()) > -1)
				})
			}
			rowCount.set($data.length)
			return $data
		} 	
	)	

	const rows = derived(
		[filtered, options, pageNumber],
		([$filtered, $options, $pageNumber]) => {
			if (!$options.pagination) {
				return $filtered
			}
			return $filtered.slice( ($pageNumber - 1) * $options.rowsPerPage, $pageNumber * $options.rowsPerPage) 
		} 
	)

	return {data, filtered, rows}

}

export function init_module(){
	const ctx = getContext(key);
	const {data, filtered, rows} = getData();

	setContext(key, {...ctx, data, filtered, rows});

}
