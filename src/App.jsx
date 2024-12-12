import Header from './components/Header';
import Cards from './components/Cards';
import AddMovie from './components/AddMovie';
import { Route, Routes } from 'react-router-dom';
import Detail from './components/Detail';
import Login from './components/Login';
import { AuthProvider } from './contexts/authContext';

function App() {

  return (
    <div className='App relative'>
      <AuthProvider>
        <Header/>
        <Routes>
          <Route path="/" element={<Cards/>} />
          <Route path="/addmovie" element={<AddMovie/>} />
          <Route path="/detail/:id" element={<Detail/>} />
          <Route path="/login" element={<Login/>} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App