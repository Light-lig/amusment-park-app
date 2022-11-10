import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import FilledInput from "@mui/material/FilledInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import validator from "validator";
import axios from 'axios';
import Input from '@mui/material/Input';

import { IMaskInput } from 'react-imask';

const TextMaskCustom = React.forwardRef(function TextMaskCustom(props, ref) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask="00000000-0"
      definitions={{
        '#': /[1-9]/,
      }}
      inputRef={ref}
      onAccept={(value) => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  );
});

TextMaskCustom.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function CustomizedDialogs({setMensaje,
                                          setError,
                                          setOpenToast,
                                          setUpdate, 
                                          userSelected,
                                          openDialog,
                                          setOpenDialog
                                        }) {
  const [values, setValues] = useState({
    id:null, 
    nombre: "",
    usuario: "",
    contrasenia: "",
    dui: "",
    tipo: "",
    activo: 1,
    showPassword: false,
  });
  const [modifiedPassword,setModified] = useState(false);
  useEffect(()=>{
    if(Object.keys(userSelected).length > 0){
      setValues(userSelected)
    }
  },[userSelected])
  const handleChange = (prop) => (event) => {
    if(prop === 'contrasenia' && values.id){
      setModified(true);
    }
    setValues({ ...values, [prop]: event.target.value });
  };
  const onFocusPass = () =>{

    setValues({ ...values, contrasenia:'' });

  }
  const setInitialState = () =>{
    setValues({
      id:null, 
      nombre: "",
      usuario: "",
      contrasenia: "",
      dui: "",
      tipo: "",
      activo: 1,
      showPassword: false,
    })
  }
  const handleClickOpen = () => {
   setInitialState()
    setOpenDialog(true);
  };

  const handleClose = () => {
    setInitialState()
    setOpenDialog(false);
  };
  const submit = () =>{

    if(values.nombre == '' || 
      values.usuario == '' || 
      values.contrasenia == '' ||
      values.dui == '' || 
      values.tipo == '' ){
        setMensaje('Aun hay campos requeridos');
        setError('warning')
        setOpenToast(true)
        return;
      }
      if(!validator.isEmail(values.usuario)){
        setMensaje('El email no es valido');
        setError('warning')
        setOpenToast(true)
        return;
      }
      if( values.contrasenia < 8){
        setMensaje('The password must contain 8 characters.');
        setError('warning')
        setOpenToast(true)
        return;
      }
      values.modifiedPassword = modifiedPassword;
      if(!values.id){
        axios.post('http://localhost:5000/api/v1/usr',values)
        .then(response=>{
          if(!response.error){
            setMensaje('Se ejecuto correctamente.');
            setError('success')
            setOpenToast(true)
            setUpdate(value=>value+1);
            setOpenDialog(false);
            setInitialState()

          }else{
            setMensaje('Ocurrio un error.');
            setError('error')
            setOpenToast(true)
          }
         
        })
      }else{
        axios.put(`http://localhost:5000/api/v1/usr/${values.id}`,values)
        .then(response=>{
          if(!response.error){
            setMensaje('Se ejecuto correctamente.');
            setError('success')
            setOpenToast(true)
            setUpdate(value=>value+1);
            setInitialState()

            setOpenDialog(false);
          }else{
            setMensaje('Ocurrio un error.');
            setError('error')
            setOpenToast(true)
          }
         
        })
      }
     
  
  }
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Agregar nuevo
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={openDialog}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Usuario
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Box
            component="form"
            sx={{ display: "flex", flexWrap: "wrap" }}
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField
                label="Name *"
                id="outlined-start-adornment"
                sx={{ m: 1, width: "25ch" }}
                onChange={handleChange("nombre")}
                value={values.nombre}
              />
              <TextField
                label="Email *"
                id="outlined-start-adornment"
                sx={{ m: 1, width: "25ch" }}
                onChange={handleChange("usuario")}
                value={values.usuario}

              />
              <FormControl sx={{ m: 1, width: "25ch" }} variant="filled">
                <InputLabel htmlFor="filled-adornment-password">
                  Password *
                </InputLabel>
                <FilledInput
                  id="filled-adornment-password"
                  type={values.showPassword ? "text" : "password"}
                  value={values.contrasenia}
                  onChange={handleChange("contrasenia")}
                  onFocus={onFocusPass}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {values.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              <FormControl style={{marginTop:16}}>
                <InputLabel htmlFor="formatted-text-mask-input">Dui</InputLabel>
                <Input
              
                  value={values.dui}
                  onChange={handleChange("dui")}
                  name="textmask"
                  id="formatted-text-mask-input"
                  inputComponent={TextMaskCustom}
                />
              </FormControl>
           
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Type *</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={values.tipo}
                  label="Tipo"
                  onChange={handleChange("tipo")}
                >
                  <MenuItem value={"admin"}>admin</MenuItem>
                  <MenuItem value={"operario"}>operario</MenuItem>
                  <MenuItem value={"supervisor"}>supervisor</MenuItem>
                </Select>
              </FormControl>
            </div>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={submit}>
            Save changes
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
