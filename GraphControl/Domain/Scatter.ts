import GraphType from "./GraphType";
import {Chart} from "chart.js";
import DataSetInterfaces = ComponentFramework.PropertyHelper.DataSetApi;

type DataSet = ComponentFramework.PropertyTypes.DataSet;
export default class Scatter extends GraphType{
   

    constructor(type: string, dataset: DataSet, columnsOnView?:DataSetInterfaces.Column[]){
        super(type, dataset, columnsOnView);
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
                    label: 'My First dataset',
                    borderColor:'rgba(0, 204, 255, 0.1)',
                    backgroundColor: 'rgba(0, 204, 255, 0.1)',
                    data: data
                },
                {
                    label: 'My Second dataset',
                    borderColor:'rgba(255, 0, 0, 0.1)',
                    backgroundColor: 'rgba(255, 0, 0, 0.1)',
                    data: [{x: 1, y:1}, {x: 2, y:2}, {x: 3, y:3}]
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