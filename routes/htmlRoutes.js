const router = require('express').Router();

module.exports = (db) => {
  // Load register page
  router.get('/register', (req, res) => {
    if (req.isAuthenticated()) {
      res.redirect('/profile');
    } else {
      res.render('register');
    }
  });

  // Load profile page
  router.get('/profile', (req, res) => {
    if (req.isAuthenticated()) {
      db.User.findOne({
        where: {
          id: req.session.passport.user.id
        }
      }).then(() => {
        const user = {
          userInfo: req.session.passport.user,
          isloggedin: req.isAuthenticated()
        };
        // console.log(user);
        res.render('profile', user);
      });
    } else {
      res.redirect('/');
    }
  });

  // Load dashboard page
  router.get('/', (req, res) => {
    if (req.isAuthenticated()) {
      const user = {
        user: req.session.passport.user,
        isloggedin: req.isAuthenticated()
      };
      res.render('dashboard', user);
    } else {
      res.render('dashboard');
    }
  });

  // Load dashboard page
  router.get('/dashboard', (req, res) => {
    if (req.isAuthenticated()) {
      const user = {
        user: req.session.passport.user,
        isloggedin: req.isAuthenticated()
      };
      res.render('dashboard', user);
    } else {
      res.render('dashboard');
    }
  });

  // Load example index page
  router.get('/example', function (req, res) {
    if (req.isAuthenticated()) {
      db.Example.findAll({}).then(function (dbExamples) {
        res.render('example', {
          msg: 'Welcome!',
          examples: dbExamples
        });
      });
    } else {
      res.redirect('/');
    }
  });

  // load DBD landing page
  router.get('/documents', function (req, res) {
    if (req.isAuthenticated()) {
      db.Example.findAll({}).then(function (dbDocuments) {
        res.render('documents', {
          msg: 'Welcome!',
          examples: dbDocuments
        });
      });
    } else {
      res.redirect('/');
    }
  });

  // Load landing and pass in an document by id
  router.get('/document/:id', function (req, res) {
    if (req.isAuthenticated()) {
      db.Document.findOne({ where: { id: req.params.id } }).then(function (dbDocument) {
        res.render('document-detail', {
          document: dbDocument
        });
      });
    } else {
      res.redirect('/');
    }
  });

  // Load landing index page
  router.get('/documents', function (req, res) {
    if (req.isAuthenticated()) {
      db.Documents.findAll({}).then(function (dbDocuments) {
        res.render('documents', {
          msg: 'Welcome!',
          examples: dbDocuments
        });
      });
    } else {
      res.redirect('/');
    }
  });

  // Load document page and pass in an document by id
  router.get('/documents/:id', function (req, res) {
    if (req.isAuthenticated()) {
      db.Documents.findOne({ where: { id: req.params.id } }).then(function (dbbDocuments) {
        res.render('documents-detail', {
          documents: dbbDocuments
        });
      });
    } else {
      res.redirect('/');
    }
  });

  // Logout
  router.get('/logout', (req, res, next) => {
    req.logout();
    req.session.destroy((err) => {
      if (err) {
        return next(err);
      }
      res.clearCookie('connect.sid', { path: '/' });
      res.redirect('/');
    });
  });

  // Render 404 page for any unmatched routes
  router.get('*', function (req, res) {
    res.render('404');
  });

  return router;
};
