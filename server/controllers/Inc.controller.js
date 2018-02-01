import {sequelize, inc1, inc2, inc3, inc4, targets} from '../models/index.js';

//============================================
// Helper Functions
//============================================

function getTarget(inc){
    var options = {
        where: {
           incubator: inc
       },
       attributes: ['target']
    };
    targets.findAll(options).then(function(result){
        return result.target;
    });
}

//============================================
// Export Functions
//============================================
export function fetchIncData(req, res){
  sequelize.sync().then(function(){
      inc1.findAll().then(function(i1){
          inc2.findAll().then(function(i2){
              inc3.findAll().then(function(i3){
                  inc4.findAll().then(function(i4){
                      var data = [i1, i2, i3, i4]
                      res.json(data);
                  });
              });
          });
      });
  });
}

export async function getIncData(req, res){
    var incNum = req.params['num'];
    let inc;
    switch(incNum){
        case "1": inc = inc1; break;
        case "2": inc = inc2; break;
        case "3": inc = inc3; break;
        case "4": inc = inc4; break;
    }
    sequelize.sync().then(function(){
        inc.findAll().then(function(result){
          if (result){
              res.json(result);
          }
          else{
              res.json(null);
          }
        });
    });
}

export function updateIncData(req, res){

    if(!req.body){
        res.send('needs data!');
    }

    let inc;
    var incNum = req.body.incNum;
    switch(incNum){
      case 1: inc = inc1; break;
      case 2: inc = inc2; break;
      case 3: inc = inc3; break;
      case 4: inc = inc4; break;
    }

    var targetQuery = {}

    var data = {
        humidity: req.body.humidity,
    };

    if(inc){
        sequelize.sync().then(function(){
            var response = null;
            var targ_options = {
                where: { incubator: incNum },
            };
            targets.find(targ_options).then(function(result){
                var data = {
                    humidity: req.body.humidity,
                    concurrent_target: result.target,
                };
                inc.bulkCreate([data], { validate: true }).catch(errors => {
                    response = errors
                });
                if (response){
                    res.json(response);
                }
                else{
                    res.json(null);
                }
            });
        });
    }
}
