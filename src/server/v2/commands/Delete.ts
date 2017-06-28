import { HTTPCodes, RequestContext, HTTPMethod } from '../WebDAVRequest'
import { ResourceType } from '../../../manager/v2/fileSystem/CommonTypes'

export default class implements HTTPMethod
{
    unchunked(ctx : RequestContext, data : Buffer, callback : () => void) : void
    {
        ctx.noBodyExpected(() => {
            ctx.getResource((e, r) => {
                if(e)
                {
                    ctx.setCode(HTTPCodes.NotFound)
                    callback()
                    return;
                }

                ctx.checkIfHeader(r, () => {
                    //ctx.requirePrivilege([ 'canDelete' ], r, () => {
                        r.delete((e) => process.nextTick(() => {
                            if(e)
                                ctx.setCode(HTTPCodes.InternalServerError);
                            else
                            {
                                ctx.setCode(HTTPCodes.OK);
                                //ctx.invokeEvent('delete', r);
                            }
                            callback();
                        }))
                    //})
                })
            })
        })
    }

    isValidFor(type : ResourceType)
    {
        return !!type;
    }
}