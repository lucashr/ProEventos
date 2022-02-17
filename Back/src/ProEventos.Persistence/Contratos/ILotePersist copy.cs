using System.Threading.Tasks;
using ProEventos.Domain;

namespace ProEventos.Persistence.Contratos
{
    public interface ILotePersist
    {
        /// <summary>
        /// Retorna uma lista de lotes por eventoId
        /// </summary>
        /// <param name="eventoId">Código chave da tabela Evento</param>
        /// <returns>Array de Lotes</returns>
         Task<Lote[]> GetLotesByEventoIdAsync(int eventoId);

         /// <summary>
         /// Retorna apenas um lote
         /// </summary>
         /// <param name="eventoId">Código chave da tabela Evento</param>
         /// <param name="id">Código chave da tabela Lote</param>
         /// <returns>Apenas 1 lote</returns>
         Task<Lote> GetLoteByIdsAsync(int eventoId, int id);

    }
}