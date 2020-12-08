import {tracer} from './initTracer'
import {Span,FORMAT_HTTP_HEADERS,Tags} from 'opentracing'

export function createControllerSpan(controller: string, operation: string, headers: any) {
    let traceSpan: Span;
    const parentSpanContext = tracer.extract(FORMAT_HTTP_HEADERS, headers);
    if (parentSpanContext) {
      traceSpan = tracer.startSpan(operation, {
        childOf: parentSpanContext,
        tags: {
          [Tags.SPAN_KIND]: Tags.SPAN_KIND_RPC_SERVER,
          [Tags.COMPONENT]: controller
        }
      });
    } else {
      traceSpan = tracer.startSpan(operation, {
        tags: {
          [Tags.SPAN_KIND]: Tags.SPAN_KIND_RPC_SERVER,
          [Tags.COMPONENT]: controller
        }
      });
    }
    return traceSpan;
  }

export function finishSpanWithResult(span: Span, status: Number, errorTag?: boolean,headers?: any,request?: any,responseBody?: any) {
span.setTag(Tags.HTTP_STATUS_CODE, status);

span.setTag('headers', headers)
span.setTag('request', request)
span.setTag('response',responseBody)
if (errorTag) {
    span.setTag(Tags.ERROR, true);
}
span.finish();
}