/// <reference types="node" />
import { HTTPRequestContext, HTTPMethod } from '../WebDAVRequest';
import { ResourceType } from '../../../manager/v2/fileSystem/CommonTypes';
export default class implements HTTPMethod {
    unchunked(ctx: HTTPRequestContext, data: Buffer, callback: () => void): void;
    isValidFor(ctx: HTTPRequestContext, type: ResourceType): boolean;
}
