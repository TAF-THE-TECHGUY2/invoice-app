import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import DashboardPage from './components/pages/DashboardPage';
import AnalyticsPage from './components/pages/AnalyticsPage';
import InvoicesPage from './components/pages/InvoicesPage';
import UsageTrendsPage from './components/pages/UsageTrendsPage';
import { InvoiceProvider } from './context/InvoiceContext';
import './App.css';
function App() {
  return (
    <InvoiceProvider>
      <Router>
        <div className="app-container">
          <Sidebar />
          <div className="main-content">
            <Topbar />
            <div className="page-content">
              <Routes>
                <Route path="/" element={<DashboardPage />} />
                <Route path="/analytics" element={<AnalyticsPage />} />
                <Route path="/invoices" element={<InvoicesPage />} />
                <Route path="/usage-trends" element={<UsageTrendsPage />} />
              </Routes>
            </div>
          </div>
        </div>
      </Router>
    </InvoiceProvider>
  );
}

export default App;