import React from "react";
import { DataGrid,GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import moment from "moment/moment";
import { useSelector } from 'react-redux'

function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  }
const Table = ({data}) => {
    const usuario = useSelector((state)=>state.user)

      const columns = [
        { field: 'id', headerName: 'id',  width: 80 },
        { field: 'nombre', headerName: 'Parque',  flex: 1},
        { field: 'fecha', headerName: 'Fecha',  flex: 1, renderCell:(props)=>{
            return moment(props.value).format('DD/MM/YYYY')
        } },
        { field: 'tipo', headerName: 'Tipo',  flex: 1 },
        { field: 'cantidad', headerName: 'Cantidad',  flex: 1 },
      ];
    return(
        <div style={{ height: 300, width: '100%' }}>
      <DataGrid rows={data} columns={columns}   components={{
          Toolbar:CustomToolbar,
        }} />
    </div>
      );
}


export default Table;
