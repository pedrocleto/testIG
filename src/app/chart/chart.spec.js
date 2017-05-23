import Chart from "./chart.js"

describe("chart rendered", ()=> {
let chart
     beforeEach(()=> {
        // This component does not use any lifecycle methods or broadcast
        // events so it does not require rendering to the DOM to be tested.
        let elementName = "app";
     chart = new Chart(elementName);
        
    });
    it("expects to be a div",()=> {
        expect(chart.chartData).toEqual([]);
    });
});
