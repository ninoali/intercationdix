import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Home } from './pages/Home';
import { Login } from './pages/auth/Login';
import { SignUp } from './pages/auth/SignUp';
import { ModelDashboard } from './pages/dashboard/ModelDashboard';
import { ClientDashboard } from './pages/dashboard/ClientDashboard';
import { AdminDashboard } from './pages/dashboard/AdminDashboard';
import { ProtectedRoute } from './components/auth/ProtectedRoute';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              
              {/* Protected Routes */}
              <Route
                path="/model/dashboard/*"
                element={
                  <ProtectedRoute allowedRoles={['MODEL']}>
                    <ModelDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/client/dashboard/*"
                element={
                  <ProtectedRoute allowedRoles={['CLIENT']}>
                    <ClientDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/*"
                element={
                  <ProtectedRoute allowedRoles={['ADMIN']}>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;