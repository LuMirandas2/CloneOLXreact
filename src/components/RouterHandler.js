import { Route, Redirect, HashRouter } from 'react-router-dom';
import { isLogged } from '../helpers/AuthHandler';


export default ({ children, ...props }) => {
    let logged = isLogged();
    let authorized = (props.private && !logged) ? false : true;
    return (
        <Route 
           {...props}
           render= {() =>
                 authorized ? children : <Redirect to='/signin' />

            }
        />    
    )
} 