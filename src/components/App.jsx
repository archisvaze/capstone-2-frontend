import React from 'react'
import { BrowserRouter} from 'react-router-dom'
import Header from './Header'
import AnimnatedRoutes from './AnimnatedRoutes'




function App() {
  return (
    <BrowserRouter>
      <Header />
      <AnimnatedRoutes />
    </BrowserRouter>

  )
}
export default App;
