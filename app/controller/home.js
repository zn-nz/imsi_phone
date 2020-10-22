'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async list() {
    const { ctx, service } = this;
    const result = await service.imsi.list()
    ctx.body = result
  }
  async update() {
    const { ctx, service } = this;
    const result = await service.imsi.update()
    ctx.body = result
  }
}

module.exports = HomeController;
