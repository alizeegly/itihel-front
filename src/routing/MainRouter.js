import React from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProtectedRoute from './ProtectedRoute';
import routesConfig from './routes.config';

const MainRouter = (props) => {
    
    return (
        <Router> 
            <Switch>
                {
                    routesConfig.routes.map((route, index) => {
                        if(route.isAuthenticated){
                            return (
                                <ProtectedRoute key={index} exact path={route.path} component={route.component} />
                            )
                        } else {
                            return (
                                <Route key={index} exact path={route.path} component={route.component} />
                            )
                        }
                    })
                }
            </Switch>
        </Router>
    )
}
  
export default MainRouter