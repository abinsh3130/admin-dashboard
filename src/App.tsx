import { Route, Routes } from 'react-router-dom'
import './App.css'
import LoginForm from './components/LoginForm'
import Orders from './pages/Orders'
import AdminLayout from './AdminLayout'
import Products from './pages/Products'
import Dashboard from './pages/Dashboard'
import Settings from './pages/Settings'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<LoginForm />} />

        <Route
          path="/dashboard"
          element={
            <AdminLayout>
              <Dashboard />
            </AdminLayout>
          }
        />

        <Route
          path="/orders"
          element={
            <AdminLayout>
              <Orders />
            </AdminLayout>
          }
        />
        <Route
          path="/products"
          element={
            <AdminLayout>
              <Products />
            </AdminLayout>
          }
        />

        <Route
          path="/settings"
          element={
            <AdminLayout>
              <Settings />
            </AdminLayout>
          }
        />

      </Routes>

    </>
  )
}

export default App
