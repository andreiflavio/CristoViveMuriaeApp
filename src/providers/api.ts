import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the Api provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Api {
  url: string;
  constructor(public http: Http) {
    this.url = 'http://www.thejavaprogrammer.com/wp-json/wp/v2/posts/?_embed&?filter[order]=DESC&filter[posts_per_page]=5&';  
    //this.url = 'http://cristovivemuriae.com.br//wp-json/wp/v2/posts/?_embed&?filter[order]=DESC&filter[posts_per_page]=5&'             
  }

  index(id)
  {
    return this.http.get(this.url + 'page='+id);    
  }

  search(keyword, id){
    return this.http.get(this.url + '&search=' + keyword + '&page='+id);
  }
}
