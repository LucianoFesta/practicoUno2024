window.onload = listadoDePresupuestos();

function listadoDePresupuestos()
{

    $('#tbodyPresupuestos').empty();

    
    $.ajax({
        url: '../../Presupuesto/ListadoPresupuestos',
        data: { },
        type: 'GET',
        dataType: 'json',
        success: function(result){
            
            $('#modalCrearPresupuesto').modal('hide');
            if(result.success){
                $.each(result.result, function(i, ejercicio){
                    var fechaInicioFormateada = new Date(ejercicio.fechaInicio).toLocaleDateString('es-ES', {
                        day: '2-digit',
                        month: '2-digit',
                        year: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit'
                    });

                    var fechaFinFormateada = new Date(ejercicio.fechaFin).toLocaleDateString('es-ES', {
                        day: '2-digit',
                        month: '2-digit',
                        year: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit'
                    });

                    $('#tbodyPresupuestos').append(`
                        
                        <tr>
                            <th scope="row">${ejercicio.nombre}</th>
                            <td>${ejercicio.descripcion}</td>
                            <td>${fechaInicioFormateada}</td>
                            <td>${fechaFinFormateada}</td>
                            <td>$ ${ejercicio.importePresupuesto}</td>
                            <td>${ejercicio.nombreEstado}</td>
                            <td>
                                <button type="button" class="btn btn-primary" onclick="abrirModalEdicion(${ejercicio.presupuestoID})">Editar</button>
                            </td>
                            <td>
                                <button type="button" class="btn btn-danger" onclick="eliminar(${ejercicio.presupuestoID})">Eliminar</button>
                            </td>

                        </tr>

                        `)
                })
            }
        },
        error: function(e, status){
            alert('Ocurrió un inconveniente a la hora de mostrar el listado de presupuestos.');
        }
    })
}

function guardarPresupuesto()
{
    var presupuestoID = document.getElementById('presupuestoID').value; 
    var nombre = document.getElementById('nombre').value; 
    var descripcion = document.getElementById('descripcion').value; 
    var fechaInicio = document.getElementById('fechaInicio').value; 
    var fechaFin = document.getElementById('fechaFin').value; 
    var importePresupuesto = document.getElementById('importePresupuesto').value; 
    var estado = document.getElementById('Estado').value; 

    $.ajax({
        url: '../../Presupuesto/GuardarPresupuesto',
        data: { PresupuestoID : presupuestoID, Nombre : nombre, Descripcion : descripcion, FechaInicio : fechaInicio, FechaFin : fechaFin, Importe : importePresupuesto, Estado : estado},
        type: 'POST',
        dataType: 'json',
        success: function(result){
            if(result.success){
                listadoDePresupuestos();
            }
        },
        error: function(e, status){
            alert('Ocurrió un inconveniente a la hora de guardar presupuesto.')
        }
    })
}

function abrirModalEdicion(idPresupuesto){
    $.ajax({
        url: '../../Presupuesto/ListadoPresupuestos',
        data: { IdPresupuesto : idPresupuesto },
        type: 'GET',
        dataType: 'json',
        success: function(result){
            console.log(result)
            var presupuestoEditar = result.result[0];

            document.getElementById('presupuestoID').value = presupuestoEditar.presupuestoID;
            document.getElementById('nombre').value = presupuestoEditar.nombre;
            document.getElementById('descripcion').value = presupuestoEditar.descripcion;
            document.getElementById('fechaInicio').value = presupuestoEditar.fechaInicio;
            document.getElementById('fechaFin').value = presupuestoEditar.fechaFin;
            document.getElementById('importePresupuesto').value = presupuestoEditar.importePresupuesto;
            document.getElementById('Estado').value = presupuestoEditar.estadoInt;

            $('#modalCrearPresupuesto').modal('show');

        },
        error: function(e, status){
            alert('Ocurrió un inconveniente a la hora de editar presupuesto.')
        }
    })
}

function eliminar(idPresupuesto){
    console.log(idPresupuesto)
    $.ajax({
        url: '../../Presupuesto/EliminarPresupuesto',
        data: { PresupuestoID : idPresupuesto },
        type: 'DELETE',
        dataType: 'json',
        success: function(result){
            if(result.success){
                listadoDePresupuestos();
            }
        },
        error: function(e, status){
            alert('Ocurrió un inconveniente a la hora de eliminar presupuesto.')
        }
    })
}