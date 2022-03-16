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
    this.accountService.getUser();
  }

  private validation() : void {

    const formOptions: AbstractControlOptions = {
      validators: ValidatorField.MustMatch('password', 'confirmePassword')
    };

    this.form = this.fb.group({
      titulo: ['', [Validators.required]],
      primeiroNome: ['', Validators.required],
      ultimoNome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', Validators.required],
      funcao: ['',[Validators.required]],
      password: ['',[Validators.minLength(4),  Validators.nullValidator, ]],
      confirmePassword: ['', Validators.nullValidator],
    }, formOptions);
  }

  onSubmit() : void {
    if (this.form.invalid){
      return;
    }
  }

  resetForm(event: any): void {
    event.preventDefault();
    this.form.reset();
  }

}
