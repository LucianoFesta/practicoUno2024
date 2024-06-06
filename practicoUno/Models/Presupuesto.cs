using System.ComponentModel.DataAnnotations;

namespace practicoUno.Models
{
    public class Presupuesto
    {
        [Key]
        public int PresupuestoID { get; set; }
        public string Nombre { get; set; }
        public string Descripcion { get; set; }
        public DateTime FechaInicio { get; set; }
        public DateTime FechaFin { get; set; }
        public decimal ImportePresupuesto { get; set; }
        public Estado Estado { get; set; }
    }

    public class PresupuestoMostrar
    {
        public int PresupuestoID { get; set; }
        public string Nombre { get; set; }
        public string Descripcion { get; set; }
        public DateTime FechaInicio { get; set; }
        public DateTime FechaFin { get; set; }
        public decimal ImportePresupuesto { get; set; }
        public Estado EstadoInt { get; set; }
        public string NombreEstado { get; set; }
    }

    public enum Estado
    {
        Pendiente = 1,
        Desarrollo,
        Finalizado
    }
}