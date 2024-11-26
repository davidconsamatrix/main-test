enum Environment {
  dev = "dev",
  qa = "qa",
  uat = "uat",
  prod = "prod",
}

enum LogLevelName {
  debug = "DEBUG",
  info = "INFO",
  error = "ERROR",
  silent = "SILENT",
}

function determinateLogLevel(environment: string, logLevelName?: string): LogLevelName {
  const env = <Environment>environment;

  if ([Environment.uat, Environment.prod].includes(env)) {
    return LogLevelName.info;
  }

  if ([Environment.dev, Environment.qa].includes(env) && !logLevelName) {
    return LogLevelName.silent;
  }

  if (logLevelName) {
    return <LogLevelName>logLevelName?.toUpperCase();
  }

  return LogLevelName.silent;
}

console.log("================================================");
console.log(determinateLogLevel("qa", "INFO1"));


console.log("================================================");
console.log(determinateLogLevel("qa", "INFO1"));