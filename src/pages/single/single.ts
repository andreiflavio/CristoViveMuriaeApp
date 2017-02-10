import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { CommentPage } from '../comment/comment'; 
import { SocialSharing } from 'ionic-native';

/*
  Generated class for the Single page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-single',
  templateUrl: 'single.html'
})

export class SinglePage {
  datas:any = [];
  comments:any;
  constructor(private navCtrl: NavController, params: NavParams, private modalCtrl: ModalController, 
    private http: Http) {
    this.http.get(params.data.url+"/?_embed").subscribe(data=>{
      this.datas.push(data.json());
 
      this.http.get(data.json()._links.replies[0].href).subscribe(comment=>{
        this.comments = comment.json()
      });
 
    });
  }

  whatsappShare(){
    SocialSharing.shareViaWhatsApp("Message via WhatsApp", null /*Image*/,  "http://pointdeveloper.com/" /* url */)
      .then(()=>{
        alert("Success");
      },
      ()=>{
          alert("failed")
      })
  }

  twitterShare(){
    SocialSharing.shareViaTwitter("Message via Twitter",null /*Image*/,"http://pointdeveloper.com")
    .then(()=>{
        alert("Success");
      },
      ()=>{
          alert("failed")
      })
  }

  facebookShare(){
    SocialSharing.shareViaFacebook("Message via Twitter",null /*Image*/,"http://pointdeveloper.com")
    .then(()=>{
        alert("Success");
      },
      ()=>{
          alert("failed")
      })
  }

  otherShare(){
    SocialSharing.share("Genral Share Sheet",null/*Subject*/,null/*File*/,"http://pointdeveloper.com")
    .then(()=>{
        alert("Success");
      },
      ()=>{
          alert("failed")
      })

  }

  openCommentPage(url){
    let modal = this.modalCtrl.create(CommentPage,{
      url:url
    });
    modal.present()
  }
 
}
