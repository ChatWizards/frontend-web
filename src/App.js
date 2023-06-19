import './main.css'
import ChatPage from './pages/chatPage'
import SideNav from './components/sideNav'
import {BrowserRouter as Router,Route,Routes, Navigate} from 'react-router-dom'
import Component from './components'
import {Auth,Reset} from './pages/auth'
import { useContext, useState } from 'react'
import {UserContext,ChatProvider, ToastContext} from './contexts'
import ProtectedRoute from './components/protectedRoute'
import Modal,{ InviteModal } from './components/modals'
// import useToast from './hooks/useToast'

function App() {
  const [chatType,setChatType] = useState("user") 
  const {user} = useContext(UserContext)
  const [modalInfo,setModalInfo] = useState({active:false,type:"",name:""})
  return (      
  <ChatProvider>
    <div className="App w-screen h-screen bg-dark">
      <Router>
          <Routes>
            <Route path='/' element={<Navigate to={'/chat'}/>}></Route>
              <Route path='/component' 
                element={
                  <ProtectedRoute protectType={user.token}>
                    <Component/>
                  </ProtectedRoute>
                  }>  
               </Route>
              <Route path='/chat' 
                element={
                  <ProtectedRoute protectType={user.token}>
                      <ChatPage chatType={chatType}/>
                  </ProtectedRoute>
                }>  
              </Route>
              <Route path='/auth' element={user.token?<Navigate to={"/chat"}></Navigate>:<Auth></Auth>}></Route>  
              <Route path='/forgot' element={user.token?<Navigate to={"/chat"} replace></Navigate>:<Reset></Reset>}></Route>                
          </Routes>
        {user.token&&<SideNav setModalInfo={setModalInfo} chatType={chatType} setChatType={setChatType}></SideNav>}
      </Router>
      {modalInfo.active&&<Modal modalInfo={modalInfo} setModalInfo={setModalInfo}></Modal>}
    </div>
  </ChatProvider>
  );
}

export default App;
