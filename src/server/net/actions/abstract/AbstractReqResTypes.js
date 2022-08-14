"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayloadResponse = exports.AbstractArrayCarrierResponse = exports.StringCarrierRequest = exports.SearchRequest = exports.FindOptionsRequest = exports.PayloadRequest = void 0;
const QueryOptions_1 = require("../../QueryOptions");
const HttpRequestResponse_1 = require("./HttpRequestResponse");
class PayloadRequest extends HttpRequestResponse_1.AbstractRequest {
    payload = this.getDefaultPayload();
    withPayload(payload) {
        this.payload = payload;
        return this;
    }
}
exports.PayloadRequest = PayloadRequest;
class FindOptionsRequest extends HttpRequestResponse_1.AbstractRequest {
    options = new QueryOptions_1.FindQueryOptions();
    withOptions(options) {
        this.options = options;
        return this;
    }
}
exports.FindOptionsRequest = FindOptionsRequest;
class SearchRequest extends HttpRequestResponse_1.AbstractRequest {
    query = {};
    options = new QueryOptions_1.FindQueryOptions();
    withQuery(query) {
        this.query = query;
        return this;
    }
    withOptions(options) {
        this.options = options;
        return this;
    }
}
exports.SearchRequest = SearchRequest;
class StringCarrierRequest extends HttpRequestResponse_1.AbstractRequest {
    payload = "";
    withPayload(payload) {
        this.payload = payload;
        return this;
    }
}
exports.StringCarrierRequest = StringCarrierRequest;
class AbstractArrayCarrierResponse {
    payload = [];
    withPayload(payload) {
        this.payload = payload;
        return this;
    }
}
exports.AbstractArrayCarrierResponse = AbstractArrayCarrierResponse;
class PayloadResponse {
    payload;
    withPayload(payload) {
        this.payload = payload;
        return this;
    }
}
exports.PayloadResponse = PayloadResponse;
//# sourceMappingURL=AbstractReqResTypes.js.map