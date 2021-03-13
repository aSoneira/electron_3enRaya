export class Coordenadas {
    private i_x: number;
    private i_y: number;

    constructor(co:Object) {
        this.i_x = co['i_x'];
        this.i_y = co['i_y'];
    }

    public getI_x() : number{
        return this.i_x;
    }

    public getI_y() : number{
        return this.i_y;
    }

    public setI_x(i_x : number) : void{
        this.i_x = i_x;
    }

    public setI_y(i_y : number) : void{
        this.i_y = i_y;
    }
}