export class Directmessage {
  directmessageId: string;
  directmessageName: string;
  directmessages: any = [];

  constructor(obj?: any) {
    this.directmessageId = obj ? obj.directmessageId : '';
    this.directmessageName = obj ? obj.directmessageName : '';
    this.directmessages = obj ? obj.directmessages : [];
  }
}
