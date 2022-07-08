import * as React from 'react';
import {
    Breadcrumbs as MUIBreadcrumbs,
    Link,
    Typography
} from '@mui/material';
import { withRouter } from 'react-router-dom';


const Breadcrumbs = props => {
    console.log(props);
  return (
      <MUIBreadcrumbs aria-label="breadcrumb">
        <Link color="inherit">
          MUI
        </Link>
        <Link color="inherit">Core</Link>
        <Typography color="text.primary">Breadcrumbs</Typography>
      </MUIBreadcrumbs>
    
  );
}


export default withRouter(Breadcrumbs);