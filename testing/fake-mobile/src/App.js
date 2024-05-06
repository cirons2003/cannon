import AdminLoginPage from "./pages/AdminLoginPage";
import EndpointAccessor from "./pages/EndpointAccessor";
import MemberLoginPage from './pages/MemberLoginPage'
import axios from 'axios'

function App() {

  axios.interceptors.request.use((config) => {
    const token = JSON.parse(localStorage.getItem('access_token'));
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
  })

  return (
    <>
      <EndpointAccessor/>
    </>
  )
}


export default App;
