import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Evento } from '@app/model/Evento';
import { PaginatedResult, Pagination } from '@app/model/pagination';
import { Palestrante } from '@app/model/Palestrante';
import { PalestranteService } from '@app/services/palestrante.service';
import { environment } from '@environments/environment';
import { BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-palestrante-lista',
  templateUrl: './palestrante-lista.component.html',
  styleUrls: ['./palestrante-lista.component.scss']
})

export class PalestranteListaComponent implements OnInit {

  public Palestrantes: Palestrante[] = [];
  public palestranteId = 0;
  public pagination = {} as Pagination;

  constructor(
    private palestranteService: PalestranteService,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router
    ) { }

    termoBuscaChanged: Subject<string> = new Subject<string>();

  public ngOnInit(): void {
    this.pagination = {currentPage: 1, itemsPerPage: 3, totalItems: 1,} as Pagination;
    this.spinner.show();

    this.carregarPalestrantes();
  }

  public filtrarPalestrantes(evt: any) : void {
    if (this.termoBuscaChanged.observers.length == 0) {
      this.termoBuscaChanged.pipe(debounceTime(1000)).subscribe(
        filtrarPor => {
          this.spinner.show();
          this.palestranteService.getPalestrantes(
            this.pagination.currentPage,
            this.pagination.itemsPerPage,
            filtrarPor
          ).subscribe(
            (paginatedResult: PaginatedResult<Palestrante[]>) => {
              this.Palestrantes = paginatedResult.result;
              this.pagination = paginatedResult.pagination;
            },
            (error: any) => {
              this.spinner.hide();
              this.toastr.error('Erro ao carregar os Palestrantes', 'Erro!');
            }
          ).add(() => this.spinner.hide())
        }
      )
    }
    this.termoBuscaChanged.next(evt.value);
  }

  public getImagemUrl(imagemName: string): string {
    if(imagemName)
      return environment.apiURL + `resources/perfil/${imagemName}`;
    else
      return './assets/img/perfil.png';
  }

  public carregarPalestrantes(): void {
    this.spinner.show();

    this.palestranteService.getPalestrantes(this.pagination.currentPage,
                                            this.pagination.itemsPerPage).subscribe(
      (paginatedResult: PaginatedResult<Palestrante[]>) => {
        this.Palestrantes = paginatedResult.result;
        this.pagination = paginatedResult.pagination;
      },
      (error: any) => {
        this.spinner.hide();
        this.toastr.error('Erro ao carregar os eventos', 'Erro!');
      },
    ).add(() => this.spinner.hide());
  }


}
