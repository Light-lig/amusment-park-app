import React,{useEffect, useState} from 'react';
import DashBoard from '../../layouts/Dashboard';
import PieChart from '../../components/pie-chart';
import BarChart from '../../components/bar-chart';
import { useSelector } from 'react-redux'
import axios from 'axios';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import TextField from '@mui/material/TextField';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import moment from 'moment/moment';

const Graficos = () =>{
    const usuario = useSelector((state)=>state.user)
    const [data,setData] = useState([]);
    const [park, setPark] = useState(0);
    const [parks, setParks] = useState([]);
    const [fakeData,setFakeData] = useState([]);
    const [fechaDesde, setFechaD] = useState(moment().startOf('week'));
    const [fechaHasta, setFechaH] = useState(moment().endOf('week'));
    const handleChange = (event) => {
        setPark(event.target.value);
        setData([]);
        setTimeout(()=>{
            setData(fakeData.filter(el=> el.id == event.target.value || event.target.value == 0))
        },100)
    };
   
    useEffect(()=>{
        axios.get(`http://localhost:8000/api/estadisticas/obtener?id_user=${usuario.id}&fechaDesde=${fechaDesde.format('DD-MM-YYYY')}&fechaHasta=${fechaHasta.format('DD-MM-YYYY')}`)
        .then(response=>{
            setData([]);

            setTimeout(()=>{
                setData(response.data.data);
                setFakeData(response.data.data);
            },100)
         
        })
      
    },[fechaDesde,fechaHasta]);
    useEffect(()=>{
        axios.get('http://localhost:8000/api/parques/obtener')
        .then(res=>{
            setParks(res.data.data);
        })
    },[])
    return(
        <LocalizationProvider dateAdapter={AdapterMoment}>

    <DashBoard>
         <Box sx={{ flexGrow: 1 }} >
         <Grid container spacing={2}>
        <Grid item xs={4}>
        <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Parques</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={park}
          label="Age"
          onChange={handleChange}

        >
            <MenuItem key="0" value="0">Todos</MenuItem>
            {
                parks.map(el=>          <MenuItem key={el.id} value={el.id}>{el.nombre}</MenuItem>
                )
            }
     
        </Select>
      </FormControl>
      
        </Grid>
        <Grid item xs={4}>
        <DesktopDatePicker
          label="Fecha desde"
          inputFormat="DD/MM/YYYY"
          value={fechaDesde}
          onChange={(value)=>setFechaD(value)}
          renderInput={(params) => <TextField {...params} />}
        />
      
        </Grid>
        <Grid item xs={4}>
        <DesktopDatePicker
          label="Fecha hasta"
          inputFormat="DD/MM/YYYY"
          value={fechaHasta}
          onChange={(value)=>setFechaH(value)}
          renderInput={(params) => <TextField {...params} />}
        />
      
        </Grid>
      </Grid>
     
    </Box>
    <div className="flex justify-around">
        <BarChart data={data.map(el=> {return Number(el.cantidad)})} categories={data.map(el=>{return el.nombre})} /> 

        <PieChart data={data.map(el=> {return Number(el.cantidad)})} categories={data.map(el=>{return el.nombre})}  />
    </div>

</DashBoard>
</LocalizationProvider>
)
}


export default Graficos;