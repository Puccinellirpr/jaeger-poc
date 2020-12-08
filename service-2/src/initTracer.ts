import {initTracer} from 'jaeger-client'
import * as opentracing from 'opentracing';

function initJaegerTracer(serviceName: string) {
  const config = {
    serviceName,
    sampler: {
      type: 'const',
      param: 1,
    },
    reporter: {
        collectorEndpoint : 'http://localhost:14268/api/traces'
    },
  };
  const options = {
    logger: {
      info: function logInfo(msg: string) {
        console.log('INFO  ', msg);
      },
      error: function logError(msg: string) {
        console.log('ERROR ', msg);
      },
    },
  };
  return initTracer(config, options);
}

export const tracer = initJaegerTracer('service-2') as opentracing.Tracer;