import {sequelize, targets} from '../models/index.js';


//============================================
// Helper Functions
//============================================

function init_targets_if_dne(){
    targets
        .count()
        .then(function(result){
            console.log(result)
            if(result != 4){
                targets.destroy({where: {},truncate: true})
                    .then(function(){;
                        var data = [{incubator: 1}, {incubator: 2}, {incubator: 3},{incubator: 4}];
                        targets.bulkCreate(data, { validate: true }).catch(errors => {
                            res.json(errors);
                            return;
                        });
                    });
            }
        });
}

//============================================
// Export Functions
//============================================

export function fetchTargets(req, res){
  sequelize.sync().then(function(){
    targets.findAll().then(function(result){
        if (result){
            res.json(result);
        }
        else{
            res.json(null);
        }
    });
  });
}

export function updateTarget(req, res){
    if(!req.body || !req.body.target || !req.body.incNum){
        res.send('needs data!');
        return;
    }

    let inc;
    var incNum = req.body.incNum;

    var data = {target: req.body.target}
    sequelize.sync().then(function(){
        init_targets_if_dne()
        targets.update(data, { where: { incubator: incNum } }).then(function(result){
            if (result){
                res.json(result);
            }
            else{
                res.json(null);
            }
        });
    });
}
