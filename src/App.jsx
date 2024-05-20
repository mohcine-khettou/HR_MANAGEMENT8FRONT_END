import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SharedLayout } from "./components";
import { Login, Profile, Demande } from "./pages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Profile />} />
          <Route path="/demandes" element={<Demande />} />
          {/* <Route path="demandes" element={} />
          <Route path="pieces" element={} /> */}
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
