import { useEffect, useState } from "react";
import "./Charts.css";
import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import customFetch from "../../utils/customFetch";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#A28FF6",
  "#F77E53",
  "#7DDF64",
];

export default function ProfesseurCharts() {
  const [professeurs, setProfesseurs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await customFetch.get("/api/v1/professeurs");
        setProfesseurs(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const getCountByAttribute = (attribute) => {
    const count = {};
    professeurs.forEach((prof) => {
      const key =
        attribute === "dateRecrutement"
          ? new Date(prof[attribute]).getFullYear()
          : prof[attribute];
      count[key] = (count[key] || 0) + 1;
    });
    return Object.entries(count).map(([key, value]) => ({
      name: key,
      value: value,
    }));
  };

  const getAgeCategoryDataByDepartment = () => {
    const departments = [...new Set(professeurs.map((p) => p.departement))];
    
    return departments.map((departement) => {
      const filtered = professeurs.filter(
        (prof) => prof.departement === departement
      );
      console.log(professeurs)
      console.log(filtered)
      const count = { "> 60": 0, "< 60": 0 };
      filtered.forEach((prof) => {
        const age = new Date().getFullYear() - new Date(prof.dateNaissance).getFullYear();
        if (age > 60) {
          count["> 60"] += 1;
        } else {
          count["< 60"] += 1;
        }
      });
      return {
        departement,
        data: Object.entries(count).map(([key, value]) => ({
          name: key,
          value,
        })),
      };
    });
  };

  const gradeData = getCountByAttribute("grade");
  const postData = getCountByAttribute("post");
  const departementData = getCountByAttribute("departement");
  const dateRecrutementData = getCountByAttribute("dateRecrutement");
  const ageDataByDepartment = getAgeCategoryDataByDepartment();

  return (
    <div className="wrapper">
      <div className="body-overlay"></div>
      <div id="content">
        <div className="graphes-container">
          <div className="chart-row">
            <div className="chart-column">
              <h2 className="normal-case">Nombre de professeurs par grade</h2>
              <ResponsiveContainer width="100%" height={450}>
                <PieChart>
                  <Pie
                    data={gradeData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    fill="#8884d8"
                    label
                  >
                    {gradeData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="chart-column">
              <h2 className="normal-case">Nombre de professeurs par poste</h2>
              <ResponsiveContainer width="100%" height={450}>
                <PieChart>
                  <Pie
                    data={postData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    fill="#8884d8"
                    label
                  >
                    {postData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="chart-row">
            <div className="chart-column">
              <h2 className="normal-case">
                Nombre de professeurs par département
              </h2>
              <ResponsiveContainer width="100%" height={450}>
                <PieChart>
                  <Pie
                    data={departementData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    fill="#8884d8"
                    label
                  >
                    {departementData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="chart-column">
              <h2 className="normal-case">
                Nombre de professeurs par année de recrutement
              </h2>
              <ResponsiveContainer width="100%" height={450}>
                <PieChart>
                  <Pie
                    data={dateRecrutementData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    fill="#8884d8"
                    label
                  >
                    {dateRecrutementData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="chart-row">
            {ageDataByDepartment.map(({ departement, data }) => (
              <div key={departement} className="chart-column">
                <h2 className="normal-case">
                  Professeurs du {departement} par catégorie d'âge
                </h2>
                <ResponsiveContainer width="100%" height={450}>
                  <PieChart>
                    <Pie
                      data={data}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={120}
                      fill="#8884d8"
                      label
                    >
                      {data.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
