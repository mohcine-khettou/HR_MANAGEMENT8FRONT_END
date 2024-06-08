import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SharedLayout } from "./components";
import { Login, Profile, Demande } from "./pages";
import { ListProfs } from "./components/ListeProfs/ListProfs";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Profile />} />
          <Route path="/demandes" element={<Demande />} />
          <Route path="/profs" element={<ListProfs />} />
          {/* <Route path="demandes" element={} />
          <Route path="pieces" element={} /> */}
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
