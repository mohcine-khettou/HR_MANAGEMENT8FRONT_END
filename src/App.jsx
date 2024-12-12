import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SharedLayout } from "./components";
import { Login, Profile, Demande, HistoriqueProfesseurs } from "./pages";
import { ListProfs } from "./components/ListeProfs/ListProfs";
import ProfesseurCharts from "./components/ProfesseurCharts/ProfesseurCharts";
import RhDemmande from "./pages/RhDemmande";
import RhDemmande2 from "./pages/RhDemmande2";
import Gradation from "./pages/Gradations";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Profile />} />
          <Route path="/demandes" element={<Demande />} />
          <Route path="/demandesRH" element={<RhDemmande />} />
          <Route path="/demandesRH2" element={<RhDemmande2 />} />
          <Route path="/profs" element={<ListProfs />} />
          <Route path="/charts" element={<ProfesseurCharts />} />
          <Route
            path="/historiques-professeurs"
            element={<HistoriqueProfesseurs />}
          />
          <Route path="/gradation" element={<Gradation />} />
          {/* <Route path="demandes" element={} />
          <Route path="pieces" element={} /> */}
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
