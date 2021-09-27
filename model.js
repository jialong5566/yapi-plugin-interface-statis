const yapi = require('../../server/yapi.js');
const model = require('../../exts/yapi-plugin-statistics/statisMockModel');

if(model.prototype){
  model.prototype.listCount = (interface_id) =>{
      const inst = yapi.getInst(model);
      return inst.model.find({interface_id}).countDocuments();
  }
  model.prototype.listWithPaging = (page, limit, interface_id)=> {
      const inst = yapi.getInst(model);
      page = parseInt(page);
      limit = parseInt(limit);
      return inst.model
        .find({interface_id})
        .sort({ _id: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .select('time ip date')
        .exec();
  }
}


module.exports = model;