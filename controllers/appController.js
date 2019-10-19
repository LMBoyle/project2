const sjcl = require("sjcl")
const fs = require("fs")
module.exports = function (db) {
  return {
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
        if(req.isAuthenticated()) {
          if(req.files){
            let file = req.files.filename;
            let filename = file.name;
            let path = "./uploads/" + req.body.lastName + "_" + req.body.firstName + "_" + req.user.id + "_" + req.body.docType + "_" + filename;
            file.mv(path, function (err) {
              if(err){
                console.log(err);
                res.status(500).json({message: "Something went wrong on our end and an error has occured while trying to upload your file, please try again"});
              } else {
                console.log(path);
                db.Documents.update({
                  docCreated: true,
                  docFirstName: req.body.firstName,
                  docLastName: req.body.lastName,
                  docIdNumber: req.body.docIdNumber ? sjcl.encrypt(process.env.SHA_PASS, req.body.docIdNumber) : null,
                  docExpiration: req.body.docExpiration ? sjcl.encrypt(process.env.SHA_PASS, req.body.docExpiration) : null,
                  docPDF: sjcl.encrypt(process.env.SHA_PASS, path),
                  docFileName: sjcl.encrypt(process.env.SHA_PASS, filename) },
                  {where: {doctype: req.body.docType, UserId: req.user.id}}).then(() =>
                  res.redirect('/documents'));
              }
            })
          } else {
            db.Documents.update({
              docCreated: true,
              docFirstName: req.body.firstName,
              docLastName: req.body.lastName,
              docIdNumber: req.body.docIdNumber || null,
              docExpiration: req.body.docExpiration || null,
              docPDF: null,
              docFileName: null },
              {where: {doctype: req.body.docType, UserId: req.user.id}}).then(() =>
              res.redirect('/documents'));
          }
        } else {
          res.redirect('back');
        }
      } catch (err) {
        console.log('Problem with statement 2');
      }
    },
    // Delete an document by id
    deleteDocuments: async (req, res) => {
      try {
        let table = await db.Documents.findOne({where: {id: req.params.id}})
        let a = await (table.dataValues.docPDF) ? sjcl.decrypt(process.env.SHA_PASS, table.dataValues.docPDF) : null;
        console.log(a)
        if(a){fs.unlinkSync(a)};
        db.Documents.update({
          docCreated: false,
          docFirstName: req.body.firstName,
          docLastName: req.body.lastName,
          docIdNumber: null,
          docExpiration: null,
          docPDF: null,
          docFileName: null},
          {where: {id: req.params.id}}).then(res.send("done"));
      } catch (err) { console.log(err); }
      
    }
  };
};
