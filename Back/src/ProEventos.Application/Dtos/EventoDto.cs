using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using ProEventos.Domain;

namespace ProEventos.Application.Dtos
{
    public class EventoDto
    {
        public int Id { get; set; }
        public string Local { get; set; }
        public string DataEvento { get; set; }
        [Required(ErrorMessage = "O campo {0} é obrigatório"),
        // MinLength(3, ErrorMessage = "{0} deve ter no mínimo 4 caracteres"),
        // MaxLength(50, ErrorMessage = "{0} deve ter no máximo 50 caracteres")
        StringLength(50, MinimumLength = 3, ErrorMessage = "{0} deve ter no mínimo 3 e no máximo 50 caracteres")
        ]
        public string Tema { get; set; }

        [Display(Name = "Qtd Pessoas")]
        [Range(1, 120000, ErrorMessage = "{0} não pode ser menor que 1 e maior que 120.000")]
        public int QtdPessoas { get; set; }

        [RegularExpression(@".*\.(gif|jpe?g|bmp|png)$", ErrorMessage = "Não é uma imagem válida. (gif, jpg, jpeg, bmp ou png)")]
        public string ImagemUrl { get; set; }

        [Required(ErrorMessage = "O campo {0} é obrigatório")]
        [Phone(ErrorMessage = "O campo {0} está com número inválido")]
        public string Telefone { get; set; }
    
        [Required(ErrorMessage = "O campo {0} é obrigatório"),
        Display(Name = "e-mail"),
        EmailAddress(ErrorMessage = "O campo e-mail deve ser válido")]
        public string Email { get; set; }
        public int UserId { get; set; }
        public UserDto UserDto { get; set; }
        public IEnumerable<Lote> Lotes { get; set; }
        public IEnumerable<RedeSocial> RedesSociais { get; set; }
        public IEnumerable<PalestranteEvento> Palestrante { get; set; }
    }
}