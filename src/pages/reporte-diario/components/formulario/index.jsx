import React,{useState} from 'react';
import moment from 'moment/moment';
import Toast from '../../../../components/toast';
import axios from 'axios';
const IngresoCantidades = ({parques,tipos,setUpdate}) => {
  
  const [token, setToken] = useState({
    id_parque:0,
    tipo:0, 
    fecha:moment().format('YYYY-MM-DD'),
    cantidad:0
  })
  const [open, setOpen] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');
  const handleChange = (e) =>{
      setToken({
        ...token, 
        [e.target.name]:e.target.value
      })
  }
  const close = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  const agregar = () =>{
    if(token.id_parque == 0){
      setMensaje('Debe seleccionar un parque');
      setError('warning')
      setOpen(true);
      return
    }
    if(token.tipo == 0){
      setMensaje('Debe seleccionar un tipo');
      setError('warning')
      setOpen(true);
      return
    }

    axios.post('http://localhost:5000/api/v1/estadisticas',token)
  .then(response=>{
    if(!response.data.error){
      setMensaje('Se agrego correctamente');
      setError('success')
      setOpen(true);
      setUpdate(el=>el+1);
    }else{
      setMensaje('Ocurrio un error');
      setError('error')
      setOpen(true);
    }
  })
  }
    return(
        <div className="mt-5 md:col-span-2 md:mt-0">
        <form action="#" method="POST">
        <div className="overflow-hidden shadow sm:rounded-md">
          <div className="bg-white px-4 py-5 sm:p-6">
            <div className="grid grid-cols-12 gap-12">
           

              <div className="col-span-4 sm:col-span-3">
                <label htmlFor="parque" className="block text-sm font-medium text-gray-700">Parque</label>
                <select value={token.id_parque} onChange={handleChange} id="parque" name="id_parque" autoComplete="parque-name" className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                <option value="0">Selecciona un parque</option>

                  {
                    parques.map(el=> <option key={el.id} value={el.id}>{el.nombre}</option>
                    )
                  }
          
                </select>
              </div>
              <div className="col-span-4 sm:col-span-3">
                <label htmlFor="tipo" className="block text-sm font-medium text-gray-700">Tipo</label>
                <select id="tipo" value={token.tipo} onChange={handleChange} name="tipo" autoComplete="tipo-name" className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                <option value="0">Selecciona un tipo</option>

                  {
                    tipos.map(el=> <option key={el.id} value={el.id}>{el.tipo}</option>
                    )
                  }
                </select>
              </div>
              <div className="col-span-4 sm:col-span-3">
            <label htmlFor="small-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Cantidad</label>
            <input type="number" id="small-input" min="0"  value={token.cantidad} name="cantidad" onChange={handleChange}  className="block p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
        </div>
        <div className="col-span-4 sm:col-span-3">

        <button type="button" onClick={agregar}  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Agregar</button>
        </div>

            </div>
          </div>
        
        </div>
      </form>
      <Toast open={open} handleClose={close} tipo={error} mensaje={mensaje}/>
    </div>
    );
}

export default IngresoCantidades;