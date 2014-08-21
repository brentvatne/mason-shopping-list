/**
 * ItemController
 *
 * @description :: Server-side logic for managing items
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  destroyAll: function(req, res) {
    Item.destroy({}).exec(function(err, response) {
      res.json({success: true});
    })
  }

};

