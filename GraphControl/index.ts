import React = require("react");
import ReactDOM = require("react-dom");
import { Graph, IGraphProps } from "./App/Graph";
import {IInputs, IOutputs} from "./generated/ManifestTypes";
import DataSetInterfaces = ComponentFramework.PropertyHelper.DataSetApi;
type DataSet = ComponentFramework.PropertyTypes.DataSet;

export class GraphControl implements ComponentFramework.StandardControl<IInputs, IOutputs> {

	private _container : HTMLDivElement;

	/**
	 * Empty constructor.
	 */
	constructor()
	{

	}

	/**
	 * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
	 * Data-set values are not initialized here, use updateView.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
	 * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
	 * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
	 * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
	 */
	public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container:HTMLDivElement)
	{
		this._container = container;

		// Need to track container resize so that control could get the available width.
		// In Model-driven app, the available height won't be provided even this is true
		// In Canvas-app, the available height will be provided in context.mode.allocatedHeight
		context.mode.trackContainerResize(true);
	}


	/**
	 * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
	 */
	public updateView(context: ComponentFramework.Context<IInputs>): void
	{
		// if (!context.parameters.graphDataSet.loading) {

		// 	if (context.parameters.graphDataSet.paging != null && context.parameters.graphDataSet.paging.hasNextPage == true) {
			
		// 		//set page size
		// 		context.parameters.graphDataSet.paging.setPageSize(5000);
				
		// 		//load next paging
		// 		context.parameters.graphDataSet.paging.loadNextPage();
			
		// 	} else {
				
		// 	}
		// }
		this.renderApp(context);
	}

	private renderApp(context: ComponentFramework.Context<IInputs>){
		let columnsOnView = this.getSortedColumnsOnView(context);
		if (!columnsOnView || columnsOnView.length === 0) {
			return;
		}

		const graphProps : IGraphProps = {
			dataset : context.parameters.graphDataSet, 
			utils : context.utils,  
			containerWidth : context.mode.allocatedWidth,
			containerHeight: context.mode.allocatedHeight, 
			columnsOnView: columnsOnView,
			graphType: parseInt(context.parameters.Graph_type.raw!),
			datasetLabel: context.parameters.datasetLabel.raw!
		};
		ReactDOM.render(React.createElement(Graph, graphProps), this._container);
	}
	private getSortedColumnsOnView(context: ComponentFramework.Context<IInputs>): DataSetInterfaces.Column[] {
		if (!context.parameters.graphDataSet.columns) {
			return [];
		}

		let columns = context.parameters.graphDataSet.columns;

		return columns;
	}

	/** 
	 * It is called by the framework prior to a control receiving new data. 
	 * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
	 */
	public getOutputs(): IOutputs
	{
		return {};
	}

	/** 
	 * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
	 * i.e. cancelling any pending remote calls, removing listeners, etc.
	 */
	public destroy(): void
	{
		ReactDOM.unmountComponentAtNode(this._container);
	}

}