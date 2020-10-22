'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/api/v1/list', controller.home.list);
  router.post('/api/v1/update', controller.home.update);
};
