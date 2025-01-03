export const callArrayOfFunctions = <T extends Function>(functions: T[]) => {
	for (const fn of functions) {
		fn();
	}
};
