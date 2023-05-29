import { Route, Routes } from "react-router-dom";
import NotFound from "./components/Error/NotFound";
import Header from "./components/Header/Header";
import ListBook from "./components/CRUD/ListBook";
import AddEditBook from "./components/CRUD/AddEditBook";

function App() {
  return (
    <div className="container" data-testid="app-component">
      <Header />
      <Routes>
        <Route path="/add" element={<AddEditBook />} />
        <Route path="/edit/:id" element={<AddEditBook />} />
        <Route path="/" element={<ListBook />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
