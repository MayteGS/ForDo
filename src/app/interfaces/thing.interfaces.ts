export  interface Thing{
    ok:string,
    Things:Array<contentThing>
}

export interface contentThing{
    complit:boolean,
    create_date:string,
    thing:string,
    _id:string
}