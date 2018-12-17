
'use strict'

class EventosDAO
{
    constructor()
    {
        this.valid = false;
        this.url_evento = "https://localhost:8443/evento";
    }

    eventosPalabra(palabras)
    {
        // let query_string = "";
        let query_string = "palabras=" + palabras;
//        for (let i in palabras)
//        {
//            query_string += "palabras=" + palabras[i] + "&";
//            if (i == palabras.length - 1)
//                query_string += "palabras=" + palabras[i];
//        }

        return fetch(this.url_evento + "?" + query_string)
                .then(response => this.getStatus(response))
                .then(response => this.checkResponse(response));

    }

    obtenerEvento(id)
    {
        return fetch(this.url_evento + "/" + id)
                .then(response => this.getStatus(response))
                .then(response => this.checkResponse(response));
    }

    obtenerEventoTipo(tipo)
    {
        return fetch(this.url_evento + "/tipo/" + tipo)
                .then(response => this.getStatus(response))
                .then(response => this.checkResponse(response));
    }

    /**
     * Save response status and returns object data
     * @param {response} response
     * @returns {json}
     */
    getStatus(response) {
        this.valid = response.ok;
        // TODO Check Network Errors
        return response.json();
    }

    checkResponse(json) {
        if (!this.valid)
            return Promise.reject(json);

        return json;
    }
}

class UsuarioDAO
{
    constructor(usuario, clave)
    {
        this.valid = false;
        this.url_usuario = "https://localhost:8443/usuario";
        this.usuario = usuario;
        this.clave = clave;
    }

    obtenerEvento(nombre)
    {
        return fetch(this.url_usuario + "/" + nombre)
                .then(response => this.getStatus(response))
                .then(response => this.checkResponse(response));
    }

    eventosInscritos(tiempo)
    {
        let query_url = this.url_usuario + "/" + this.usuario + "/evento/inscrito";
        if (tiempo)
            query_url += "?tiempo=" + tiempo;

        return fetch(query_url,
                {
                    method: 'get',
                    headers: new Headers({
                        'Authorization': 'Basic ' + btoa(this.usuario + ":" + this.clave)
                    })
                })
                .then(response => this.getStatus(response))
                .then(response => this.checkResponse(response));
    }

    eventosOrganizados(tiempo)
    {
        let query_url = this.url_usuario + "/" + this.usuario + "/evento/organizado";
        if (tiempo)
            query_url += "?tiempo=" + tiempo;

        return fetch(query_url,
                {
                    method: 'get',
                    headers: new Headers({
                        'Authorization': 'Basic ' + btoa(this.usuario + ":" + this.clave)
                    })
                })
                .then(response => this.getStatus(response))
                .then(response => this.checkResponse(response));
    }

    cancelarEvento(id)
    {
        let query_url = this.url_usuario + "/" + this.usuario + "/evento/organizado/" + id;

        return fetch(query_url,
                {
                    method: 'delete',
                    headers: new Headers({
                        'Authorization': 'Basic ' + btoa(this.usuario + ":" + this.clave)
                    })
                })
                .then(response => this.getStatus(response))
                .then(response => this.checkResponse(response));
    }

    cancelarInscripcionEvento(id)
    {
        let query_url = this.url_usuario + "/" + this.usuario + "/evento/inscrito/" + id;

        return fetch(query_url,
                {
                    method: 'delete',
                    headers: new Headers({
                        'Authorization': 'Basic ' + btoa(this.usuario + ":" + this.clave)
                    })
                })
                .then(response => this.getStatus(response))
                .then(response => this.checkResponse(response));
    }

    registrarUsuario(usuario)
    {
        let query_url = this.url_usuario + "/" + usuario.nombre;
        return fetch(query_url,
                {
                    method: 'post',
                    body: usuario.json()
                })
                .then(response => this.getStatus(response))
                .then(response => this.checkResponse(response));
    }

    login(usuario)
    {
        let query_url = this.url_usuario + "/login/" + usuario.nombre;
        return fetch(query_url,
                {
                    method: 'post',
                    body: usuario.json()
                })
                .then(response => this.getStatus(response))
                .then(response => this.checkResponse(response));
    }

    crearEvento(evento)
    {
        let query_url = this.url_usuario + "/" + this.usuario + "/evento";

        return fetch(query_url,
                {
                    method: 'post',
                    headers: new Headers({
                        'Authorization': 'Basic ' + btoa(this.usuario + ":" + this.clave),
                        'Content-Type': 'application/json',
                        
                    }),
                    body: JSON.stringify(evento)
                })
                .then(response => this.getStatus(response))
                .then(response => this.checkResponse(response));
    }

