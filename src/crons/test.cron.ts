import { CronJob } from "cron";

const handler = async () => {
  console.log("Hello world!");
};

export const testCron = new CronJob("*/10 * * * * *", handler);
