import React from 'react';
import { DataGrid } from '@mui/x-data-grid';

import CustomSwitch from '../custom-switch';
const Table = ({data,setMensaje,setError,setOpen,setOpenDialog,setUser}) =>{
    const columns=[
        {field:'id',headerName:'id',width:80},
        {field:'nombre',headerName:'Nombre',flex:1},
        {field:'usuario',headerName:'Usuario',flex:1},
        {field:'dui',headerName:'Dui',flex:1},
        {field:'tipo',headerName:'Tipo',flex:1},
        {field:'activo',headerName:'Estado',flex:1,
        renderCell:(params)=> (<CustomSwitch item={params.row} 
            setMensaje={setMensaje}
            setError={setError}
            setOpen={setOpen}
          />)}
        
    ];

    return(<div style={{height:300,width:'100%'}}>
        <DataGrid rows={data} columns={columns} 
         onCellDoubleClick={(params, event) => {
            if (!event.ctrlKey) {
              event.defaultMuiPrevented = true;
              params.row.showPassword = false;
              setUser(params.row);
              setOpenDialog(true);
            }
          }}
        />
    </div>);
}

export default Table;