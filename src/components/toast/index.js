import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
const Toast = (props) =>{
    return(
        <Snackbar open={props.open} autoHideDuration={6000} onClose={props.handleClose}>
        <Alert onClose={props.handleClose} severity={props.tipo} sx={{ width: '100%' }}>
          {props.mensaje}
        </Alert>
      </Snackbar>
    )
}

export default Toast;