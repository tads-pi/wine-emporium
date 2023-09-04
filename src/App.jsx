import { store } from '../src/store/index'
import { BrowserRouter, Route, Routes } from "react-router-dom"; 
import Home from "./Home";
import { Provider } from "react-redux";

export default function App() {
  return (
    <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
    </Provider>
  );
}
