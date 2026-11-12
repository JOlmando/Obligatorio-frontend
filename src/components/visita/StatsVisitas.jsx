import { useEffect, useState } from 'react'
import { obtenerVisitasAPI } from '../../services/visita.services';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

const StatsVisitas = () => {
    const [visitas, setVisitas] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
      const cargarVisitas = async () => {
        try {
          setVisitas(await obtenerVisitasAPI());
        } catch (error) {
          setError(error.message || "No se pudieron cargar las visitas.");
        }
      };

      cargarVisitas();
    }, []);

    const meses = ['ene','feb','mar','abr','may','jun','jul','ago','set','oct','nov','dic'];
    const diasEnElMes = Array(12).fill(0);

    for (const v of visitas) {
      const mes = Number(v.fecha.slice(5, 7));
      if (mes >= 1 && mes <= 12) {
          diasEnElMes[mes - 1]++;
      }
    }

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

 const options = {
  responsive: true,
  scales: {
    y: {
      ticks: {
        stepSize: 1
      }
    }
  },
  plugins: {
    legend: {
      position: 'top' ,
    },
    title: {
      display: true,
      text: 'Chart.js Bar Chart',
    },
  },
};

const labels = meses;

 const data = {
  labels,
  datasets: [
    {
      label: 'Dias al mes',
      data: diasEnElMes,
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
  ],
};


  return (
    <div>
      {error && <p role="alert">{error}</p>}
      <Bar options={options} data={data} />
    </div>);
}

export default StatsVisitas