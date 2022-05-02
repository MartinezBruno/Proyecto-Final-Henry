/* eslint-disable no-unused-expressions */

var supertest = require("supertest-as-promised")(require("../app"));
var expect = require("chai").expect;
var model = require("../models/model");

describe("Routes", function () {
  beforeEach(function () {
    model.reset();
  });

  describe("/houses", function () {
    it("GET responde con un array vacío de entrada", function () {
      return supertest // supertest nos permite hacer y testear requests HTTP
        .get("/houses") // hacemos un request HTTP: GET a '/houses'
        .expect(200) // el codigo de status del response
        .expect("Content-Type", /json/) // podemos testear los headers
        .expect(function (res) {
          expect(res.body).to.eql([]); // testeamos la respuesta con el body
        });
    });

    it("GET responde con un array con los nombres de todas las casas agregadas", function () {
      model.addHouse("Gryffindor");
      model.addHouse("Slytherin");
      return supertest
        .get("/houses")
        .expect(200)
        .expect("Content-Type", /json/)
        .expect(function (res) {
          expect(res.body).to.eql(["Gryffindor", "Slytherin"]);
        });
    });
 
    it("POST agrega una nueva casa y devuelve el nombre de la casa agregada", function () {
      return supertest
        .post("/houses")
        .send({ house: "Gryffindor" })
        .expect(200)
        .expect("Content-Type", /json/)
        .expect(function (res) {
          expect(res.body).to.eql("Gryffindor");
          expect(model.listHouses()).to.have.length(1);
          expect(model.listHouses()[0]).to.eql("Gryffindor");
        });
    });
  });
});

describe("/characters", function () {
  it("GET responde con un array vacío de entrada", function () {
    return supertest
      .get("/characters")
      .expect(200)
      .expect("Content-Type", /json/)
      .expect(function (res) {
        expect(res.body).to.eql([]);
      });
  });

  it("GET responde con un array de todos los personajes", function () {
    model.addHouse("Gryffindor");
    model.addHouse("Slytherin");
    model.addCharacter("Harry", "Potter", "Gryffindor", "31-07-1980", false);
    model.addCharacter(
      "Hermione",
      "Granger",
      "Gryffindor",
      "06-12-1987",
      false
    );
    model.addCharacter("Draco", "Malfoy", "Slytherin", "26-07-1990", false);
    return supertest
      .get("/characters")
      .expect(200)
      .expect("Content-Type", /json/)
      .expect(function (res) {
        expect(res.body).to.deep.eql([
          {
            name: "Harry",
            houseId: 1,
            lastName: "Potter",
            dateOfBirth: "31-07-1980",
            yearOfBirth: 1980,
            isMuggle: false,
            wand: {},
            spells: [],
          },
          {
            name: "Hermione",
            houseId: 1,
            lastName: "Granger",
            dateOfBirth: "06-12-1987",
            yearOfBirth: 1987,
            isMuggle: false,
            wand: {},
            spells: [],
          },
          {
            name: "Draco",
            houseId: 2,
            lastName: "Malfoy",
            dateOfBirth: "26-07-1990",
            yearOfBirth: 1990,
            isMuggle: false,
            wand: {},
            spells: [],
          },
        ]);
      });
  });

  it("POST agrega un nuevo personaje y lo devuelve", function () {
    model.reset();
    model.addHouse("Gryffindor");
    return supertest
      .post("/characters")
      .send({
        name: "Harry",
        lastName: "Potter",
        house: "Gryffindor",
        dateOfBirth: "31-07-1980",
        isMuggle: false,
      })
      .expect(200)
      .expect("Content-Type", /json/)
      .expect(function (res) {
        expect(res.body).to.eql({
          name: "Harry",
          houseId: 1,
          lastName: "Potter",
          dateOfBirth: "31-07-1980",
          yearOfBirth: 1980,
          isMuggle: false,
          wand: {},
          spells: [],
        });
        expect(model.listCharacters()).to.have.length(1);
        expect(model.listCharacters()[0].name).to.eql("Harry");
      });
  });

  it("POST devuelve un mensaje de error si la casa no existe", function () {
    model.reset();
    return supertest
      .post("/characters")
      .send({
        name: "Harry",
        lastName: "Potter",
        house: "Gryffindor",
        dateOfBirth: "31-07-1980",
        isMuggle: false,
      })
      .expect(404)
      .expect("Content-Type", /json/)
      .expect(function (res) {
        expect(res.body).to.deep.eql({ msg: "La casa ingresada no existe" });
        expect(model.listCharacters()).to.have.length(0);
      });
  });
});

