const express = require('express');
const { isValidUserId, isValidUserData } = require('../helper/validation');
const { Service } = require('../service/user.service');
const { buildResponse } = require('../helper/buildResponse');

const service = new Service();

class Controller {
    constructor() {
        this.route = express.Router();
        this.initRoute();
    }

    initRoute() {
        this.route.get('/', (req, res) => {
            try {
                const data = service.getAllUsers();
                buildResponse(res, 200, data);
            } catch (error) {
                buildResponse(res, 404, error.message);
            }
        })

        this.route.get('/:id', isValidUserId, (req, res) => {
            try {
                const { id } = req.params;
                const data = service.getById(id);
                buildResponse(res, 200, data);
            } catch (error) {
                buildResponse(res, 404, error.message);
            }
        })

        this.route.post('/', isValidUserData, (req, res) => {
            try {
                const { name, surname, email, pwd } = req.body;
                const data = service.createUsers(name, surname, email, pwd);
                buildResponse(res, 201, data);
            } catch (error) {
                buildResponse(res, 404, error.message);
            }
        })

        this.route.put('/:id', isValidUserId, (req, res) => {
            try {
                const { id } = req.params;
                const { name, surname, email, pwd } = req.body;
                const data = service.updateUsers(id, name, surname, email, pwd);
                buildResponse(res, 200, data);
            } catch (error) {
                buildResponse(res, 404, error.message);
            }
        });

        this.route.patch('/:id', isValidUserId, (req, res) => {
            try {
                const { id } = req.params;
                const clientObj = req.body;
                const data = service.patchUsers(id, clientObj);
                buildResponse(res, 200, data);
            } catch (error) {
                buildResponse(res, 404, error.message);
            }
        })

        this.route.delete('/:id', isValidUserId, (req, res) => {
            try {
                const { id } = req.params;
                const data = service.deleteUsers(id);
                buildResponse(res, 200, data);
            } catch (error) {
                buildResponse(res, 404, error.message);
            }
        })
    }
}

module.exports = { Controller };