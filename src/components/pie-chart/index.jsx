import React from 'react';
import Chart  from 'react-apexcharts'
import withEmptyData from '../HOC/withEmptyData';

class PieChart extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
          
        series: props.data,
        options: {
          chart: {
            width: 380,
            type: 'pie',
          },
          title: {
            text: "Cantidad por parque"
          },
          labels: props.categories,
          responsive: [{
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                position: 'bottom'
              }
            }
          }]
        },
      
      
      };
    }

  

    render() {
      return (
        <div id="chart">
        <Chart options={this.state.options} series={this.state.series} type="pie" width={380} />
        </div>
      );
    }
  }

  export default withEmptyData(PieChart,'data');