import request from "supertest"; //ES modules - 2015
import { expect } from "chai";
import app from "../main.js";

/* import chaiHttp from "chai-http"; 
const chaiHttp = require('chai-http') //commonJs - nativa de Node en sus origenes

chai.use(chaiHttp) */


describe("API Usuarios y Productos funcionando", () => {
  describe("Servidor este arriba", () => {
    it("Debería iniciar el servidor sin problemas", (done) => {
      request(app)
        .get("/")
        .expect(404)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(404);
          done();
        });
    });
  });

  describe('CRUD de Usuarios', () => {
    it('Debería crear un usuario exitosamente', async() => {
        const dataUser = {
            name: "Juanito",
            lastname: "Adasme",
            email: "juanitoDwarf@gmail.com",
            rol: "tech lead",
        };

        const res = await request(app).post("/api/v1/usuario").send(dataUser);
        expect(res.status).to.equal(201);
        expect(res.body.data).to.include(dataUser)
        expect(res.body.message).to.equal("Usuario Creado con éxito");
    });

    it('Debería devolver todos los usuarios activos', async() => {
        const res = await request(app).get("/api/v1/usuario");
        expect(res.status).to.equal(200)
        expect(res.body.data).to.be.an('array')
        expect(res.body.message).to.equal("Usuarios obtenidos con éxito");
    });

    it('Debería actualizar correctamente un usuario ya existente por ID', async() => {
        const id = "efc7bec5-b6b1-442b-bb89-a3892af7018f";

        const updateData = {
          name: "Juanito",
          lastname: "Adasme",
          email: "juanitoDwarf@gmail.com",
          rol: "Gerente de Desarrollo"
        };

        const res = await request(app).put(`/api/v1/usuario/${id}`).send(updateData);

        expect(res.status).to.equal(201);
        expect(res.body.message).to.equal("Usuario Actualizado");
        expect(res.body.newData).to.includes(updateData);
        expect(res.body.oldData).to.be.an("object");
    })
  })
});
