export class SignOutStatus {
	static started = false;

	public static setStatusStarted(val: boolean) {
		// console.log('setStatusStarted', val);
		SignOutStatus.started = val;
	}

	public static getStatusStarted() {
		return SignOutStatus.started;
	}
}
