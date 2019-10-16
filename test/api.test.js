const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const db = require('../models');
const expect = chai.expect;

// Setting up the chai http plugin
chai.use(chaiHttp);

let request;

describe('GET /api/documents', function () {
  // Before each test begins, create a new request server for testing
  // & delete all examples from the db
  beforeEach(function () {
    request = chai.request(server);
    return db.sequelize.sync({ force: true });
  });

  it('should find all documents', function (done) {
    // Add some examples to the db to test with
    db.Documents.bulkCreate([
      { docFirstName: 'First First Name', docLastName: 'First Last Name', docType: 'First Doc Type' },
      { docFirstName: 'Second First Name', docLastName: 'Second Last Name', docType: 'Second Doc Type' }
    ]).then(function () {
      // Request the route that returns all examples
      request.get('/api/examples').end(function (err, res) {
        const responseStatus = res.status;
        const responseBody = res.body;

        // Run assertions on the response

        // eslint-disable-next-line no-unused-expressions
        expect(err).to.be.null;

        expect(responseStatus).to.equal(200);

        expect(responseBody)
          .to.be.an('object')
          .that.has.lengthOf(2);

        expect(responseBody[0])
          .to.be.an('object')
          .that.includes({ docFirstName: 'First First Name', docLastName: 'First Last Name', docType: 'First Doc Type' });

        expect(responseBody[1])
          .to.be.an('object')
          .that.includes({ docFirstName: 'Second First Name', docLastName: 'Second Last Name', docType: 'Second Doc Type' });

        // The `done` function is used to end any asynchronous tests
        done();
      });
    });
  });
});

describe('POST /api/documents', function () {
  // Before each test begins, create a new request server for testing
  // & delete all examples from the db
  beforeEach(function () {
    request = chai.request(server);
    return db.sequelize.sync({ force: true });
  });

  it('should save a document', function (done) {
    // Create an object to send to the endpoint
    const reqBody = {
      docFirstName: 'Example text',
      docLastName: 'Example description',
      docType: 'Example type'
    };

    // POST the request body to the server
    request
      .post('/api/documents')
      .send(reqBody)
      .end(function (err, res) {
        const responseStatus = res.status;
        const responseBody = res.body;

        // Run assertions on the response

        // eslint-disable-next-line no-unused-expressions
        expect(err).to.be.null;

        expect(responseStatus).to.equal(200);

        expect(responseBody)
          .to.be.an('object')
          .that.includes(reqBody);

        // The `done` function is used to end any asynchronous tests
        done();
      });
  });
});
