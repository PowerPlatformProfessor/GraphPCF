import GraphType from "./GraphType";
import {chartjsbands} from "../Lib/chartjs.bands"
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
            
            var dataSetObj = {x:"", y:""};
            this._columnsOnView?.forEach((columnItem, index) => {
                
                if(index == 0){ //have a prop for datatype, kvantitative or kvalitative
                    dataSetObj.x = this._dataset.records[currentRecordId].getFormattedValue(columnItem.name);
                }

                if(index == 1){
                    dataSetObj.y = this._dataset.records[currentRecordId].getFormattedValue(columnItem.name);
                }

            });

            dataSet.push(dataSetObj);
            
        });

        var data:any[] = dataSet.map(point => point.y);
        var labels:any[] = dataSet.map(point => point.x);


        this._data = {
            labels: labels,
            datasets: [
                {
                    label: this._datasetLabel!,
                    borderColor:'red',
                    backgroundColor: 'rgba(0, 204, 255, 0.1)',
                    data: data
                }
            ]
        };

    }

    public draw(context:any): void {
        new chartjsbands.chartjsbands(context, {
                        type: this._type,

                        data: this._data,
                        options: {
                            bands: {
                                yValue: 18   ,                // The threshold value on the yAxis (default is false)
                                bandLine: { 	              // The display properties of the threshold line
                                    stroke: 1, 
                                    colour: 'black',
                                    type: 'solid',            // 'solid' or 'dashed'
                                    label: '18 degrees',                 
                                    fontSize: '12',
                                    fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
                                    fontStyle: 'normal'
                                },
                                belowThresholdColour: [      // An array of the colors that describes the below threshold colour to use the above threshold color is inherited from the dataset
                                    'rgba(0, 204, 255, 0.1)'
                                ]
                            },
                            plugins: {
                                title: {
                                    display: true,
                                    text: 'Chart.js Scatter Chart'
                                }
                            }
                        }
        } as any);
    }

}