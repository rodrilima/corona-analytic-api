const CronJob = require("cron").CronJob;

const mds = require("../libs/mds");

const cron = require("../config/cron");

class Cron {
  constructor() {
    this.cronJobs = [this.add(cron.updateCorona, mds.save)];
  }
  add(cron, job) {
    return new CronJob(cron, job, null, true, "America/Sao_Paulo");
  }
  init() {
    this.cronJobs.forEach(cronJob => {
      cronJob.start();
    });
  }
}

module.exports = new Cron();
