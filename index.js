const express = require('express');
const mysqlBD = require('mysql2');
const bodyParser = require('body-parser');

const aplicaction = express();

aplicaction.use(function (request, response, next) {
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Methods", "*");
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    next();
});

aplicaction.use(bodyParser.json());

const Port = 9898;
const Connection = mysqlBD.createConnection(
    {
        host: "localhost",
        database: "pruebaadn",
        user: "root",
        password: ""
    }
);

aplicaction.listen(Port, () => {
    console.log(`Running server OK. port: ${Port}`);
});

Connection.connect(error => {
    if (error) throw console.error(error.message);
    console.log("Connection database OK!");
});

aplicaction.get('/', (request, response) => {
    response.send('Api Rest Prueba Técnica...');
});

///////////////////////////////////////////////////////////////////////////////////////////////////

//#region INICIO ENDPOINT ASESORES

aplicaction.get('/asesores', (request, response) => {
    const SP = 'CALL getAsesores()'
    Connection.query(SP, (error, result) => {
        if (error) return console.error(error.message);
        if (result[0].length > 0) {
            response.json(result[0])
        } else {
            response.json('Not exists Elements')
        }
    });
});

aplicaction.get('/asesores/:id', (request, response) => {
    const id = parseInt(request.params.id, 10);
    const SP = 'CALL getasesor(?)'
    Connection.query(SP, [id], (error, result) => {
        if (error) return console.error(error.message);
        if (result[0].length > 0) {
            response.json(result[0])
        } else {
            response.json('There is no element with that ID.');
        }
    });
});

aplicaction.post('/asesores/add', (request, response) => {
    const asesor = {
        nombre: request.body.NombreAsesor,
        tipo: request.body.Nombre
    }

    const SP = 'CALL addAsesor(?, ?)';
    Connection.query(SP, [asesor.nombre, asesor.tipo], (error, result) => {
        if (error) return console.error(error.message);

        response.json('Registro exitoso!')
    });
});

aplicaction.put('/asesores/update/:id', (request, response) => {

    const { id } = request.params;
    const { NombreAsesor, Nombre, Salario } = request.body;

    const SP = 'CALL updateAsesor(?, ?, ?, ?)';
    Connection.query(SP, [id, NombreAsesor, Nombre, Salario], (error, result) => {
        if (error) return console.error(error.message);

        response.json('Update exitoso!')
    });
})

aplicaction.delete('/asesores/delete/:id', (request, response) => {
    const { id } = request.params;

    const SP = 'CALL deleteAsesor(?)';
    Connection.query(SP, [id], (error, result) => {
        if (error) return console.error(error.message);

        response.json('Delete exitoso!')
    });
});

//#region FIN ENDPOINT ASESORES

///////////////////////////////////////////////////////////////////////////////////////////////////

//#region INICIO ENDPOINT COMISIONES

aplicaction.get('/comisiones', (request, response) => {
    const SP = 'CALL getComisiones()'
    Connection.query(SP, (error, result) => {
        if (error) return console.error(error.message);
        if (result[0].length > 0) {
            response.json(result[0])
        } else {
            response.json('Not exists Elements')
        }
    });
});


aplicaction.get('/comisiones/:id', (request, response) => {
    const id = parseInt(request.params.id, 10);
    const SP = 'CALL getcomision(?)'
    Connection.query(SP, [id], (error, result) => {
        if (error) return console.error(error.message);
        if (result[0].length > 0) {
            response.json(result[0])
        } else {
            response.json('There is no element with that ID.');
        }
    });
});

aplicaction.post('/comisiones/add', (request, response) => {
    const comision = {
        Nombre: request.body.Nombre,
        Meta: request.body.Meta,
        PorcentajeComision1: request.body.PorcentajeComision1,
        PorcentajeComision2: request.body.PorcentajeComision2,
        PorcentajeComision3: request.body.PorcentajeComision3
    }

    const SP = 'CALL addComision(?, ?, ?, ?, ?)';
    Connection.query(SP, [comision.Nombre, comision.Meta, comision.PorcentajeComision1, comision.PorcentajeComision2, comision.PorcentajeComision3], (error, result) => {
        if (error) return console.error(error.message);

        response.json('Registro exitoso!')
    });
});

