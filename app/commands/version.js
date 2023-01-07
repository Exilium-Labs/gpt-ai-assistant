import { COMMAND_SYS_VERSION, GENERAL_COMMANDS } from '../../constants/command.js';
import { t } from '../../locales/index.js';
import { fetchVersion, formatCommand, getVersion } from '../../utils/index.js';
import Context from '../context.js';
import { updateHistory } from '../history/index.js';

/**
 * @param {Context} context
 * @returns {boolean}
 */
const check = (context) => context.isCommand(COMMAND_SYS_VERSION);

/**
 * @param {Context} context
 * @returns {Promise<Context>}
 */
const exec = (context) => check(context) && (
  async () => {
    updateHistory(context.id, (history) => history.records.pop());
    const current = getVersion();
    const latest = await fetchVersion();
    const isLatest = current === latest;
    const text = t('__COMMAND_SYS_VERSION_REPLY')(current, isLatest);
    context.pushText(text, formatCommand(GENERAL_COMMANDS));
    if (!isLatest) context.pushText(t('__MESSAGE_NEW_VERSION_AVAILABLE')(latest));
    return context;
  }
)();

export default exec;
