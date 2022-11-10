import React from 'react';
import { BrowserRouter as Router} from 'react-router-dom';

import Rutas from './Routes';

const App = () =>(
  <div className="min-h-full">

    <Router>
      <Rutas />
    </Router>
    </div>

)

export default App;
