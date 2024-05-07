import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Layout from './pages/Layout'
import Loginpage from './pages/LoginPage'
import ProtectedRoute from './components/ProtectedRoute'

export default function Routing() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path = '/' element = {<ProtectedRoute><Layout/></ProtectedRoute>}>

                    </Route>
                    <Route path = '/login' element = {<Loginpage/>}/>
                </Routes>
            </Router>
        </>
    )
}