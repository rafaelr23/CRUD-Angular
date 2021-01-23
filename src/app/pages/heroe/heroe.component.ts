import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HeroeModule } from '../../models/heroe/heroe.module';
import { HeroesService } from '../../services/heroes.service';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {
  
  heroe = new HeroeModule();

  constructor( private heroesServices:HeroesService,
               private router:ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.router.snapshot.paramMap.get('id');
    if( id !== 'nuevo'){
     this.heroesServices.getHeroe(id).subscribe((resp:HeroeModule) =>{
        this.heroe = resp
        this.heroe.id = id;
    
      });

    }
  }

 

  guardar(form:NgForm){
    if(form.invalid){
      console.log("Formulario no valido");
      return
    }

    Swal.fire({
      title:'Espere',
      text:'Guardando informacion',
      icon:'info',
      allowOutsideClick: false
    });
    Swal.showLoading();

    let peticion:Observable<any>;
    if(this.heroe.id){
      peticion = this.heroesServices.actualizarHeroe(this.heroe);
    }else{
     peticion = this.heroesServices.crearHeroe(this.heroe);
      
    }
    peticion.subscribe(resp =>{
      Swal.fire({
        title:this.heroe.nombre,
        text: 'Se actualizo correctamente',
        icon:'success'
      });
    })
  }
}
