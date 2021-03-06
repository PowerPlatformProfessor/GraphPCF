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
        var data:any[] = [];
		this._dataset.sortedRecordIds.forEach((currentRecordId, index)=> {
            console.log("row " + index);
            
            var dataObj = {x:"", y:""};
            this._columnsOnView?.forEach((columnItem, index) => {
                
                if(index == 0){
                    dataObj.x = this._dataset.records[currentRecordId].getFormattedValue(columnItem.name);
                }

                if(index == 1){
                    dataObj.y = this._dataset.records[currentRecordId].getFormattedValue(columnItem.name);
                }

            });
            data.push(dataObj);
        });

        this._data = {
            datasets: [
                {
                    label:this._datasetLabel!,
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