import './App.css';
import Grid from './components/Grid';
import Header from './components/Header';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import DetailsCard from './components/DetailsCard';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route index element={<Grid />} />
        <Route path='/' element={<Grid />} />
        <Route path="/restaurants" element={<Grid />} />
        <Route path='/restaurants/:id' element={<DetailsCard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;