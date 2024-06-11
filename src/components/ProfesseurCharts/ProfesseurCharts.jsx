import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Charts.css';
import {
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  Bar,
  ResponsiveContainer,
} from "recharts";

export default function ProfesseurCharts() {
  const [professeurs, setProfesseurs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/professeurs');
        setProfesseurs(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const getCountByAttribute = (attribute) => {
    const count = {};
    professeurs.forEach(prof => {
      const key = attribute === 'dateRecrutement' ? new Date(prof[attribute]).getFullYear() : prof[attribute];
      count[key] = (count[key] || 0) + 1;
    });
    return Object.entries(count).map(([key, value]) => ({
      attribute: key,
      nombreProfesseurs: value
    }));
  };

  const gradeData = getCountByAttribute('grade');
  const postData = getCountByAttribute('post');
  const departementData = getCountByAttribute('departement');
  const dateRecrutementData = getCountByAttribute('dateRecrutement');

  return (
    <div className="wrapper">
      <div className="body-overlay"></div>
      <div id="content">
        <div className="graphes-container">
          <div className="chart-row">
            <div className="chart-column">
              <h2 className="normal-case">Nombre de professeurs par grade</h2>
              <BarChart width={600} height={350} data={gradeData} barSize={30}>
                <XAxis dataKey="attribute" />
                <YAxis ticks={[0, 10, 20, 30, 40, 50]} domain={[0, 50]} />
                <Tooltip />
                <Legend />
                <CartesianGrid strokeDasharray="3 3" />
                <Bar dataKey="nombreProfesseurs" name="Nombre de professeurs" fill="#8884d8" />
              </BarChart>
            </div>
            <div className="chart-column">
              <h2 className="normal-case">Nombre de professeurs par poste</h2>
              <BarChart width={600} height={350} data={postData} barSize={30}>
                <XAxis dataKey="attribute" />
                <YAxis ticks={[0, 10, 20, 30, 40, 50]} domain={[0, 50]} />
                <Tooltip />
                <Legend />
                <CartesianGrid strokeDasharray="3 3" />
                <Bar dataKey="nombreProfesseurs" name="Nombre de professeurs" fill="#8884d8" />
              </BarChart>
            </div>
          </div>
          <div className="chart-row">
            <div className="chart-column">
              <h2 className="normal-case">Nombre de professeurs par département</h2>
              <BarChart width={600} height={350} data={departementData} barSize={30}>
                <XAxis dataKey="attribute" />
                <YAxis ticks={[0, 10, 20, 30, 40, 50]} domain={[0, 50]} />
                <Tooltip />
                <Legend />
                <CartesianGrid strokeDasharray="3 3" />
                <Bar dataKey="nombreProfesseurs" name="Nombre de professeurs" fill="#8884d8" />
              </BarChart>
            </div>
            <div className="chart-column">
              <h2 className="normal-case">Nombre de professeurs par année de recrutement</h2>
              <BarChart width={600} height={350} data={dateRecrutementData} barSize={30}>
                <XAxis dataKey="attribute" />
                <YAxis ticks={[0, 10, 20, 30, 40, 50]} domain={[0, 50]} />
                <Tooltip />
                <Legend />
                <CartesianGrid strokeDasharray="3 3" />
                <Bar dataKey="nombreProfesseurs" name="Nombre de professeurs" fill="#8884d8" />
              </BarChart>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
