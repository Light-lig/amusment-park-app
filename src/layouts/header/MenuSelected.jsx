import React from 'react';
import { Link } from 'react-router-dom';
const MenuSelected = ({tipo}) =>{
    let loc = window.location.href.split('/').reverse()[0];

    switch(tipo){
        case 'admin':
            return <>
             <Link
                to="/dashboard"
                className={`${loc == 'dashboard'?'bg-gray-900':null} hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium`}
                aria-current="page"
              >
                Dashboard
              </Link>
              <Link
                to="/usuarios"
                className={`${loc == 'usuarios'?'bg-gray-900':null} text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium`}
              >
                Usuarios
              </Link>
              <Link
                to="/diario"
                className={`${loc == 'diario'?'bg-gray-900':null}  text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium`}
              >
                Reporte diario
              </Link>
            </>
            case 'supervisor':
                return      <Link
                to="/usuarios"
                className={`${loc == 'usuarios'?'bg-gray-900':null} text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium`}
              >
                Usuarios
              </Link>
              default:
                
                return<>
                 <Link
                to="/dashboard"
                className={`${loc == 'dashboard'?'bg-gray-900':null} hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium`}
                aria-current="page"
              >
                Dashboard
              </Link>
              <Link
                to="/diario"
                className={`${loc == 'diario'?'bg-gray-900':null}  text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium`}
              >
                Reporte diario
              </Link>
                </> 
         
    }
}

export default MenuSelected;