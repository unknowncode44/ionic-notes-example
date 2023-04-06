import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-waiting',
  templateUrl: './waiting.page.html',
  styleUrls: ['./waiting.page.scss'],
})


export class WaitingPage implements OnInit {



  constructor(private navControl: NavController, private route: ActivatedRoute,) { }

  ngOnInit() {
    
    this.setTi()
  }

  async setTi(): Promise<void> {
    setTimeout(() => {
      let noteId = this.route.snapshot.paramMap.get('id');
      this.navControl.navigateRoot(`/notes/${noteId}`)
    }, 2000)
  }
}
