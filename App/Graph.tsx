import * as React from 'react'
import { useState, useEffect } from 'react';

type DataSet = ComponentFramework.PropertyTypes.DataSet;

export interface IGraphProps {
    dataset: DataSet;    
    utils: ComponentFramework.Utility;    
    containerWidth?: number;
    containerHeight?: number;    
}

export const Graph = (props: IGraphProps) => {

    const [divtext, setDivText] = useState("test");

    //component did mount and did update
    useEffect(() => {
    });

    return (
        <div onClick={() => setDivText("Neeej!")}>
            {divtext}
        </div>
    )
}