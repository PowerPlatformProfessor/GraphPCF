import * as React from 'react'
import { useState, useEffect, useRef } from 'react';
import {Chart} from "chart.js";
import DataSetInterfaces = ComponentFramework.PropertyHelper.DataSetApi;
type DataSet = ComponentFramework.PropertyTypes.DataSet;

export interface IGraphProps {
    dataset: DataSet;    
    utils: ComponentFramework.Utility;    
    containerWidth?: number;
    containerHeight?: number;   
    columnsOnView?: DataSetInterfaces.Column[] 
}

export const Graph = (props: IGraphProps) => {
    const myChartRef = useRef(null);
    const [divtext, setDivText] = useState("test");

    //component did mount and did update
    useEffect(() => {

        var data:any[] = [];
		props.dataset.sortedRecordIds.forEach((currentRecordId, index)=> {
            console.log("row " + index);
            
            var dataObj = {x:"", y:""};
            props.columnsOnView?.forEach(function (columnItem, index) {
                
                if(index == 0){
                    dataObj.x = props.dataset.records[currentRecordId].getFormattedValue(columnItem.name);
                }

                if(index == 1){
                    dataObj.y = props.dataset.records[currentRecordId].getFormattedValue(columnItem.name);
                }

            });
            data.push(dataObj);
        });

        var ctx = (myChartRef as any).current.getContext('2d');
        var scatterChartData = {
            datasets: [{
                label: 'My First dataset',
                borderColor:'rgba(0, 204, 255, 0.1)',
				backgroundColor: 'rgba(0, 204, 255, 0.1)',
                data: data
            }, {
                label: 'My Second dataset',
                borderColor:'rgba(255, 0, 0, 0.1)',
				backgroundColor: 'rgba(255, 0, 0, 0.1)',
                data: [{x: 1, y:1}, {x: 2, y:2}, {x: 3, y:3}]
            }]
        };
        new Chart(ctx, {
            type: 'scatter',
            data: scatterChartData,
            options: {
                plugins: {
                    title: {
                        display: true,
                        text: 'Chart.js Scatter Chart'
                    }
                }
            }
        });

    });

    return (
        <canvas id="myChart" width={props.containerWidth} height={props.containerHeight} ref={myChartRef}></canvas>
    )
}