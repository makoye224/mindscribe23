import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Login from './authentication/Login';
import Register from './authentication/Register';
import ResetPassword from './authentication/ResetPassword';
import CheckEmail from './authentication/CheckEmail';
import MainPage from './pages/MainPage';
import Editor from './components/Editor';
import Activate from './authentication/Activate';
import ActivateAccount from './authentication/ActivateAccount';
import ResetPasswordConfirm from './authentication/ResetPasswordConfirm';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <br/>
      </div>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset_password" element={<ResetPassword />} />
          <Route path="/check_email" element={<CheckEmail/>} />
          {/* <Route path="/reset_password_confirm" element={<ResetPasswordConfirm/>} /> */}
          <Route path="/home" element={<MainPage/>} />
          <Route path="/editor/:id" element={<Editor/>} />
          <Route path='/password/reset/confirm/:uid/:token' element={<ResetPasswordConfirm/>} />
          <Route path="/activate/:uid/:token" element={<Activate/>} />
          <Route path="/activate_account" element={<ActivateAccount/>} />
        </Routes>
      </div>

      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </BrowserRouter>
  );
}

export default App;
