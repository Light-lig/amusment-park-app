import React,{useEffect,useState} from 'react';
import Switch from '@mui/material/Switch';
import axios from 'axios';
const CustomSwitch = ({item,setMensaje,setError,setOpen})=>{
    const [value, setValue] = useState(false);
   
    useEffect(()=>{
        setValue(item.activo==1);
    },[])
    return(<Switch
        checked={value}
        onChange={()=>{
            item.activo = value?0:1
            axios.patch(`http://localhost:8000/api/usuarios/${item.id}`,item)
            .then(response=>{
                if(response.error){
                    setMensaje('Ocurrio un error');
                    setError('error')
                    setOpen(true);
                }else{
                    setMensaje('Se modifico correctamente');
                    setError('success')
                    setOpen(true);
                    setValue(!value)
                }
            })
        }}
        inputProps={{ 'aria-label': 'controlled' }}
      />
     
      )
}

export default CustomSwitch;