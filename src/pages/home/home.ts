import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular'; 
import { Api } from '../../providers/api';
import { SinglePage } from '../single/single';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [Api]
})

export class HomePage {
  datas:any;
  type:boolean = false;
  pagination: number = 1;
  searchKeyword: string = "";
  constructor(public navCtrl: NavController, 	private toast: ToastController, private api: Api) {
    api.index(1).subscribe( data => {
      this.datas = data.json();
    });
  }
 
  openSinglePage(url){
    this.navCtrl.push(SinglePage, {
      url:url
    })
  }

  search(keyword){
    this.api.search(keyword,1).subscribe(data=>{
      this.datas = data.json()
    });
  }
 
  onCancel(ev){
    if(!ev.target.value){
      this.api.index(1).subscribe(data => {
        this.datas = data.json();
      })
    }
  }

  infiniteScroll(ev){
    this.pagination++;
    if(this.type === false){
      this.api.index(this.pagination).subscribe(data=>{
 
        ev.complete()
        if(data.json().length === 0){
          let toast = this.toast.create({
            message: 'Não há informações para carregar',
            duration: 3000
          });
          toast.present()
        }else{
          for(let i of data.json()){
            this.datas.push(i);
          }
        }
 
      })
    }else if(this.type === true){
      this.api.search(this.searchKeyword, this.pagination).subscribe(data => {
 
        if(data.json().length === 0){
          let toast = this.toast.create({
            message: 'Não há informações para carregar',
            duration: 3000
          });
          toast.present();
        }else{
          for(let i of data.json()){
            this.datas.push(i);
          }
        }
 
      });
    }
  }

  doRefresh(ev){
    this.api.index(1).subscribe(data => {
      ev.complete();
      this.searchKeyword = "";
      this.pagination = 1;
      this.type = false;
      this.datas = data.json();
    });
  }
 
}