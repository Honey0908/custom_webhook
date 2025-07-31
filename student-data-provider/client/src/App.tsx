import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Schools from './pages/Schools';
import RegisterSchool from './pages/RegisterSchool';
import Students from './pages/Students';
import 'antd/dist/reset.css';
import './App.css';
import Navbar from './components/Navbar';
import WebhookLogs from './pages/WebhookLogs';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Navbar />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar
          theme="colored"
          aria-label="Notification"
        />
        <Routes>
          <Route path="/" element={<Schools />} />
          <Route path="/register-school" element={<RegisterSchool />} />
          <Route path="/students" element={<Students />} />
          <Route path="/webhook-logs/:id" element={<WebhookLogs />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
