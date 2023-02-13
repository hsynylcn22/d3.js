(function (React$1, ReactDOM, d3$1) {
    'use strict';
  
    var React$1__default = 'default' in React$1 ? React$1['default'] : React$1;
    ReactDOM = ReactDOM && Object.prototype.hasOwnProperty.call(ReactDOM, 'default') ? ReactDOM['default'] : ReactDOM;
  
    const csvUrl =
      'https://gist.githubusercontent.com/vdvoorder/839ca31d5ec82e9160ee76fcb6799885/raw/daily-atmospheric-conditions_belgium_2021.csv';
  
    const useData = () => {
      const [data, setData] = React$1.useState(null);
  
      React$1.useEffect(() => {
        const row = (d) => {
                d.date = new Date(d.date),
          d.year = d.date.getFullYear(),
          d.air_pressure = +d.air_pressure,
          d.air_temperature_avg = +d.air_temperature_avg,
          d.air_temperature_max = +d.air_temperature_max,
          d.air_temperature_min = +d.air_temperature_min,
          d.relative_humidity = +d.relative_humidity,
          d.precipitation = +d.precipitation,
          d.wind_speed = +d.wind_speed;
          return d;
        };
        d3$1.csv(csvUrl, row).then((data) => {
          setData(data
                  //.slice(0, 50)
                                .sort(function(a, b) {
                              return d3.ascending(a.date, b.date)
                                })
                );
        });
      }, []);
      return data;
    };
  
    const AxisBottom = ({ xScale, innerHeight, tickFormat, tickOffset = 0 }) =>
      xScale.ticks().map((tickValue) => (
        React.createElement( 'g', { className: "tick", key: tickValue, transform: `translate(${xScale(tickValue)},0)` },
          React.createElement( 'line', { y2: innerHeight }),
          React.createElement( 'text', {
            style: { textAnchor: 'middle' }, dy: ".71em", y: innerHeight + tickOffset },
            tickFormat(tickValue)
          )
        )
      ));
  
    const AxisLeft = ({ yScale, innerWidth, tickOffset = 3 }) =>
      yScale.ticks().map((tickValue) => (
        React.createElement( 'g', { className: "tick", transform: `translate(0,${yScale(tickValue)})` },
          React.createElement( 'line', { x2: innerWidth }),
          React.createElement( 'text', {
            key: tickValue, style: { textAnchor: 'end' }, x: -tickOffset, dy: ".32em", y: yScale(tickValue) },
            tickValue
          )
        )
      ));
  
    const Marks = ({
      data,
      xScale,
      yScale,
      xValue,
      yValue,
   
    }) => (
      React.createElement( 'g', { className: "marks" },
        React.createElement( 'path', {
          fill: "none", stroke: "black", d: d3$1.line()
            .x(d => xScale(xValue(d)))
            .y(d => yScale(yValue(d)))
            .curve(d3$1.curveNatural)
            (data) })
        
  
        
      )
    );
  
    const width = 960;
    const height = 500;
    const margin = {
      top: 30,
      right: 30,
      bottom: 60,
      left: 80,
    };
    const xAxisLabelOffset = 45;
    const yAxisLabelOffset = 45;
    const xValue = (d) => d.date;
    const xAxisLabel = 'Time';
    const yValue = (d) => d.air_temperature_avg;
    const yAxisLabel = 'Average air temperature (°C)';
  
    const xAxisTickFormat = d3$1.timeFormat("%m-'%y");
  
    const App = () => {
      const data = useData();
  
      if (!data) {
        return React$1__default.createElement( 'pre', null, "Loading data..." );
      }
        
      console.log(data[0]);
      
      const innerHeight = height - margin.top - margin.bottom;
      const innerWidth = width - margin.left - margin.right;
      const xScale = d3$1.scaleTime()
        .domain(d3$1.extent(data, xValue))
        .range([0, innerWidth])
          .nice();
      const yScale = d3$1.scaleLinear()
        .domain(d3$1.extent(data, yValue))
        .range([innerHeight, 0])
          .nice();


      return (
        React$1__default.createElement( 'svg', { width: width, height: height },
          React$1__default.createElement( 'g', { transform: `translate(${margin.left},${margin.top})` },
            React$1__default.createElement( AxisBottom, {
              xScale: xScale, innerHeight: innerHeight, tickFormat: xAxisTickFormat, tickOffset: 7 }),
            React$1__default.createElement( AxisLeft, {
              yScale: yScale, innerWidth: innerWidth }),
                    React$1__default.createElement( Marks, {
              data: data, xScale: xScale, yScale: yScale, xValue: xValue, yValue: yValue, tooltipFormat: xAxisTickFormat, circleRadius: 3 }),
            React$1__default.createElement( 'text', {
              className: "axis-label", x: innerWidth / 2, y: innerHeight + xAxisLabelOffset, textAnchor: "middle", tickOffset: 7 },
              xAxisLabel
            ),
            React$1__default.createElement( 'text', {
              className: "axis-label", textAnchor: "middle", transform: `translate(${-yAxisLabelOffset},${innerHeight / 2}) rotate(-90)` },
              yAxisLabel
            )
          )
        )
      );
    };
  
    const rootElement = document.getElementById('root');
    ReactDOM.render(React$1__default.createElement( App, null ), rootElement);
  
  }(React, ReactDOM, d3));
  