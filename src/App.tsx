import React from 'react';
import Navbar from './component/Navbar';
import { BrowserRouter as Router, Switch, Route, useHistory  } from 'react-router-dom'
import Current from './component/Current'
import HistoryPage from './component/History';



function App() {

  const history = useHistory();

  const goResult = () => {
      history.push("./history/result")
  }

  return (
    <Router>
      <Navbar />
      
      <Switch>
        <Route exact path={["/","/current"]} >
          <Current/>
        </Route>
        <Route exact path='/history/select'>
          <HistoryPage />
        </Route>
        <Route exact path='/history/result'>
          <HistoryPage />
        </Route>
        <Route exact path='/about'>

           {/* template for about me */}
          <div className='text-center space-y-3'>
            <p className='text-2xl font-semibold'>About me</p>
            <p className='text-xl'>Nuttapong Boonsala 630610744</p>
          </div>
          
        </Route>

      </Switch>

    </Router>

    

  );
}

export default App;
