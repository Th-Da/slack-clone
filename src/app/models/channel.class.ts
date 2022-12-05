export class Channel {
  channelId: string;
  channelName: string;

  constructor(obj?: any) {
    this.channelId = obj ? obj.channelId : '';
    this.channelName = obj ? obj.channelName : '';
  }
}
