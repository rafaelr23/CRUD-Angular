import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { HeroeModule } from '../../models/heroe/heroe.module';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: HeroeModule[] = [];
  cargando:boolean=false;


  constructor( private heroesServices:HeroesService) { }

  ngOnInit() {
    this.cargando = true;  
    
    this.heroesServices.getHeroes().subscribe(resp =>{
        this.heroes = resp;
        this.cargando = false;
    });
  }
  
  borrarHeroe(heroe:HeroeModule, index:number){
    Swal.fire({
      title:'¿Esta seguro?',
      text:`Esta seguro que quiere borrar a ${heroe.nombre}?`,
      icon:'question',
      showConfirmButton:true,
      showCancelButton:true
    }).then( resp =>{
        if(resp.value){
          this.heroes.splice(index,1);
          this.heroesServices.borrarHeroe(heroe.id).subscribe();
        }
    });
    

  }
}
