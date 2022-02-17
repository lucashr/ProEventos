using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ProEventos.Domain;
using ProEventos.Application.Contratos;
using Microsoft.AspNetCore.Http;
using ProEventos.Application.Dtos;

namespace ProEventos.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LotesController : ControllerBase
    {

        private readonly ILoteService _LoteService;

        public LotesController(ILoteService LoteService)
        {
            _LoteService = LoteService;
        }

        [HttpGet("{eventoId}")]
        public async Task<IActionResult> Get(int eventoId)
        {
            try
            {
                 var lotes = await _LoteService.GetLotesByEventoIdAsync(eventoId);
                 if(lotes == null) return NoContent();

                 return Ok(lotes);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar recuperar lotes. Erro: {ex.Message}");
            }
        }

        [HttpPut("{eventoId}")]
        public async Task<IActionResult> SaveLotes(int eventoId, LoteDto[] models)
        {
            try
            {
                 var lotes = await _LoteService.SaveLotes(eventoId, models);
                 if(lotes == null) return NoContent();

                 return Ok(lotes);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar salvar lotes. Erro: {ex.Message}");
            }
        }

        [HttpDelete("{eventoId}/{loteId}")]
        public async Task<IActionResult> Delete(int eventoId, int loteId)
        {
            try
            {

                var lote = await _LoteService.GetLoteByIdsAsync(eventoId, loteId);
                if(lote == null) return NoContent();

                return await _LoteService.DeleteLote(lote.EventoId, lote.Id) ?
                       Ok(new { message = "Lote Deletado"}) :
                       throw new Exception("Ocorreu um problema não específico ao tentar deletar Lote");
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar deletar Lotes. Erro: {ex.Message}");
            }
        }

    }
}
