import html from './html';

export default class Chart {
  constructor(elementName) {
      this.paggingObject={
          limit:10,
          start:0,
          max:10
      }    

      this.el = document.getElementById(elementName);

      this.chartData=[];

      this.loadDataFromServer= this.loadDataFromServer.bind(this);
  }

  componentDidMount() {
     this.loadDataFromServer();
  }
  
  loadDataFromServer() {
      fetch("/api/getData").then((response)=>{
          return response.json();
      }).then((values)=>{
          this.updateChartProvider(values);
      })
  }
  pageForward(){
    if(this.paggingObject.page ===this.paggingObject.totalPages){
        this.paggingObject.start =  0
        this.paggingObject.max =  this.paggingObject.limit;
        this.paggingObject.page =  1
    }else{
        this.paggingObject.start = this.paggingObject.start + this.paggingObject.limit;
        this.paggingObject.max = this.paggingObject.max + this.paggingObject.limit
        this.paggingObject.page += 1;
    }
    

    this.refreshTable();
  }

  pageBackward(){
      if(this.paggingObject.page ===1){
        this.paggingObject.start =  this.paggingObject.totalPages - this.paggingObject.limit;
        this.paggingObject.max =  this.paggingObject.totalPages
        this.paggingObject.page =  this.paggingObject.totalPages;
      }
      else{
        this.paggingObject.start = this.paggingObject.start - this.paggingObject.limit;
        this.paggingObject.max = this.paggingObject.max - this.paggingObject.limit
        this.paggingObject.page -= 1;
      }
     
     this.refreshTable();
  }

  updateChartProvider(values){
    this.chartData= values.concat(); 
    this.paggingObject.totalPages = Math.ceil(this.chartData.length/this.paggingObject.limit);
    this.paggingObject.page = 1;

    this.refreshTable();
  }

  refreshTable(){
    let oldtableBody = document.querySelector(".data-table tbody")
    let new_tbody = document.createElement('tbody');
    this.pageCount.textContent = this.paggingObject.page + '/' + this.paggingObject.totalPages;

       for (let i =this.paggingObject.start ; i<=this.paggingObject.max;i++){
         if(this.chartData[i]) {
             let data = this.chartData[i];
             let tableRow = `
                    <tr>
                    <td class="pa3 bb b--black-10">
                        ${data.x}
                    </td>
                    <td class="pa3 bb b--black-10">
                        ${data.y}
                    </td>
                    </tr>
                `
            new_tbody.insertAdjacentHTML("beforeend", tableRow)
         }
         else{
             break;
         }

        }
        
        oldtableBody.parentNode.replaceChild(new_tbody, oldtableBody)
  }

  render() {
     this.el.innerHTML = html`
            <div id="controls">
  <table class="bg-white w-100 data-table" cellspacing="0">
      <thead>
        <tr>
          <th class="tl pa3 bb b--black-10">X</th>
          <th class="tl pa3 bb b--black-10">Y</th>
        </tr>
      </thead>
      <tbody>
        <!-- To be populated via JS -->
      </tbody>
    </table>
    <div> <button id="back"><</button><label id="pageCount">1/1</label><button id="forward">></button></div>
                </div>
        `;

    this.buttonBack = document.getElementById("back");
    this.buttonForward = document.getElementById("forward");
    this.pageCount = document.getElementById("pageCount");

    this.buttonBack.addEventListener("click", this.pageBackward.bind(this));
    this.buttonForward.addEventListener("click", this.pageForward.bind(this));


  }
}