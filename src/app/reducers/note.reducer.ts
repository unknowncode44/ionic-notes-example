//! Como dijimos en el archivo de acciones, las mismas solo describen lo que queremos hacer
//! son los reducers los que se encargan de tomar el old state y la accion para generar un nuevo state

// primero importamos todas las acciones desde nuestro archivo actions, de modo que podamos usarlas 
import * as fromNote from '../actions/note.actions'

// importamos nuestro modelo, por que lo usaremos en el state de la nota
import { Note } from '../models/note.model'

// creamos la estructura de nuestro state creando una interfaz
export interface NoteState {
    data: Note[]
}

// y definimos nuestro estado inicial
// los datos de las notas seran la nota por si misma, con lo cual solo creamos eso
export const initialState: NoteState  = {
    data: []
}

// la funcion reducer tendra la logica de la accion elegida, usando un switch case 
// para actuar de acuerdo a las acciones posibles

// para empezar la funcion usa como parametro el estado inicial, y la accion y retorna un nuevo estado
export function reducer(
    state = initialState,
    action: fromNote.ActionsUnion) : NoteState {

        // dependiendo la accion que elegimos actuamos de diferentes maneras
        switch (action.type) {

            // en el caso de creacion de la nota
            case fromNote.NoteActionTypes.CreateNote: {
                // retornamos un nuevo estado, con los datos de la nota nueva
                return {
                    // usamos el spread operator para devolver el mismo array con la nueva nota
                    ...state,
                    // y en la data pasamos la data anterior con la nueva data
                    data: [...state.data, action.payload.note],
                };
            }

            // hacemos lo propio para eliminar notas, retornamos el estado pero modificamos la data
            case fromNote.NoteActionTypes.DeleteNote: {
                return {
                    ...state,
                    // usamos .splice para quitar la nota que queremos sacar
                    ...state.data.splice(state.data.indexOf(action.payload.note), 1),
                };
            }
            // la opcion por defecto sera el estado inicial
            default: {
                return state
            }
        }
    }

// creamos funciones para leer la informacion en nuestro store usando el metodo createSelector de NgRx

// podemos obtener todas las notas, pasando el state y extrayendo sus datos
export const getNotes = (state: NoteState) => state.data;

// podemos obtener una nota por id, de la misma manera pero pasando el id en argumentos
export const getNoteByid = (state: NoteState, props: { id: string }) =>
    state.data.find((note) => note.id === props.id);
