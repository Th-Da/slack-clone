export class Channel {
  channelId: string;
  channelName: string;
  // messages: any = [];

  constructor(obj?: any) {
    this.channelId = obj ? obj.channelId : '';
    this.channelName = obj ? obj.channelName : '';
    // this.messages = obj ? obj.messages : [];
  }
}
