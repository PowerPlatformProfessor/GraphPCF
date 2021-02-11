import * as React from 'react'
import { useState, useEffect, useRef } from 'react';
import GraphType from '../Domain/GraphType';
import {GraphType as GraphTypeEnum} from '../Enums/GraphType';
import Scatter from '../Domain/Scatter';
import DataSetInterfaces = ComponentFramework.PropertyHelper.DataSetApi;
import Line from '../Domain/Line';
type DataSet = ComponentFramework.PropertyTypes.DataSet;

export interface IGraphProps {
    dataset: DataSet;    
    utils: ComponentFramework.Utility;    
    containerWidth?: number;
    containerHeight?: number;   
    columnsOnView?: DataSetInterfaces.Column[];
    graphType?: number;
    datasetLabel?: string;  
}

export const Graph = (props: IGraphProps) => {
    const myChartRef = useRef(null);
    const [divtext, setDivText] = useState("test");

    //component did mount and did update
    useEffect(() => {

        var ctx = (myChartRef as any).current.getContext('2d');

        switch(props.graphType){
            case GraphTypeEnum.Scatter: { 

                let scatterPlot = new Scatter(
                    GraphTypeEnum[GraphTypeEnum.Scatter].toLowerCase(),
                    props.dataset, 
                    props.columnsOnView,
                    props.datasetLabel
                );
                scatterPlot.draw(ctx);
                break; 
             } 
             case GraphTypeEnum.Line: { 
                
                let linearPlot = new Line(
                    GraphTypeEnum[GraphTypeEnum.Line].toLowerCase(), 
                    props.dataset, 
                    props.columnsOnView,
                    props.datasetLabel
                );
                linearPlot.draw(ctx);
                break; 
             } 
             default: { 
                break; 
             }
        }

        

    });

    return (
        <canvas id="myChart" width={props.containerWidth} height={props.containerHeight} ref={myChartRef}></canvas>
    )
}