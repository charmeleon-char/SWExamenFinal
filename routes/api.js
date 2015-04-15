var express = require('express');
var router = express.Router();

/* GET home page. */
function apiRoutes(db){
  var sleepDataSet = db.collection("sleepDataSet");
  router.get('/dataset', function(req, res, next) {
    sleepDataSet.find().toArray(function(err, dataset){
      if(err){
        return next(err, req, res);
      }
      console.log(dataset);
      res.status(200).json(dataset);
    });
  });

  router.get('/dataset/2', function(req, res, next) {
    sleepDataSet.find({"group":"2"}).toArray(function(err, dataset){
      if(err){
        return next(err, req, res);
      }
    res.status(200).json(dataset);
  });
});
  router.get('/dataset/1', function(req, res, next) {
    sleepDataSet.find({"group":"1"}).toArray(function(err, dataset){
      if(err){
        return next(err, req, res);
      }
      res.status(200).json(dataset);
    });
  });

  router.get('/dataset/person/:id', function(req, res, next) {

    sleepDataSet.find({"ID":req.params.id}).toArray(function(err, dataset){
      if(err){
        return next(err, req, res);
      }
      console.log(dataset);
      res.status(200).json(dataset);
    });
  });

  router.post('/dataset/modAll', function(req, res, next) {

    var query = {
        group: '1'
      };
      sleepDataSet.update(query,{"$set":{"Medicamento":"MedTest1"}},{"upsert":true},{"multi":true},function(err ,med ,status){
      res.status(200).json({"Med":med});
    });


    var query = {
      group: '2'
    };
    sleepDataSet.update(query,{"$set":{"Medicamento":"MedTest2"}},{"upsert":true},{"multi":true},function(err ,med ,status){
      res.status(200).json({"Med":med});
    });


    sleepDataSet.find().toArray(function(err, dataset){
      if(err){
        return next(err, req, res);
      }
      console.log(dataset);
      res.status(200).json(dataset);
    });
  });
  return router;
}
module.exports = apiRoutes;
