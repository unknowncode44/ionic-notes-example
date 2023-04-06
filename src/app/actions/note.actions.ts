import { Action } from "@ngrx/store";
import { Note } from "../models/note.model";

//! Crearemos las acciones de las notas. Las acciones solo describen nuestra intencion
//! pero no aplicaremos ningun tipo de logica, solo describiremos que haremos
//! en este caso solo crear y eliminar notas

// primero enumeramos las acciones que son relativas a las notas

export enum NoteActionTypes {
    // le damos un nombre y una breve descripcion de lo que haran
    // entre corchetes indicamos donde las usaremos, en este caso en note service
    CreateNote = "[Notes Service] Create Note",
    DeleteNote = "[Notes Service] Delete Note"
}

// luego creamos clases que extienden la clase Action de NGRX

export class CreateNote implements Action {
    // definimos un tipo para decir que clase accion es
    readonly type = NoteActionTypes.CreateNote;
    
    // y colocamos un payload (informacion adicional propia de la accion) para esa accion (que puede ser opcional)
    // en este caso para crear/eliminar notas deberemos mandar este payload
    constructor(public payload: {note: Note}){}
}

export class DeleteNote implements Action {
    readonly type = NoteActionTypes.DeleteNote;
    constructor(public payload: {note: Note}){}
}

// finalmente el typo ActionsUnion exportara cada accion descrita en este archivo
export type ActionsUnion = CreateNote | DeleteNote


