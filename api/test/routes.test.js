/* eslint-disable no-unused-expressions */
// const { provincias_ar, provincias_mx, provincias_uy } = require("./helpers")

var supertest = require("supertest-as-promised")(require("../src/app"));
var expect = require("chai").expect;

describe("Routes", function () {});

  describe("/api", function () {})

  describe("/api/provincias/:code", function () {
    it("GET /ar responde con las provincias de Argentina", async function () {
      return await supertest // supertest nos permite hacer y testear requests HTTP
        .get("/api/provincias/ar") // hacemos un request HTTP: GET a '/provincias/ar'
        .expect(200) // el codigo de status del response
        .expect("Content-Type", /json/) // podemos testear los headers
        .expect(function (res) {
          expect(res.body).to.eql([]); // testeamos la respuesta con el body
        });
    });
    it("GET /mx responde con las provincias de México", function () {
      return supertest 
        .get("/api/provincias/mx") 
        .expect(200) 
        .expect("Content-Type", /json/) 
        .expect(function (res) {
          expect(res.body).to.eql([]); 
        });
    });
    it("GET /uy responde con las provincias de Uruguay", function () {
      return supertest 
        .get("/api/provincias/uy") 
        .expect(200) 
        .expect("Content-Type", /json/) 
        .expect(function (res) {
          expect(res.body).to.eql([]); 
        });
    });
  })

  describe("/api/ciudad", function () {})

  describe("/api/servicios", function () {})

  describe("/api/proveedor", function () {})

  describe("/api/auth", function () {})

  describe("/api/usuarios", function () {})

  // afterAll(() => {
  //   server.close()
  // })