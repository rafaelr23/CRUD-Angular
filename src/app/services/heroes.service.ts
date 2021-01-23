import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HeroeModule } from '../models/heroe/heroe.module';
import { map,delay } from 'rxjs/operators';
import Swal from 'sweetalert2';




@Injectable({
  providedIn: 'root'
})
export class HeroesService {
  
  private url ='https://login-app-1d8af-default-rtdb.firebaseio.com';
  constructor( private http:HttpClient) { }

  crearHeroe(heroe:HeroeModule){
    return this.http.post(`${this.url}/heroes.json`,heroe).pipe(map((resp:any) =>{
      heroe.id = resp.name;
      return heroe;
    }));
  }

  actualizarHeroe(heroe:HeroeModule){
    const heroeTemp ={
      ...heroe
    };
    delete heroeTemp.id;
    return this.http.put(`${this.url}/heroes/${heroe.id}.json`,heroeTemp);
  }

  getHeroes(){
    return this.http.get(`${this.url}/heroes.json`).pipe(
      map( resp =>{
       
        delay(2500);
        return this.crearArreglo(resp);

      })
    );
  }

  getHeroe(id:string){
      return this.http.get(`${this.url}/heroes/${id}.json`);
  }

  borrarHeroe(id){
     return this.http.delete(`${this.url}/heroes/${id}.json`);
  }
  private crearArreglo(heroeObj:object){
    const heroes: HeroeModule[] = [];
  
    console.log(heroeObj);
    if(heroeObj === null){
      return [];
    }
    Object.keys(heroeObj).forEach(key =>{
  
      const heroe:HeroeModule = heroeObj[key];
      heroe.id = key;
      heroes.push(heroeObj[key]);
    })
    return heroes;
  }
}