    inscribirseEvento(id)
    {
        let query_url = this.url_usuario + "/" + this.usuario + "/evento/inscrito/" + id;

        return fetch(query_url,
                {
                    method: 'post',
                    headers: new Headers({
                        'Authorization': 'Basic ' + btoa(this.usuario + ":" + this.clave),
                        'Content-Type': 'application/json'
                    })
                })
                .then(response => this.getStatus(response))
                .then(response => this.checkResponse(response));
    }
    /**
     * Save response status and returns object data
     * @param {response} response
     * @returns {json}
     */
    getStatus(response) {
        this.valid = response.ok;
        // TODO Check Network Errors
        return response.json();
    }

    checkResponse(json) {
        if (!this.valid)
            return Promise.reject(json);

        return json;
    }
}

//angular.module('ventos.services', [])
//        .value('version', '0.1')
//        .service('EventosDAO')
//        .service('UsuarioDAO');



class eventosController {
    constructor($scope) {
//        this.listaEventos = [
//            {id: '1', descripcion: 'Charla de cosas', lugar: "jaen"},
//            {id: '2', descripcion: 'Charla de cosas', lugar: "jaen"},
//            {id: '3', descripcion: 'Charla de cosas', lugar: "jaen"}
//        ];
        // this.listaEventos = [{"id":2,"fecha":"2019-12-21T00:00:00.000+0000","lugar":"lugar","tipo":"CHARLA","descripcion":"descripcion","numeroMaxAsistentes":21,"organizador":"pepe"},{"id":8,"fecha":"2020-12-14T11:05:43.275+0000","lugar":"jaen","tipo":"CHARLA","descripcion":"p","numeroMaxAsistentes":30,"organizador":"pepe"},{"id":10,"fecha":"2027-04-04T03:06:00.000+0000","lugar":"7","tipo":"CHARLA","descripcion":"8","numeroMaxAsistentes":20,"organizador":"pepe"}];
        this.$scope = $scope;
        this.listaEventos = [];
        this.eventosDAO = new EventosDAO();
        this.usuariosDAO = new UsuarioDAO("pepe", "abc");
        //this.obtenerEvento();
        this.nuevoevento = {};
        this.url_evento = "http://localhost:8080/evento";
        this.palabras = {};
        
        
        this.descripcion;
        this.numAsistentes;
        this.lugar;
        this.fecha;
        this.tipo;
        this.nuevoEvento;

    }
    visualiza(evento) {
        this.evento = evento;
    }

    cargaEventosTabla(evento) {
        this.listaEventos = evento;
    }

    creaEvento() {
       // let nuevoEvento = {"descripcion" : this.descripcion, "fecha": "2019-12-21T00:00:00.000+0000", "lugar": this.lugar, "numeroMaxAsistentes" : "23", "organizador" : "pepe"};
        let nuevoEvento = {"id":40,"fecha":"2019-12-21T00:00:00.000+0000","lugar":"lugar","tipo":"CHARLA","descripcion":"buenas saludsos","numeroMaxAsistentes":21,"organizador":"pepe"};
        this.usuariosDAO.crearEvento(nuevoEvento);
    }

    verEventosOrganizados(tiempo) {
        console.log("hola")
        let evento;
        let eventosjson;
        this.usuariosDAO.eventosOrganizados(tiempo)
                .then(eventoR => {
                    evento = eventoR;
                    this.listaEventos = [];
                    this.listaEventos = evento;
                    console.log(this.listaEventos);
                    console.log();
                    this.$scope.$apply();
                })



    }

    verEventosInscritos(tiempo) {
        console.log("hola")
        let evento;
        this.usuariosDAO.eventosInscritos(tiempo)
                .then(eventoR => {
                    this.listaEventos = eventoR;
                    console.log(this.listaEventos);
                    this.$scope.$apply();
                })
               

    }

    verEventosTipo(tipo) {
        console.log("hola")
        let evento;
        this.eventosDAO.obtenerEventoTipo(tipo)
                .then(eventoR => {
                    evento = eventoR;
                    this.listaEventos = evento.contenidos;
                    console.log(this.listaEventos);
                    this.$scope.$apply();
                })



    }

    verEventosPalabras() {
        console.log("hola")
        let evento;
        this.eventosDAO.eventosPalabra(this.palabras)
                .then(eventoR => {
                    this.listaEventos = eventoR;
                    console.log(this.listaEventos);
                    this.$scope.$apply();
                })



    }

    obtenerEvento() {
        console.log("hola");
        let evento;

        this.usuariosDAO.eventosOrganizados("futuro")
                .then(eventoR => {
                    evento = eventoR;
                })
                .then(() => {
                    console.log(evento);
                });
        console.log(evento);
//                .then(response => {
//                    console.log(response);
//                    this.evento = response.json();
//                })
    }

}

angular.module('eventosApp', [])
        .controller('eventosController', ['$scope', eventosController]);


//angular.module('eventos', [])
//        .controller('eventosController', [eventosController]);