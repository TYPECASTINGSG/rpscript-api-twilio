import {expect} from 'chai';
import m from 'mocha';

import RPSTwilio from '../src/index';
import { RpsContext } from 'rpscript-interface';

m.describe('Twilio', () => {

  m.xit('should send SMS', async function () {
    let ctx = new RpsContext;
    ctx.addModuleContext('twilio',{accountSid:'ACCT_SID', authToken:'AUTH_TOKEN', fromNumber:'NO'});
    let md = new RPSTwilio(ctx);

    let output = await md.sendsms(ctx,{},"+6597992855","hello from twilio");

    console.log(output);

  }).timeout(0);

  m.it('should make phone call', async function () {
    let ctx = new RpsContext;
    ctx.addModuleContext('twilio',{accountSid:'ACCT_SID', authToken:'AUTH_TOKEN', fromNumber:'NO'});
    let md = new RPSTwilio(ctx);

    let output = await md.phonecall(ctx,{},"+6597992855","https://demo.twilio.com/docs/voice.xml");

    console.log(output);

  }).timeout(0);

})
