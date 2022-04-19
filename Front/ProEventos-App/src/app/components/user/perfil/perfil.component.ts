import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidatorField } from '@app/helpers/ValidatorField';
import { UserUpdate } from '@app/model/identity/UserUpdate';
import { AccountService } from '@app/services/account.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  UserUpdate = {} as UserUpdate;
  form!: FormGroup;

  get f(): any {
    return this.form.controls;
  }

  constructor(
    public fb: FormBuilder,
    public accountService: AccountService,
    private router: Router,
    private toaster: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.validation();
    this.carregarUsuario();
  }

  private carregarUsuario(): void {
    this.spinner.show();
    this.accountService.getUser().subscribe(
      (userRetorno: UserUpdate) => {
        console.log(userRetorno);
        this.UserUpdate = userRetorno;
        this.form.patchValue(this.UserUpdate);
        this.toaster.success('Usuário Carregado', 'Sucesso');
      },
      (error) => {
        console.error(error);
        this.toaster.error('Usuário não Carregado', 'Erro');
        this.router.navigate(['/dashboard'])
      }
    )
    .add(() => this.spinner.hide())
  }

  private validation() : void {

    const formOptions: AbstractControlOptions = {
      validators: ValidatorField.MustMatch('password', 'confirmePassword')
    };

    this.form = this.fb.group({
      userName: [''],
      titulo: ['NaoInformado', [Validators.required]],
      primeiroNome: ['', Validators.required],
      ultimoNome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      descricao: ['', Validators.required],
      funcao: ['NaoInformado',[Validators.required]],
      password: ['',[Validators.minLength(4),  Validators.nullValidator, ]],
      confirmePassword: ['', Validators.nullValidator],
    }, formOptions);
  }

  onSubmit() : void {
    this.AtualizarUsuario();
  }

  AtualizarUsuario() {
    this.UserUpdate = { ...this.form.value }
    this.spinner.show();

    this.accountService.updateUser(this.UserUpdate).subscribe(
      () => this.toaster.success('Usuário atualizado!', 'Sucesso'),
      (error) => {
        this.toaster.error(error.error);
        console.error(error);
      },
    )
    .add(() => this.spinner.hide())
  }

  resetForm(event: any): void {
    event.preventDefault();
    this.form.reset();
  }

}
