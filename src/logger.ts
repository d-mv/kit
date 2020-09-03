enum LogType {
  INFO = 'info',
  ERROR = 'error',
  WARN = 'warn',
}

const DECORATION: Record<string, string> = {
  info:
    'color: green; background-color: lightgreen; padding: 3px 8px; border-radius: 2px;',
  error:
    'color:red; background-color: pink; padding: 3px 8px; border-radius: 4px;',
  warn:
    'color: sienna; background-color: bisque; padding: 3px 8px; border-radius: 4px;',
};

const isDev = () => process.env.NODE_ENV === 'development';

export function log(
  type: LogType,
  message: unknown,
  payload?: unknown
): false | void {
  // eslint-disable-next-line no-console
  isDev() &&
    console[type ?? log](`%c${message || ''}`, DECORATION[type], payload || '');
}

function logError(message: string | number, payload?: unknown) {
  log(LogType.ERROR, message, payload);
}

function logInfo(message: unknown, payload?: unknown) {
  log(LogType.INFO, message, payload);
}

function logWarn(message: unknown, payload?: unknown) {
  log(LogType.WARN, message, payload);
}

function logBeta(message: string, ...payloads: unknown[]) {
  return (
    isDev() &&
    // eslint-disable-next-line no-console
    console.info(
      `%c[β] ${message || ''}`,
      'color: midnightblue; background-color: lightblue; padding: 3px 10px 2px 10px; border-radius: 2px;',
      payloads || ''
    )
  );
}

function logAlpha(message: string, ...payloads: unknown[]) {
  return (
    isDev() &&
    // eslint-disable-next-line no-console
    console.info(
      `%c[α] ${message || ''}`,
      'color: maroon; background-color: mistyrose; padding: 3px 10px 2px 10px; border-radius: 2px;',
      payloads || ''
    )
  );
}

function lg(...props: unknown[]) {
  const { info } = console;

  isDev() && info(...props);
}

export { lg, logError, logInfo, logWarn, logBeta, logAlpha };
