export class Message {
    uid: string;
    displayName: string;
    photoURL: string;
    message: string;

    constructor(obj?: any) {
        this.uid = obj ? obj.uid : '';
        this.displayName = obj ? obj.displayName : '';
        this.photoURL = obj ? obj.photoURL : '';
        this.message = obj ? obj.message : '';
    }

    /**
     * Converts a user object into a JSON
     * @returns JSON
     */
    public toJSON() {
        return {
            uid: this.uid,
            displayName: this.displayName,
            photoURL: this.photoURL,
            message: this.message,
        }
    }
}