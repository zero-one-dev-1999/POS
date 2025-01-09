import Avatar from './components/avatar'
import Autocomplete from './components/autocomplete'
import Button from './components/button'
import Card from './components/card'
import Checkbox from './components/checkbox'
import CssBaseline from './components/css-baseline'
import Dialog from './components/dialog'
import List from './components/list'
import Pagination from './components/pagination'
import Stack from './components/stack'
import SvgIcon from './components/svg-icon'
import Table from './components/table'
import TextField from './components/textfield'
import Typography from './components/typography'
import Tabs from './components/tabs'
import Tooltip from './components/tooltip'
import { Theme } from '@mui/material'
import { merge } from 'lodash'

export const componentsOverrides = (theme: Theme) =>
	merge(
		Avatar(theme),
		Autocomplete(theme),
		Button(theme),
		Card(theme),
		Checkbox(theme),
		CssBaseline(),
		Dialog(theme),
		List(theme),
		Pagination(theme),
		Stack(),
		SvgIcon(),
		Table(theme),
		TextField(theme),
		Typography(theme),
		Tabs(theme),
		Tooltip(theme),
	)
