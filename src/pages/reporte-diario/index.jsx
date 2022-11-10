import React,{useState, useEffect} from 'react';
import  DashBoard from '../../layouts/Dashboard';
import Table from './components/table';
import Formulario from  './components/formulario';
import axios from 'axios';
import { useSelector } from 'react-redux'
import moment from 'moment/moment';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import TextField from '@mui/material/TextField';

const ReporteDiario = () =>{
    const [data,setData] = useState([]);
    const usuario = useSelector((state)=>state.user)
    const [fechaDesde, setFechaD] = useState(moment().startOf('week'));
    const [parks, setParks] = useState([]);
    const [fechaHasta, setFechaH] = useState(moment().endOf('week'));
    const [park, setPark] = useState(0);
    const [tipos,setTipos] = useState([]); 
    const [update, setUpdate] = useState(0);
    const handleChange = (event) => {
        setPark(event.target.value);
      
    };
    useEffect(()=>{
        axios.get(`http://localhost:5000/api/v1/park/estadisticas/${usuario.id}/${fechaDesde.format('DD-MM-YYYY')}/${fechaHasta.format('DD-MM-YYYY')}`)
        .then(response=>{
            setData(response.data.map((el,index)=>{
                el.id = index + 1;
                return el;
            }));
        })
    },[fechaDesde,fechaHasta,update])
    useEffect(()=>{
        axios.get('http://localhost:5000/api/v1/park')
        .then(res=>{
            setParks(res.data);
        })
        axios.get('http://localhost:5000/api/v1/tipoVisitante')
        .then(res=>{
            setTipos(res.data);
        })
    },[])
    return(
        <LocalizationProvider dateAdapter={AdapterMoment}>

        <DashBoard>
        <div className="flex flex-col">
            <Formulario parques={parks} tipos={tipos} setUpdate={setUpdate}/>

            <Box sx={{ flexGrow: 1 }} >
         <Grid container spacing={2} m={2} item>
        <Grid item xs={4}  >
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
            <Table data={data.filter(el=> el.id_park == park || park == 0)}/>
        </div>
    </DashBoard>
    </LocalizationProvider>

    )
}
   

export default ReporteDiario;
