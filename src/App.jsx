import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/index.jsx';
import Home from './pages/home.jsx'



function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

