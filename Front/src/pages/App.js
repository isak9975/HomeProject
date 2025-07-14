import {BrowserRouter} from 'react-router-dom'
import { Navigation } from '../navigation/Navigation'
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserProvider } from '../contexts/UserContext';

export const App = () => {

    return(
        <BrowserRouter>
            <UserProvider>
                <Navigation/>
            </UserProvider>
        </BrowserRouter>
    )
}