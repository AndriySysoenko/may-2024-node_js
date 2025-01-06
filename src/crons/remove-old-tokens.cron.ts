import { CronJob } from "cron";

import { config } from "../configs/config";
import { timeHelper } from "../helpers/time.halper";
import { tokenRepository } from "../repositories/token.repository";

const handler = async () => {
  try {
    const string = config.jwtRefreshExpiresIn;
    const { value, unit } = timeHelper.parseConfigString(string);
    const date = timeHelper.subtractCurrentByParams(value, unit);
    const count = await tokenRepository.deleteBeforeDate(date);
    console.log(`Deleted ${count} tokens`);
  } catch (e) {
    console.error(e.message);
  }
};

export const removeOldTokensCron = new CronJob("* * */12 * * *", handler);
