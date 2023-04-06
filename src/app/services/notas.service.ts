import { Injectable } from '@angular/core';

// importamos Storage del paquete ionic/storage-angular (npm install @ionic/storage-angular)
import { Storage } from '@capacitor/storage'

// importamos nuestro interface nota
import { Note } from '../models/note.model';

// nuestras acciones y reducer
import * as NoteActions from '../actions/note.actions'
import { State, getAllNotes, getNoteById } from '../reducers'

// clases de NgRx
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

// nuestro servicio realizara las siguientes tareas
// crear y agregar notas a un array de notas
// eliminar notas del array de notas
// buscar y retornar una nota especifica por su id
// guardar el array de notas en almacenamiento
// cargar las notas desde el almacenamiento

export class NotasService {

  // declaramos nuestras variables
  // public notes  : Note[]  = []
  public notes: Observable<Note[]>
  public loaded : boolean = false;

  // inyectamos el store de NgRx
  constructor(
    private store: Store<State>
  ) {
    //! Nuevo metodo usando el store para obtener notas en constructor
    this.notes = this.store.select(getAllNotes)
   }

   //! Nuevo metodo usando el store para obtener nota
   getNote(id: string): Observable<Note> {
    return this.store.select(getNoteById, {id: id});
   }

   //! Nuevo metodo usando store para crear notas
   createNote(title: string): void {
    let id: string = Math.random().toString(36).substring(7);

    let note: Note = {
      id:  id.toString(),
      title: title,
      content: ""
    };

    // usamos el metodo dispatch del store para agregar la nota al store
    this.store.dispatch(new NoteActions.CreateNote({ note: note}))

   }


   //! Nuevo metodo usando store para eliminar notas
   // usamos el metodo dispatch del store para eliminar nota
   deleteNote(note: Note): void {
    this.store.dispatch(new NoteActions.DeleteNote({note: note}))
   }

  // creamos el metodo de carga de notas, que nos devuelve una promesa del tipo booleano:
  // loadNotes(): Promise<boolean> {
  //   // retornamos una promesa cuando sepamos que ya se cargaron las notas
  //   return new Promise((resolve) => {
  //     // obtenemos las notas que estan guardadas en storage
  //     Storage.get({key:'notes'}).then((_notes) => {
  //       let notes: Note[] = JSON.parse(_notes.value!)  
  //       // solo asignaremos this.notes si el valor no es null
  //       if(notes != null){
  //         this.notes = notes
  //       }

  //       // cambiamos el valor de loaded a true
  //       this.loaded = true
  //       resolve(true)

  //     });

  //   });


    
  // }

  async save() {
    // guardamos las notas en el storage
    await Storage.set({
      key: 'notes',
      value: JSON.stringify(this.notes)
    })
  }

  // getNote(id: string) {
  //   // retorna la nota por id
  //   return this.notes.find(note => note.id === id);
  // }


  // crear nueva nota
  // async createNote(title: string): Promise<void> {
  //   // creamos un valor unico para el id de la nota
  //   let id = Math.max(...this.notes.map(note => parseInt(note.id)), 0) + 1;

  //   this.notes.push({
  //     id: id.toString(),
  //     title: title,
  //     content: '',
  //   });

  //   await this.save().then(() => {
  //     console.log("Nota Guardada");
  //     return
  //   })

  // }

//   // eliminar nota
//   async deleteNote(note: Note): Promise<void> {

//     // obtenemos el indice de la nota
//     let index = this.notes.indexOf(note);

//     // borramos la nota con ese indice y guardamos los cambios
//     if(index > -1){
//       this.notes.splice(index, 1);
//       await this.save().then(() => {
//         return
//       })
      
//     }
//   }


}
