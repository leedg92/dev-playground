import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Layout from './components/Layout/Layout';
import BoardList from './pages/board/List';
import Home from './pages/Home';
import Layout from './components/layout/Layout';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <div style={{ padding: '20px' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/board" element={<BoardList />} />
          </Routes>
        </div>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
