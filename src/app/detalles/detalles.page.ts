import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { NotasService } from '../services/notas.service';
import { Note } from '../models/note.model';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.page.html',
  styleUrls: ['./detalles.page.scss'],
})
export class DetallesPage implements OnInit {

  public nota: Note 

  constructor(private route: ActivatedRoute, private notesService: NotasService, private navCtrl: NavController) {
    this.nota = {
      id: '',
      title: '',
      content: ''
    }
  }

  ngOnInit() {
    let noteId = this.route.snapshot.paramMap.get('id');

    this.notesService.getNote(noteId).subscribe(note => {
      this.nota = note
    })

    // if(this.notesService.loaded){
    //   this.nota = this.notesService.getNote(noteId!)!
    // } else {
    //   this.notesService.loadNotes().then(() => {
    //     this.nota = this.notesService.getNote(noteId!)!
    //   })
    // }
  }

  noteChanged(){
    this.notesService.save();
  }
  
  deleteNote(){
    this.notesService.deleteNote(this.nota);
    this.navCtrl.navigateBack('/notes');
  }

}
