import Chart from "./chart/chart.js"

class App {
  constructor() {
    this.chart = new Chart("app");
  };
  init() {
    this.chart.render();
    this.chart.componentDidMount();
  };
}

const app = new App();

window.addEventListener('load', () => app.init());