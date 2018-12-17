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
        let query_string = "";

        for (let i in palabras)
        {
            query_string += "palabras=" + palabras[i] + "&";
            if (i == palabras.length - 1)
                query_string += "palabras=" + palabras[i];
        }
        
        return fetch(this.url_evento + "?" + query_string)
            .then( response => this.getStatus(response) )
            .then( response => this.checkResponse(response) );

    }

    obtenerEvento(id)
    {
        return fetch(this.url_evento + "/" + id)
            .then( response => this.getStatus(response) )
            .then( response => this.checkResponse(response) );
    }

    obtenerEventoTipo(tipo)
    {
        return fetch(this.url_evento + "/tipo/" + tipo)
            .then( response => this.getStatus(response) )
            .then( response => this.checkResponse(response) );
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
        if(!this.valid) 
            return Promise.reject(json);

        return json;
    }
}

class UsuarioDAO
{
    constructor(usuario, clave) 
    {
        this.valid = false;
        this.url_usuario = "/usuario";
        this.usuario = usuario;
        this.clave = clave;
    }

    obtenerEvento(nombre)
    {
        return fetch(this.url_usuario + "/" + nombre)
            .then( response => this.getStatus(response) )
            .then( response => this.checkResponse(response) );
    }

    eventosInscritos(tiempo)
    {
        let query_url = this.url_usuario + "/" + this.usuario + "/evento/inscrito";
        if (tiempo)
            query_url += "?tiempo=" + tiempo;

        return fetch(query_url, 
            {
                method : 'get',
                headers: new Headers({
                    'Authorization': 'Basic ' + btoa(this.usuario + ":" + this.clave)
                })
            })
            .then( response => this.getStatus(response) )
            .then( response => this.checkResponse(response) );
    }

    eventosOrganizados(tiempo)
    {
        let query_url = this.url_usuario + "/" + this.usuario + "/evento/organizado";
        if (tiempo)
            query_url += "?tiempo=" + tiempo;

        return fetch(query_url,
            {
                method : 'get',
                headers: new Headers({
                    'Authorization': 'Basic ' + btoa(this.usuario + ":" + this.clave)
                })
            })
            .then( response => this.getStatus(response) )
            .then( response => this.checkResponse(response) );
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
            .then( response => this.getStatus(response) )
            .then( response => this.checkResponse(response) );
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
            .then( response => this.getStatus(response) )
            .then( response => this.checkResponse(response) );
    }

    registrarUsuario(usuario)
    {
        let query_url = this.url_usuario + "/" + usuario.nombre;
        return fetch(query_url, 
            {
                method: 'post',
                body: usuario.json()
            })
            .then( response => this.getStatus(response) )
            .then( response => this.checkResponse(response) );
    }

    login(usuario)
    {
        let query_url = this.url_usuario + "/login/" + usuario.nombre;
        return fetch(query_url, 
            {
                method: 'post',
                body: usuario.json()
            })
            .then( response => this.getStatus(response) )
            .then( response => this.checkResponse(response) );
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
                    body: evento.json()
                })
            })
            .then( response => this.getStatus(response) )
            .then( response => this.checkResponse(response) );
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
            .then( response => this.getStatus(response) )
            .then( response => this.checkResponse(response) );
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
        if(!this.valid) 
            return Promise.reject(json);

        return json;
    }
}

//angular.module('ventos.services', [])
//        .value('version', '0.1')
//        .service('EventosDAO')
//        .service('UsuarioDAO');
