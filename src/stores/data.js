import { writable, derived } from 'svelte/store'
import { getContext, setContext } from 'svelte'
import { key } from '../key.js'
import Fuse from "fuse.js"

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

			const engine = new Fuse($data, {
				shouldSort: true,
				includeMatches: true,
				threshold: 0.3, // At what point does the match algorithm give up. A threshold of 0.0 requires a perfect match (of both letters and location), a threshold of 1.0 would match anything.
				location: 0, // Determines approximately where in the text is the pattern expected to be found
				distance: 50, // Determines how close the match must be to the fuzzy location (specified by location). An exact letter match which is distance characters away from the fuzzy location would score as a complete mismatch. A distance of 0 requires the match be at the exact location specified. A distance of 1000 would require a perfect match to be within 800 characters of the location to be found using a threshold of 0.8
				maxPatternLength: 12,
				minMatchCharLength: 1,
				keys: Object.keys($data[0])
			})

			// Search Logic - Global
			if ($globalFilters) {
				$data = engine.search($globalFilters.toString().toLowerCase())
					.map(result => result.item)
				//$data = results.map(result => result.item)

//				$data = $data.filter( item => {
//					return Object.keys(item).some( k => {
//						return item[k].toString().toLowerCase().indexOf($globalFilters.toString().toLowerCase()) > -1
//					})
//				})
			}

			if ($localFilters.length > 0) {
				$localFilters.forEach(filter => {

					console.log(filter)
					
					if(filter.operation == 'range') {
						// Filter data for values between min and max
						return $data = $data.filter( item => (filter.key(item) > filter.value[0] && filter.key(item) < filter.value[1]))
					}

					if(filter.operation == 'regex') {
						return $data = $data.filter( item => (filter.key(item).match(filter.value)))
					}

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
