import {DOMParser, XMLSerializer} from "xmldom";

export class XmlTools {
    static parseXml(xmlString: string): Document {
        return new DOMParser().parseFromString(xmlString);
    }

    static serializeXml(xml: Document): string {
        return new XMLSerializer().serializeToString(xml);
    }
}

