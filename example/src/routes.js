import Home from './routes/Home.svelte'
import Demo from './routes/Demo.svelte'
import Pagination from './routes/demo/Pagination.svelte'
import ColumnFilter from './routes/demo/ColumnFilter.svelte'
import Internationalization from './routes/demo/Internationalization.svelte'
import Expression from './routes/demo/Expression.svelte'
import ScrollY from './routes/demo/ScrollY.svelte'
import ScrollX from './routes/demo/ScrollX.svelte'
import Responsive from './routes/demo/Responsive.svelte'
import Css from './routes/demo/Css.svelte'
import Settings from './routes/Settings.svelte'
import GridLayout from './routes/test/GridLayout.svelte'
import LotsOfData from './routes/test/LotsOfData.svelte'
import MultipleDatatables from './routes/test/MultipleDatatables.svelte'
import NotFound from './routes/NotFound.svelte'

export const routes = {
    '/': Home,
    '/demo': Demo,
    '/demo/pagination': Pagination,
    '/demo/column-filter': ColumnFilter,
    '/demo/i18n': Internationalization,
    '/demo/expression': Expression,
    '/demo/scroll-y': ScrollY,
    '/demo/scroll-x': ScrollX,
    '/demo/responsive': Responsive,
    '/demo/css': Css,
    '/demo/*': NotFound,
    '/settings': Settings,
    '/test': GridLayout,
    '/test/grid-layout': GridLayout,
    '/test/lots-of-data': LotsOfData,
    '/test/multiple-dt': MultipleDatatables,
    '/*': NotFound
}