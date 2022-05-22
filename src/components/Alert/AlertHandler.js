import { Alert, IconButton } from '@mui/material';
import React, { useState, useEffect } from 'react'
import CloseIcon from '@mui/icons-material/Close';

const AlertHandler = (props) => {
    const { alertHandler } = props;
    const [show, setShow] = useState(false)

    useEffect(() => {
        setShow(false); 
        if (alertHandler && alertHandler.message) {
            setShow(true);
        }
        console.log(alertHandler)
    }, [alertHandler]);

    return (
        <div>
            {
                show ? alertHandler.id == "LOGIN_FAIL" ? (
                    <>
                        <Alert severity="error" action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                // onClick={() => {
                                //     setShow(false);
                                // }}
                            >
                            <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }>
                            {alertHandler.message}
                        </Alert>
                    </>
                ) : alertHandler.id == "LOGOUT_SUCCESS" ? (
                    <Alert severity="success" action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            // onClick={() => {
                            //     setShow(false);
                            // }}
                        >
                        <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }>
                        {alertHandler.message}
                    </Alert>
                ) : null : null
            }
        </div>
    )
}

export default AlertHandler