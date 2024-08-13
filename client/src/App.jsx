import React, {lazy}  from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProtectRoute from './components/auth/ProtectRoute'
import NotFound from './pages/NotFound'
import { Suspense } from 'react'
import { LayoutLoader } from './components/layout/Loaders'
const Home = lazy(() => import('./pages/Home'))
const Login = lazy(() => import('./pages/Login'))
const Chat = lazy(() => import('./pages/Chat'))
const Groups = lazy(() => import('./pages/Groups'))
const NotFoundd = lazy(() => import('./pages/NotFound'))
const AdminLogin = lazy(() => import('./pages/Admin/AdminLogin'))
const Dashboard = lazy(() => import('./pages/Admin/Dashboard'))

function App() {

  let user = true;

  return (
    <BrowserRouter>
      <Suspense fallback={<LayoutLoader/> }>
        <Routes>
          <Route path="/" element={
            <ProtectRoute user={ user }>
              <Home />
            </ProtectRoute>
          } />
          <Route path="chat/:chatId" element={
            <ProtectRoute user={ user }>
              <Chat />
            </ProtectRoute>
          } />
          <Route path="groups" element={
            <ProtectRoute user={ user }>
              <Groups />
            </ProtectRoute>
          } />
          <Route path="login" element={
            <ProtectRoute user={ !user } redirect='/'>
              <Login />
            </ProtectRoute>
          } />

          <Route path="/*" element={ <NotFound /> } />

          <Route path="/admin" element={ <AdminLogin /> } />
          <Route path="/admin/dashboard" element={ <Dashboard /> } />
        </Routes>

      </Suspense>
    </BrowserRouter>
  )
}

export default App