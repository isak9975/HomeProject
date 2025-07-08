import {BrowserRouter} from 'react-router-dom'
import { Navigation } from '../navigation/Navigation'
import 'bootstrap/dist/css/bootstrap.min.css';

export const App = () => {
    return(
        <BrowserRouter>
            <Navigation/>
        </BrowserRouter>
    )
}