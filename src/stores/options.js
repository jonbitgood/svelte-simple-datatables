import { writable } from 'svelte/store'
import { key } from '../key.js'
import { getContext, setContext } from 'svelte'

const getOptions = () => {
    const createOptions = () => {
        const {subscribe, set } = writable({
            sortable: true,
            pagination: true,
            rowsPerPage: 50,
            columnFilter: false,
            scrollY: true,
            labels: {
                search: 'Search...',
                filter: 'Filter',
                noRows: 'No entries to found',
                info: 'Showing {start} to {end} of {rows} entries',
                previous: 'Previous',
                next: 'Next',
            },
            filters: {}
        })
        return {
            subscribe, set, 
            get: () => {
                let $store
                options.subscribe(store => $store = store)
                return $store
            },
            update: (opt) => {
                opt.labels = opt.labels ? opt.labels : {}
                const labels = {
                    search:   typeof opt.labels.search   === 'string' ? opt.labels.search   : 'Search...',
                    filter:   typeof opt.labels.filter   === 'string' ? opt.labels.filter   : 'Filter',
                    noRows:   typeof opt.labels.noRows   === 'string' ? opt.labels.noRows   : 'No entries to found',
                    info:     typeof opt.labels.info     === 'string' ? opt.labels.info     : 'Showing {start} to {end} of {rows} entries',
                    previous: typeof opt.labels.previous === 'string' ? opt.labels.previous : 'Previous',
                    next:     typeof opt.labels.next     === 'string' ? opt.labels.next     : 'Next',
                }

                opt.filters = opt.filters ? opt.filters : {}

                const parsed = {
                    sortable:     typeof opt.sortable       === 'boolean' ? opt.sortable      : true,
                    pagination:   typeof opt.pagination     === 'boolean' ? opt.pagination    : true,
                    rowsPerPage:  typeof opt.rowsPerPage    === 'number'  ? opt.rowsPerPage   : 50,
                    columnFilter: typeof opt.columnFilter   === 'boolean' ? opt.columnFilter  : false, 
                    scrollY:      typeof opt.scrollY        === 'boolean' ? opt.scrollY       : true, 
                    css:          typeof opt.css            === 'boolean' ? opt.css           : true, 
                    labels: labels,
                    filters: opt.filters
                }
                options.set(parsed)
            }
        }
    }    
    const options = createOptions();
    return options

}

export const init_module = () => {
    const ctx = getContext(key);
	const options = getOptions();
	setContext(key, {...ctx, options});
}
