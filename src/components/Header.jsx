import React, { useContext } from 'react'
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import { AppState } from './Layout';
const Header = () => {
  const useAppState = useContext(AppState);
  const navigate = useNavigate();
  const handleLogout = async () => {
    console.log("Hello")
    try {
      console.log("hello")
      console.log(useAppState);
      const auth = getAuth();
      await signOut(auth); // Sign out from Firebase
      useAppState.setLogin(false); // Update context state
      useAppState.setUsername(""); // Clear username state
      console.log("User has logged out.");

      swal({
        title: "Logged out Successfully",
        icon: 'success',
        buttons: {
          confirm: {
            text: 'Okay',
            className: 'bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded',
          }
        }
      });
    } catch (error) {
      console.error("Logout Error: ", error);
      swal({
        title: 'Logout Failed!',
        text: error.message || "An error occurred while logging out.",
        icon: 'error',
        buttons: {
          confirm: {
            text: 'Try Again',
            className: 'bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded',
          }
        }
      });
    }
  };


  return (
    <div className='sticky top-0 z-10 bg-black header text-3xl flex justify-between text-red-500 font-bold p-3 border-b-2 border-gray-500'>
      <Link to={'/'}><span>Filmy<span className='text-white'>Verse</span></span></Link>
      {/* {useAppState.login ?
        <Link to={'/addmovie'}><Button><h1 className='text-lg text-white cursor-pointer flex items-center'><AddIcon className='mr-1' />Add New</h1></Button></Link>
        :
        <Link to={'/login'}><h1 className='text-lg bg-green-500 cursor-pointer flex items-center'><Button><span className='text-white font-medium capitalize'>login</span></Button></h1></Link>
      } */}
      {/* {useAppState.login ? ( */}
        <div className="flex">
          <Link
            to="/add-movie"
            className="transition-all duration-300 inline-flex items-center gap-2 rounded bg-white text-black px-8 max-sm:px-2 py-2 hover:bg-gray-400"
          >
            <span className="text-base max-sm:hidden font-medium bg-transparent">Add new</span>
            <AddIcon className="bg-transparent" />
          </Link>
          <div
            onClick={handleLogout}
            className="ml-2 transition-all duration-300 inline-flex items-center gap-2 rounded  bg-white px-8 max-sm:px-2 py-2 text-black hover:bg-gray-400 "
          >
            <span className="text-base max-sm:text-xs py-1 mt-0 font-medium bg-transparent">Log Out</span>
          </div>
        </div>
      {/* ) : ( */}
        <div className="mr-3">
          <Link
            to="/login"
            className="transition-all duration-300 inline-flex items-center gap-2 rounded bg-white px-8 max-sm:px-2 py-2 text-black hover:bg-gray-400"
          >
            <span className="text-base font-medium bg-transparent">Login</span>
          </Link>
        </div>
      {/* ) */}
      {/* } */}
    </div>
  )
}
export default Header