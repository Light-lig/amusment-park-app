import React from 'react';
import Chart  from 'react-apexcharts'
import withEmptyData from '../HOC/withEmptyData';

class BarChart extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
      
        series: [{
          data: props.data
        }],
        options: {
            title: {
                text: "Cantidad por parque"
              },
          chart: {
            height: 350,
            type: 'bar',
            events: {
              click: function(chart, w, e) {
                // console.log(chart, w, e)
              }
            }
          },
          plotOptions: {
            bar: {
              columnWidth: '45%',
              distributed: true,
            }
          },
          dataLabels: {
            enabled: false
          },
          legend: {
            show: false
          },
          xaxis: {
            categories: props.categories,
            labels: {
              style: {
                fontSize: '12px'
              }
            }
          }
        },
      
      
      };
    }

  

    render() {
      return (
  <div id="chart">
        <Chart options={this.state.options} series={this.state.series} type="bar" height={350} />
        </div>
        );
        }
}
export default withEmptyData(BarChart,'data');