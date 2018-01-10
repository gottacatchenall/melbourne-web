import {sequelize, inc1, inc2, inc3, inc4} from '../models/index.js';

//============================================
// Helper Functions
//============================================

function getData(inc){
  inc.findAll().then(function(result){
    return result;
  });
}

//============================================
// Export Functions
//============================================
export function fetchIncData(req, res){
  sequelize.sync().then(function(){
      var data = {
       inc1: getData(inc1),
       inc2: getData(inc2),
       inc3: getData(inc3),
       inc4: getData(inc4)
     };
     res.send(data);
  });
}

export function getIncData(req, res){
  var incNum = req.params['num'];
  let inc;
  switch(incNum){
    case "1": inc = inc1; break;
    case "2": inc = inc2; break;
    case "3": inc = inc3; break;
    case "4": inc = inc4; break;
  }
  var data = getData(inc);
  res.send(data);
}
