import { useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Upload from './components/Upload/Upload.jsx';
import Annotator from './components/Annotator/Annotator.jsx'
import Gallery from './components/Annotator/Gallery/Gallery.jsx';
import Canvas from './components/Annotator/Canvas/Canvas.jsx';
import { Box } from '@mui/material';
import { ThemeProvider } from '@mui/material';
import theme from './setup/Theme.jsx';

function App() {

  return (
    <Router>
      <ThemeProvider theme={theme}>
      <Box sx={{ color:'black' }}>
        <Switch>
          <Route exact path='/'>
            <Upload />
          </Route>
          <Route exact path='/annotate'>
            {/* <div style={{display: 'flex'}}> */}
              <Annotator />
              {/* <Gallery /> */}
              {/* <Canvas /> */}
            {/* </div> */}
          </Route>
        </Switch>
      </Box>
      </ThemeProvider>
    </Router>
  )
}

export default App
