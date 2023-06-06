import { Component } from '@angular/core';
import { Tutorial } from 'src/app/models/tutorial.model';
import { TutorialService } from 'src/app/services/tutorial.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-add-tutorial',
  templateUrl: './add-tutorial.component.html',
  styleUrls: ['./add-tutorial.component.css']
})
export class AddTutorialComponent {
  tutorial: Tutorial = new Tutorial();
  submitted = true;
  CEPvalid: boolean = false;
  

  constructor(private tutorialService: TutorialService, private toastr: ToastrService) { }

  saveTutorial(): void {
    this.tutorialService.create(this.tutorial).then(() => {
      console.log('Created new item successfully!');
      this.submitted = true;
    });
  }

  newTutorial(): void {
    this.submitted = false;
    this.tutorial = new Tutorial();
  }

  consultaCep(CEP: string) {
    this.tutorialService.buscarCep(CEP).subscribe((dados) => this.populaDadosForm(dados));
  }
  populaDadosForm(dados: any) {
    if(dados.erro) {
      this.CEPvalid = false;
      this.toastr.error('Ops. CEP infomado incorreto')

      return;
    }
    this.CEPvalid = true;

    this.tutorial.cep = dados.cep;
    this.tutorial.rua = dados.logradouro;
    this.tutorial.estado = dados.uf;
    this.tutorial.cidade = dados.localidade;
  }
}