import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import BoardList from './pages/board/List';
import BoardDetail from './pages/board/Detail';
import BoardWrite from './pages/board/Write';
import Home from './pages/Home';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <div style={{ padding: '20px' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/board" element={<BoardList />} />
            <Route path="/board/write" element={<BoardWrite />} />
            <Route path="/board/:id" element={<BoardDetail />} />
          </Routes>
        </div>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
