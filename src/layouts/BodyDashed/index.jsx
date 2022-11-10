import React from 'react';
import { useSelector } from 'react-redux';
import Alert from '@mui/material/Alert';

const BodyDashed = ({children}) => {
  const user = useSelector(el=>el.user);
  const loc = window.location.href.split('/').reverse()[0];
  

  const filterPantallas = () =>{
    switch(user.tipo){
      case 'operario':
        if(loc == 'usuarios'){
          return <Alert variant="filled" severity="warning">
          No tienes acceso.
          </Alert>
          }else{
            return children;
          }
        case 'supervisor':
          if(loc == 'dashboard' || loc == 'diario'){
            return <Alert variant="filled" severity="warning">
            No tienes acceso.
            </Alert>
            }else{
              return children;
            }
            default:
              return children;
    }
  }
return(<main>
<div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
  <div className="px-4 py-6 sm:px-0">
    <div className="h-auto rounded-lg border-4 border-dashed border-gray-200 p-3">
      {filterPantallas()}
    </div>
  </div>
</div>
</main>)
}

export default BodyDashed;