describe("/characters/:houseName", function () {
  it("GET responde con un array vacío si la casa no existe", function () {
    model.reset();
    model.addHouse("Gryffindor");
    model.addCharacter("Harry", "Potter", "Gryffindor", "31-07-1980", false);
    model.addCharacter(
      "Hermione",
      "Granger",
      "Gryffindor",
      "06-12-1987",
      false
    );
    return supertest
      .get("/characters/Slytherin")
      .expect(200)
      .expect("Content-Type", /json/)
      .expect(function (res) {
        expect(res.body).to.eql([]);
      });
  });

  it("GET responde con un array de todos los personajes de esa casa", function () {
    model.reset();
    model.addHouse("Gryffindor");
    model.addCharacter("Harry", "Potter", "Gryffindor", "31-07-1980", false);
    model.addCharacter(
      "Hermione",
      "Granger",
      "Gryffindor",
      "06-12-1987",
      false
    );
    return supertest
      .get("/characters/Gryffindor")
      .expect(200)
      .expect("Content-Type", /json/)
      .expect(function (res) {
        expect(res.body).to.deep.eql([
          {
            name: "Harry",
            houseId: 1,
            lastName: "Potter",
            dateOfBirth: "31-07-1980",
            yearOfBirth: 1980,
            isMuggle: false,
            wand: {},
            spells: [],
          },
          {
            name: "Hermione",
            houseId: 1,
            lastName: "Granger",
            dateOfBirth: "06-12-1987",
            yearOfBirth: 1987,
            isMuggle: false,
            wand: {},
            spells: [],
          },
        ]);
      });
  });

  it("GET responde con un array de SÓLO los nombres y apellidos todos los personajes de esa casa cuando fullName es true", function () {
    model.reset();
    model.addHouse("Gryffindor");
    model.addCharacter("Harry", "Potter", "Gryffindor", "31-07-1980", false);
    model.addCharacter(
      "Hermione",
      "Granger",
      "Gryffindor",
      "06-12-1987",
      false
    );
    return supertest
      .get("/characters/Gryffindor?fullName=true")
      .expect(200)
      .expect("Content-Type", /json/)
      .expect(function (res) {
        expect(res.body).to.deep.eql(["Harry Potter", "Hermione Granger"]);
      });
  });
});

