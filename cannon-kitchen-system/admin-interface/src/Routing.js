import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Layout from './pages/Layout'
import Loginpage from './pages/LoginPage'
import ProtectedRoute from './components/ProtectedRoute'
import MealsPage from './pages/MealsPage'
import LibraryPage from './pages/LibraryPage'
import MenuPage from './pages/MenuPage'

export default function Routing() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path = '/' element = {<ProtectedRoute><Layout/></ProtectedRoute>}>
                        <Route path = '/meals' element = {<MealsPage/>}/>
                        <Route path = '/menus' element = {<MenuPage/>}/>
                        <Route path = '/library' element = {<LibraryPage/>}/>
                    </Route>
                    <Route path = '/login' element = {<Loginpage/>}/>
                </Routes>
            </Router>
        </>
    )
}