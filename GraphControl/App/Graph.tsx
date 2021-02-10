import * as React from 'react'
import { useState, useEffect, useRef } from 'react';
import Scatter from '../Domain/Scatter';
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

        var ctx = (myChartRef as any).current.getContext('2d');

        //beroende på enum graphtype skapa upp olika objekt och rendera
        let scatterPlot = new Scatter("scatter", props.dataset, props.columnsOnView)
        scatterPlot.draw(ctx);

    });

    return (
        <canvas id="myChart" width={props.containerWidth} height={props.containerHeight} ref={myChartRef}></canvas>
    )
}