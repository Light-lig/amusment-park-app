import React,{useState, useEffect} from "react";
import DashBoard from "../../layouts/Dashboard";
import Table from './components/table';
import axios from 'axios';
import Toast from "../../components/toast";
import CustomizedDialogs from "./components/Modal";
import { useSelector } from "react-redux";
const Usuarios = () => {
    const user = useSelector(el=>el.user);
    const [data,setData] = useState([]);
    const [open, setOpen] = useState(false);
    const [mensaje, setMensaje] = useState('');
    const [error, setError] = useState('');
    const [update, setUpdate] = useState(0);
    const [userSelected,setUser] = useState({});
    const [openDialog, setOpenDialog] = useState(false);
    const [query,setQuery] = useState('');
    useEffect(()=>{
        axios.get('http://localhost:8000/api/usuarios')
        .then(response=>{
            setData(response.data.data.filter(el=>el.id !== user.id));
        })
    },[update])
    const close = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };
  return (
    <DashBoard>
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg p-1">
        <div className="flex justify-between items-center py-4 bg-white dark:bg-gray-800">
       
          <label htmlFor="table-search" className="sr-only">
            Search
          </label>
          <div className="relative">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <input
              type="text"
              id="table-search-users"
              className="block p-2 pl-10 w-80 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search for users"
              value={query}
              onChange={(e)=>{
                  setQuery(e.target.value);
              }}
            />
          </div>
          <CustomizedDialogs openDialog={openDialog} setOpenDialog={setOpenDialog} setUpdate={setUpdate} setMensaje={setMensaje} setError={setError} setOpenToast={setOpen} userSelected={userSelected} />
        </div>
     
      <Table data={data.filter(el=>el.nombre.includes(query)|| el.usuario.includes(query) ||  el.dui.includes(query) ||  query == '')} setMensaje={setMensaje} setError={setError} setOpen={setOpen} setUser={setUser} setOpenDialog={setOpenDialog} />
      <Toast open={open} handleClose={close} tipo={error} mensaje={mensaje}/>

      </div>
    </DashBoard>
  );
};

export default Usuarios;
