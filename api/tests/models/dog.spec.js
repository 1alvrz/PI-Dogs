const { Dog, conn } = require('../../src/db.js');
const { expect } = require('chai');

const dog = {
  "name": "b",
  "height": ["30", "40"],
  "weight": ["60", "80"],
  "years": "12 - 20 years",
  "image": "soy la imagen",
};

describe('Dog model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Dog.sync({ force: true }));
    describe('name', () => {
      it('Debería arrojar error si los datos son inválidos', (done) => {
        Dog.create({})
          .then(() => done(new Error('Requiere datos validos')))
          .catch(() => done());
      });
      it('Debería funcionar con un nombre valido', () => {
        Dog.create({ name: 'Pug' });
      });
      it("Se debería crear la raza si los datos son correctos", () => {
        Dog.create(dog);
      })
    });
  });
});