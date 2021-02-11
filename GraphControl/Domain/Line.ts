import GraphType from "./GraphType";
import {Chart} from "chart.js";
import DataSetInterfaces = ComponentFramework.PropertyHelper.DataSetApi;

type DataSet = ComponentFramework.PropertyTypes.DataSet;
export default class Scatter extends GraphType{

    constructor(type: string, dataset: DataSet, columnsOnView?:DataSetInterfaces.Column[], datasetLabel?:string){
        super(type, dataset, columnsOnView, datasetLabel);
        this.transformDataSetToData();
    }

    public transformDataSetToData(): void {
        var dataSet:any[]= [];

		this._dataset.sortedRecordIds.forEach((currentRecordId, index)=> {
            
            var dataSetObj = {x:0, y:0};
            this._columnsOnView?.forEach((columnItem, index) => {
                
                if(index == 0){ //have a prop for datatype, kvantitative or kvalitative
                    dataSetObj.x = parseInt(this._dataset.records[currentRecordId].getFormattedValue(columnItem.name));
                }

                if(index == 1){
                    dataSetObj.y = parseInt(this._dataset.records[currentRecordId].getFormattedValue(columnItem.name));
                }

            });

            dataSet.push(dataSetObj);
            
        });
        //skapa ett set av unika värden på label axeln, lägg in datan i rätt bin. Blir en agregering.
        var sortedDataSet = dataSet.sort((a,b) => (a.x > b.x) ? 1 : ((b.x > a.x) ? -1 : 0));
        var data:any[] = sortedDataSet.map(point => point.y);
        var labels:any[] = sortedDataSet.map(point => point.x);


        this._data = {
            labels: labels,
            datasets: [
                {
                    label: this._datasetLabel!,
                    borderColor:'rgba(0, 204, 255, 0.1)',
                    backgroundColor: 'rgba(0, 204, 255, 0.1)',
                    data: data
                }
            ]
        };

    }

    public draw(context:any): void {
        new Chart(context, {
                        type: this._type,

                        data: this._data,
                        options: {
                            plugins: {
                                title: {
                                    display: true,
                                    text: 'Chart.js Scatter Chart'
                                }
                            }
                        }
        });
    }

}