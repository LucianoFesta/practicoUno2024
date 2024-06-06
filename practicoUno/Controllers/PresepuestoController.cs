using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using practicoUno.Data;
using practicoUno.Models;

namespace practicoUno.Controllers;

[Authorize]
public class PresupuestoController : Controller
{
    private  ApplicationDbContext _context;

    public PresupuestoController(ApplicationDbContext context)
    {
        _context = context;
    }

    public IActionResult Index()
    {

        var selectList = new List<SelectListItem>{
            new SelectListItem{
                Value = "0",
                Text = "[-- Seleccione --]"
            }
        };

        var listEnum = Enum.GetValues(typeof(Estado)).Cast<Estado>();
        selectList.AddRange(listEnum.Select(e => new SelectListItem{
            Value = e.GetHashCode().ToString(),
            Text = e.ToString()
        }));
        ViewBag.Estado = selectList.OrderBy(e => e.Text);

        return View();
    }

    public JsonResult ListadoPresupuestos(int? IdPresupuesto)
    {
        var listaPresupuestos = _context.Presupuestos.Select( e => new PresupuestoMostrar{
            PresupuestoID = e.PresupuestoID,
            Nombre = e.Nombre,
            Descripcion = e.Descripcion,
            FechaInicio = e.FechaInicio,
            FechaFin = e.FechaFin,
            ImportePresupuesto = e.ImportePresupuesto,
            NombreEstado = e.Estado.ToString(),
            EstadoInt = (Estado)e.Estado
        }).OrderByDescending(e => e.FechaFin).ToList();

        if(IdPresupuesto.HasValue){
            listaPresupuestos = listaPresupuestos.Where(e => e.PresupuestoID == IdPresupuesto).ToList();
        }

        return Json(new { success = true, result = listaPresupuestos });
    }

    public JsonResult GuardarPresupuesto(int PresupuestoID, string Nombre, string Descripcion, DateTime FechaInicio, DateTime FechaFin, decimal Importe, Estado Estado)
    {
        if(PresupuestoID == 0){

            var presupuestoGuardar = new Presupuesto{
                PresupuestoID = PresupuestoID,
                Nombre = Nombre,
                Descripcion = Descripcion,
                FechaInicio = FechaInicio,
                FechaFin = FechaFin,
                ImportePresupuesto = Importe,
                Estado = Estado
            };

            _context.Presupuestos.Add(presupuestoGuardar);
            _context.SaveChanges();

            return Json(new { success = true });

        }else{
            var editarPresupuesto = _context.Presupuestos.Where(e => e.PresupuestoID == PresupuestoID).SingleOrDefault();

            editarPresupuesto.PresupuestoID = PresupuestoID;
            editarPresupuesto.Nombre = Nombre;
            editarPresupuesto.Descripcion = Descripcion;
            editarPresupuesto.FechaInicio = FechaInicio;
            editarPresupuesto.FechaFin = FechaFin;
            editarPresupuesto.ImportePresupuesto = Importe;
            editarPresupuesto.Estado = Estado;

            _context.SaveChanges();

            return Json(new { success = true });
        }
    }

    public JsonResult EliminarPresupuesto(int PresupuestoID)
    {
        var eliminar = _context.Presupuestos.Where(e => e.PresupuestoID == PresupuestoID).SingleOrDefault();

        _context.Presupuestos.Remove(eliminar);
        _context.SaveChanges();
        
        return Json(new { success = true });
    }
}