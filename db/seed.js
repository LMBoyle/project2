module.exports = (db) => {
  db.User.create({
    firstName: 'Joe',
    lastName: 'Gates',
    email: 'j@g.co',
    password: process.env.ADMIN_USER_PWD,
    isAdmin: true
  });
  db.User.create({
    firstName: 'Jane',
    lastName: 'Jobs',
    email: 'j@j.co',
    password: process.env.USER_PWD,
    isAdmin: false
  });
  db.Documents.create({
    docFirstName: 'joe',
    docLastName: 'gates',
    docType: 'Drivers License',
    docCreated: true
  });
  db.Documents.create({
    docFirstName: 'joe',
    docLastName: 'gates',
    docType: 'Passport',
    docCreated: true
  });
  db.Documents.create({
    docFirstName: 'joe',
    docLastName: 'gates',
    docType: 'Last Will & Testament'
  });
  db.Documents.create({
    docFirstName: 'joe',
    docLastName: 'gates',
    docType: 'Bank Accounts'
  });
  db.Documents.create({
    docFirstName: 'joe',
    docLastName: 'gates',
    docType: 'Social Media'
  });
  db.Documents.create({
    docFirstName: 'joe',
    docLastName: 'gates',
    docType: 'Documents and Photos'
  });
};
