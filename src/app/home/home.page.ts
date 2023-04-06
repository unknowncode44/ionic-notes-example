import { Component, OnInit } from '@angular/core';
// estos controladores nativos de ionic nos ayudaran a implementar alertas y navegacion 
// propia de ionic
import { AlertController, NavController } from '@ionic/angular';
import { NotasService } from '../services/notas.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  searchBar: boolean = false

  // inyectamos los controladores de ionic en el constructor
  constructor(
    private alertCtrl: AlertController, 
    private navCtrl: NavController,
    public notesService: NotasService
    ) {}

  ngOnInit(): void {
  //  this.notesService.loadNotes() 
  }

  addNote(){
    this.alertCtrl.create({
      header: 'Nueva Nota',
      message: 'Agrega un titulo para esta Nota:',
      inputs: [
        {type: 'text', name: 'title'}
      ],
      buttons: [
        {text: 'Cancelar'},
        {text: 'Aceptar', handler: (data) => {this.notesService.createNote(data.title)}}
      ]
    }).then((alert) => alert.present());
  }

  showSearch() : void {
    if(!this.searchBar) {
      this.searchBar = true
    }
    else {
      this.searchBar = false
    }
  }

}
