import DataSetInterfaces = ComponentFramework.PropertyHelper.DataSetApi;
type DataSet = ComponentFramework.PropertyTypes.DataSet;

export default abstract class GraphType{
    
    protected _type: string;
    protected _dataset: DataSet;
    protected _columnsOnView?: DataSetInterfaces.Column[];
    protected _data: {
        datasets: {
            label: string;
            borderColor: string;
            backgroundColor: string;
            data: any[];
        }[]
    };

    constructor(type: string, dataset: DataSet, columnsOnView?:DataSetInterfaces.Column[]){
        this._type = type;
        this._dataset = dataset;
        this._columnsOnView = columnsOnView;
    }

    public abstract transformDataSetToData(): void;

    public abstract draw(context:any):void;

}