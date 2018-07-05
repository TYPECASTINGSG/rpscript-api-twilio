/**
 * @module twilio
 */

import Twilio from 'twilio';
import {RpsContext,RpsModule,rpsAction} from 'rpscript-interface';

let MOD_ID = "twilio";

export interface TwilioContext {
  client?:any;
  accountSid?:string;
  authToken?:string;
  fromNumber?:string;
}

@RpsModule(MOD_ID)
export default class RPSTwilio {

  constructor(ctx:RpsContext){
    let mapContext = ctx.getModuleContext(MOD_ID);
    
    if(!mapContext)
      ctx.event.emit(RpsContext.LOAD_MOD_ERR_EVT,MOD_ID,new Error("No config found for twilio module"));
    else {

      mapContext['client'] = Twilio(mapContext.accountSid,mapContext.authToken);

      ctx.addModuleContext(MOD_ID,mapContext);
    }
  }

  @rpsAction({verbName:'send-sms'})
  async sendsms (ctx:RpsContext,opts:Object, to:string,body:string,mediaUrl?:string) : Promise<any>{
    let client = ctx.getModuleContext(MOD_ID)['client'];
    let fromNo = ctx.getModuleContext(MOD_ID)['fromNumber'];

    return client.messages.create({to:to,from:fromNo,body:body,mediaUrl:mediaUrl});
  }

  @rpsAction({verbName:'phone-call'})
  async phonecall (ctx:RpsContext,opts:Object, to:string, url:string) : Promise<any>{
    let client = ctx.getModuleContext(MOD_ID)['client'];
    let fromNo = ctx.getModuleContext(MOD_ID)['fromNumber'];

    return client.calls.create({to:to,from:fromNo,url:url});
  }

}

