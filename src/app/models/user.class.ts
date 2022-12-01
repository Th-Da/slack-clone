export class User {
    userId: string = '';
    displayName: string = '';
    // photoURL: string = ''; TODO implement photo upload
    // emailVerified: boolean = false; TODO OPTIONAL - Implement email verifier

    constructor(user: User) {
        this.userId = user.userId;
        this.displayName = user.displayName;
    }
}