aplicaction.put('/comisiones/update/:id', (request, response) => {

    const { id } = request.params;
    const { Nombre, Meta, PorcentajeComision1, PorcentajeComision2, PorcentajeComision3 } = request.body;

    const SP = 'CALL updateComision(?, ?, ?, ?, ?, ?)';
    Connection.query(SP, [id, Nombre, Meta, PorcentajeComision1, PorcentajeComision2, PorcentajeComision3], (error, result) => {
        if (error) return console.error(error.message);

        response.json('Update exitoso!')
    });
})

aplicaction.delete('/comision/delete/:id', (request, response) => {
    const { id } = request.params;

    const SP = 'CALL deleteComision(?)';
    Connection.query(SP, [id], (error, result) => {
        if (error) return console.error(error.message);

        response.json('Delete exitoso!')
    });
});





//#region FIN ENDPOINT COMISIONES

///////////////////////////////////////////////////////////////////////////////////////////////////

//#region INICIO ENDPOINT VENTAS

aplicaction.get('/ventas', (request, response) => {
    const SP = 'CALL getVentas()'
    Connection.query(SP, (error, result) => {
        if (error) return console.error(error.message);
        if (result[0].length > 0) {
            response.json(result[0])
        } else {
            response.json('Not exists Elements')
        }
    });
});

aplicaction.get('/ventas/:id', (request, response) => {
    const id = parseInt(request.params.id, 10);
    const SP = 'CALL getventa(?)'
    Connection.query(SP, [id], (error, result) => {
        if (error) return console.error(error.message);
        if (result[0].length > 0) {
            response.json(result[0])
        } else {
            response.json('There is no element with that ID.');
        }
    });
});
aplicaction.put('/ventas/update/:id', (request, response) => {

    const { id } = request.params;
    const { NombreAsesor, Valor, Mes, Anio } = request.body;

    const SP = 'CALL updateVenta(?, ?, ?, ?, ?)';
    Connection.query(SP, [id, NombreAsesor, Valor, Mes, Anio], (error, result) => {
        if (error) return console.error(error.message);

        response.json('Update exitoso!')
    });
})

aplicaction.post('/ventas/add', (request, response) => {
    const venta = {
        NombreAsesor: request.body.NombreAsesor,
        Valor: request.body.Valor,
        Mes: request.body.Mes,
        Anio: request.body.Anio
    }

    const SP = 'CALL addVenta(?, ?, ?, ?)';
    Connection.query(SP, [venta.NombreAsesor, venta.Valor, venta.Mes, venta.Anio], (error, result) => {
        if (error) return console.error(error.message);

        response.json('Registro exitoso!')
    });
});

//#region FIN ENDPOINT VENTAS

//#region INICIO ENDPOINT NOMINA

aplicaction.get('/ListaNomina', (request, response) => {
    const SP = 'CALL getListaNomina()'
    Connection.query(SP, (error, result) => {
        if (error) return console.error(error.message);
        if (result[0].length > 0) {
            response.json(result[0])
        } else {
            response.json('Not exists Elements')
        }
    });
});

aplicaction.post('/obtenerNomina/', (request, response) => {
    const { Mes, Anio } = request.body;
    const SP = 'CALL getNomina(?, ?)'
    Connection.query(SP, [Mes, Anio], (error, result) => {
        if (error) return console.error(error.message);
        if (result[0].length > 0) {
            response.json(result[0])
        } else {
            response.json('Not exists Elements')
        }
    });
});

aplicaction.get('/ListaNomina/:id', (request, response) => {
    const id = parseInt(request.params.id, 10);
    const SP = 'CALL pdfNomina(?)';
    Connection.query(SP, [id], (error, result) => {
        if (error) return console.error(error.message);
        if (result[0].length > 0) {
            response.json(result[0])
        } else {
            response.json('There is no element with that ID.');
        }
    });
});

//#region FIN ENDPOINT NOMINA

aplicaction.get('/TiposAsesores', (request, response) => {
    const SP = 'CALL getTiposAsesores()'
    Connection.query(SP, (error, result) => {
        if (error) return console.error(error.message);
        if (result[0].length > 0) {
            response.json(result[0])
        } else {
            response.json('Not exists Elements')
        }
    });
});


aplicaction.get('/lstTiposAsesores', (request, response) => {
    const SP = 'CALL getLisTiposAsesores()'
    Connection.query(SP, (error, result) => {
        if (error) return console.error(error.message);
        if (result[0].length > 0) {
            response.json(result[0])
        } else {
            response.json('Not exists Elements')
        }
    });
});