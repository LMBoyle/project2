module.exports = function (db) {
  return {
    // Get all examples
    getExamples: function (req, res) {
      db.Example.findAll({}).then(function (dbExamples) {
        res.json(dbExamples);
      });
    },
    // Create a new example
    createExample: function (req, res) {
      db.Example.create(req.body).then(function (dbExample) {
        res.json(dbExample);
      });
    },
    // Delete an example by id
    deleteExample: function (req, res) {
      db.Example.destroy({ where: { id: req.params.id } }).then(function (dbExample) {
        res.json(dbExample);
      });
    },

    // Get all documents
    getDocuments: async (req, res) => {
      try {
        const results = await db.Documents.findAll({});
        res.json(results);
      } catch (err) { console.log('Problem with statement 1'); }
    },
    // Create a new Documents
    createDocuments: async (req, res) => {
      try {
        const results = await db.Documents.create(req.body);
        res.json(results);
      } catch (err) {
        console.log('Problem with statment 2');
      }
    },
    // Delete an example by id
    deleteDocuments: async (req, res) => {
      try {
        const results = await db.Documents.destroy({ where: { id: req.params.id } });
        res.json(results);
      } catch (err) { console.log('Problem with statement 3'); }
    }
  };
};
