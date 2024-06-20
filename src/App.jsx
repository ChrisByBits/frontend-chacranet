import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ChatPage from "./pages/ChatPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element = { <LoginPage /> }/>
        <Route path='/register' element = { <RegisterPage /> }/>
        <Route path='/chat' element = { <ChatPage /> }/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;