import {
    ActionReducer,
    ActionReducerMap,
    createFeatureSelector,
    createSelector,
    MetaReducer
} from '@ngrx/store'

//! ya creamos nuestras acciones y los reducers para la logica de las mismas, ahora en este archivo
//! necesitamos implementarlos 

import { environment } from 'src/environments/environment'

// importamos todo de nuestro reducer
import * as fromNote from './note.reducer'

// la interfaz State es la que contendra nuestros diferentes reducers, en este caso solo hay uno, el de las notas
export interface State {
    notes: fromNote.NoteState;
}


export const reducers: ActionReducerMap<State> = {
    notes: fromNote.reducer,
}

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

// para usar selectores, con las funciones creadas en reducer, primero indicamos que vamos 
// a necesitar el state de notas, de nuestro arbol de estado
export const getNotesState = (state: State) => state.notes;

// despues creamos selectores (createSelector de NgRx) con las funciones que creamos y pasamos el selector
// para obtener todas las notas
export const getAllNotes = createSelector(getNotesState, fromNote.getNotes)

// para obtener una nota por id
export const getNoteById = createSelector(getNotesState, fromNote.getNoteByid)