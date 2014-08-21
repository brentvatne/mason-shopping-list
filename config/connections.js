module.exports.connections = {
  localDiskDb: {
    adapter: 'sails-disk'
  },

  productionMongoHqDb: {
    adapter: 'sails-mongo',
    url: process.env.MONGOHQ_URL
  }
};
