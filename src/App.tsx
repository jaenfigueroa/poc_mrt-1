import Table from './Table'
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
})

const App = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Table />
    </ThemeProvider>
  )
}

export default App
