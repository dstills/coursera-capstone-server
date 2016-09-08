var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Layers = require('../models/layers');

var layerRouter = express.Router();
layerRouter.use(bodyParser.json());
layerRouter.route('/')
  .get(function(req, res, next) {
    Layers.find({}, function(err, layer) {
      if (err) {
        return next(err);
      }
      res.json(layer);
    });
  })

  .delete(function(req, res, next) {
    Layers.remove({}, function(err, resp) {
      if (err) {
        return next(err);
      }
      res.json(resp);
    });
  })

  .post(function(req, res, next) {
    Layers.create(req.body, function(err, layer) {
      if (err) {
        return next(err);
      }
      console.log('Layer created');
      var id = layer._id;
      res.writeHead(200, {
        'Content-Type': 'text/plain'
      });
      res.end('Added the layer with the id: ', id);
    });
  })
;

layerRouter.route('/:layerId')
  .get(function(req, res, next) {
    Layers.findById(req.params.layerId, function(err, layer) {
      if (err) {
        return next(err);
      }
      res.json(layer);
    });
  })

  .put(function(req, res, next) {
    Layers.findByIdAndUpdate(req.params.layerId, {
      $set: req.body
    }, {
      new: true
    }, function(err, layer) {
      if (err) {
        return next(err);
      }
      res.json(layer);
    });
  })

  .delete(function(req, res, next) {
    Layers.remove(req.params.layerId, function(err, resp) {
      if (err) {
        return next(err);
      }
      res.json(resp);
    });
  })
;

module.exports = layerRouter;