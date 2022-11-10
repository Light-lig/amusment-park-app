import React,{useEffect} from 'react';
import { 
        Routes, 
        Route,
        useNavigate
} from 'react-router-dom';
import Login from '../pages/login';
import Graficos from '../pages/Graficos';
import ReporteDiario from '../pages/reporte-diario';
import Usuarios from '../pages/Usuarios';
import { connect } from "react-redux";

const Rutas = ({user}) =>
{
    const navigate  = useNavigate();

    useEffect(()=>{
        if(Object.keys(user).length == 0){
             navigate('/')
        }
    },[user])
  
    return(<Routes>
        <Route path="/" exact element={<Login />} />
        <Route path="/dashboard" element={<Graficos user={user} />}/>
        <Route path="/diario" element={<ReporteDiario user={user} />}/>
        <Route path="/usuarios" element={<Usuarios user={user} />}/>

    </Routes>)
}
function mapStateToProps(state, props){
    return{
      user:state.user
    }
  }
  Rutas.defaultProps ={
    user: {}
  }
export default connect(mapStateToProps)(Rutas);