describe("/spells", function () {
  it("GET responde con un array vacío si el personaje no existe", function () {
    return supertest
      .get("/spells")
      .expect(200)
      .expect("Content-Type", /json/)
      .expect(function (res) {
        expect(res.body).to.eql([]);
      });
  });

  it("GET responde con todos los hechizos del personaje indicado pasado por query", function () {
    model.reset();
    model.addHouse("Gryffindor");
    model.addCharacter("Harry", "Potter", "Gryffindor", "31-07-1980", false);
    model.addSpell("Harry", 1, "Kadabra", "es mágico");
    model.addSpell("Harry", 2, "otro", "magic");
    return supertest
      .get("/spells?name=Harry")
      .send({ name: "Harry" })
      .expect(200)
      .expect("Content-Type", /json/)
      .expect(function (res) {
        expect(res.body).to.eql([
          { id: 1, spellName: "Kadabra", description: "es mágico" },
          { id: 2, spellName: "otro", description: "magic" },
        ]); // testeamos la respuesta con el body
      });
  });

  it("POST agrega un nuevo hechizo al personaje indicado", function () {
    model.reset();
    model.addHouse("Gryffindor");
    model.addCharacter("Harry", "Potter", "Gryffindor", "31-07-1980", false);
    return supertest
      .post("/spells")
      .send({
        name: "Harry",
        id: 1,
        spellName: "lamagia",
        description: "henry potter",
      })
      .expect(201)
      .expect("Content-Type", /json/)
      .expect(function (res) {
        expect(res.body).to.deep.eql({ msg: "Hechizo agregado correctamente" });
        expect(model.showSpells("Harry")).to.deep.eql([
          { id: 1, spellName: "lamagia", description: "henry potter" },
        ]);
      });
  });

  describe("/wand", function () {
    it("GET responde con un array vacío si el personaje no existe", function () {
      model.reset();
      return supertest
        .get("/wand")
        .expect(200)
        .expect("Content-Type", /json/)
        .expect(function (res) {
          expect(res.body).to.eql([]);
        });
    });

    it('GET responde con el string: "el personaje no tiene varita", si efectivamente no la tiene', function () {
      model.reset();
      model.addHouse("Gryffindor");
      model.addCharacter("Harry", "Potter", "Gryffindor", "31-07-1980", false);
      return supertest
        .get("/wand")
        .send({ name: "Harry" })
        .expect(200)
        .expect("Content-Type", /json/)
        .expect(function (res) {
          expect(res.body).to.eql("el personaje no tiene varita"); // testeamos la respuesta con el body
        });
    });

    it('GET responde con el objeto "wand" del personaje correspondiente', function () {
      model.reset();
      model.addHouse("Gryffindor");
      model.addCharacter("Harry", "Potter", "Gryffindor", "31-07-1980", false);
      model.addWand("Harry", "holly", "phoenix feather", 11);
      return supertest
        .get("/wand")
        .send({ name: "Harry" })
        .expect(200)
        .expect("Content-Type", /json/)
        .expect(function (res) {
          expect(res.body).to.eql({
            wood: "holly",
            core: "phoenix feather",
            length: 11,
          }); // testeamos la respuesta con el body
        });
    });

    it("POST responde con un array vacío si el personaje no existe", function () {
      model.reset();
      return supertest
        .post("/wand")
        .send({
          name: "Fede",
          wood: "holly",
          core: "phoenix feather",
          length: 11,
        })
        .expect(201)
        .expect("Content-Type", /json/)
        .expect(function (res) {
          expect(res.body).to.deep.eql([]);
        });
    });

    it("POST agrega una nueva varita (wand) al personaje indicado", function () {
      model.reset();
      model.addHouse("Gryffindor");
      model.addCharacter("Harry", "Potter", "Gryffindor", "31-07-1980", false);
      return supertest
        .post("/wand")
        .send({
          name: "Harry",
          wood: "holly",
          core: "phoenix feather",
          length: 11,
        })
        .expect(201)
        .expect("Content-Type", /json/)
        .expect(function (res) {
          expect(res.body).to.deep.eql("varita agregada correctamente");
          expect(model.showWand("Harry")).to.deep.eql({
            wood: "holly",
            core: "phoenix feather",
            length: 11,
          });
        });
    });

    it('POST responde con el string "Ya existe una varita para este personaje", si el personjae efectivamente ya tiene varita', function () {
      model.reset();
      model.addHouse("Gryffindor");
      model.addCharacter("Harry", "Potter", "Gryffindor", "31-07-1980", false);
      model.addWand("Harry", "holly", "phoenix feather", 11);
      return supertest
        .post("/wand")
        .send({
          name: "Harry",
          wood: "holly",
          core: "phoenix feather",
          length: 11,
        })
        .expect(201)
        .expect("Content-Type", /json/)
        .expect(function (res) {
          expect(res.body).to.deep.eql(
            "Ya existe una varita para este personaje"
          );
          expect(model.showWand("Harry")).to.deep.eql({
            wood: "holly",
            core: "phoenix feather",
            length: 11,
          });
        });
    });
  });
});
