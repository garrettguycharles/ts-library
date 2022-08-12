"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XmlTools = void 0;
const xmldom_1 = require("xmldom");
class XmlTools {
    static parseXml(xmlString) {
        return new xmldom_1.DOMParser().parseFromString(xmlString);
    }
    static serializeXml(xml) {
        return new xmldom_1.XMLSerializer().serializeToString(xml);
    }
}
exports.XmlTools = XmlTools;
//# sourceMappingURL=XmlTools.js.map