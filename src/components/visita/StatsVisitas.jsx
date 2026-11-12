import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from "react";
import { cargarVisitas } from "../../features/visitas.slices";

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

    const { visitas, status, error } = useSelector(
        state => state.visitas
    );

    
    const meses = ['ene','feb','mar','abr','may','jun','jul','ago','set','oct','nov','dic']

    function diasPorMes(){

        for (const v of visitas) {
            
        }

        return
    }

    const diasMeses = useSelector(state => state.forecast.maximas)

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
      label: 'diasMeses',
      data: maximas,
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
  ],
};


  return (
    <div>
      <Bar options={options} data={data} />
    </div>);
}

export default StatsVisitas