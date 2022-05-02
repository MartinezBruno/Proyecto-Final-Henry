/* eslint-disable no-unused-expressions */

var supertest = require("supertest-as-promised")(require("../src/app"));
var expect = require("chai").expect;
// var model = require("../models/model");

describe("Index Route", function () {
  // beforeEach(function () {
  //   model.reset();
  // });

  describe("/api", function () {
    it("GET responde con un string de bienvenida: 'API Attend Group Company'", function () {
      return supertest // supertest nos permite hacer y testear requests HTTP
        .get("/api") // hacemos un request HTTP: GET a '/api'
        .expect(200) // el codigo de status del response
        .expect("Content-Type", /json/) // podemos testear los headers
        .expect(function (res) {
          expect(res.body).to.eql('API Attend Group Compani'); // testeamos la respuesta con el body
        });
    });
  });
});