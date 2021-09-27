const yapi = require('../../server/yapi.js');
const baseController = require('../../server/controllers/base.js');
const model = require('./model.js');


class interfaceStatisController extends baseController {
  constructor(ctx) {
    super(ctx);
    this.Model = yapi.getInst(model);
  }

  async getInterfaceStatisList(ctx){
    let page = ctx.request.query.page || 1,
      limit = ctx.request.query.limit || 20,
      interface_id = Number(ctx.request.query.interface_id)||0;

    const inst = yapi.getInst(model);
    try {
      let list = await inst.listWithPaging(page, limit, interface_id);
      let count = await inst.listCount(interface_id);
      return (ctx.body = yapi.commons.resReturn({
        count: count,
        total: Math.ceil(count / limit),
        list
      }));
    } catch (e) {
      return (ctx.body = yapi.commons.resReturn(null, 402, e.message));
    }
  }
}

module.exports = interfaceStatisController;