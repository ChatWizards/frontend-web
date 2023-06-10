import './main.css'
import ChatPage from './pages/chatPage'
import SideNav from './components/sideNav'
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import Component from './components'
function App() {
  return (
    <div className="App w-screen h-screen bg-dark">
      <Router>
        <SideNav></SideNav>
        <Routes>
          <Route path='/component' element={<Component></Component>}></Route>
          <Route path='/chat/:id' element={<ChatPage></ChatPage>}></Route>
        </Routes>
      </Router>
      {/* <Component></Component> */}
    </div>
  );
}

export default App;
