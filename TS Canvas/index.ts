abstract class Diagram {
    private _canvas: HTMLCanvasElement;
    protected _context: CanvasRenderingContext2D;
    private _title: string;
    private _data: Array<Map<number, number>>;

    constructor(canvasId: string, title: string, data: Array<Map<number, number>>) {
        this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
        this.title = title;
        this.data = data;
    }

    public get title(): string { return this._title; }
    public set title(value: string) { this._title = value; }
    public get data(): Array<Map<number, number>> { return this._data; }
    public set data(value: Array<Map<number, number>> ) { this._data = value; }

    protected clear(): void {
        //TODO:some instructions for clearing canvas
    }

    protected prerender(): void {
        this.clear();
        //TODO:some instructions for drawing frame with title
    }

    public set canvas(value: HTMLCanvasElement) {
        this._canvas = value;
        this._context = this._canvas.getContext("2d");
    }

    public abstract render(): void;
}

class Graph extends Diagram {
    private coordinatePrerender() {
        //TODO:some instructions for drawing Cartesian coordinate system
    }

    public render(): void {
        this.prerender();
        this.coordinatePrerender();
        //TODO:implementation of render method of Graph by this.data with this._context
    }
}

class Histogram extends Diagram {
    public render(): void {
        this.prerender();
        //TODO:implementation of render method of Histogram by this.data with this._context
    }
}

class PieChart extends Diagram {
    public render(): void {
        this.prerender();
        //TODO:implementation of render method of Pie Chart by this.data with this._context
    }
}