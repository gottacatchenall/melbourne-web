import {sequelize, targets} from '../models/index.js';

export function fetchTargets(req, res){
  sequelize.sync().then(function(){
    targets.findAll().then(function(result){
      res.send(result);
    });
  });
}
