var User = require('../data/models/user');

const getUser = function(req) {
  return new Promise((resolve, reject) => {
    if (!req || !req.session) resolve(null);
    let id = req.session.userId;
    if (id) {
      User.findById(id)
        .then(function(user, error) {
          let result;
          if (error) {
            reject(error);
          } else {
            resolve(user);
          }
        });
    } else {
      resolve(null);
    }
  })
}

module.exports = getUser;
