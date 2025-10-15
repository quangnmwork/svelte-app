// Svelte "class state" using the $state macro (as in Svelte Labs' reactivity)
//
// In SvelteKit (and Svelte) you generally don't store component state in classes,
// but if you want "reactive properties" in a class using $state macro:

export class User {
	name = $state<string | null>(null);
	embarrassingSecret = $state<string | null>(null);

	constructor(name: string | null, embarrassingSecret: string | null) {
		this.name = name ?? null;
		this.embarrassingSecret = embarrassingSecret ?? null;
	}

	getName() {
		return this.name;
	}

	getEmbarrassingSecret() {
		return this.embarrassingSecret;
	}

	setName(name: string | null) {
		this.name = name;
	}

	setEmbarrassingSecret(embarrassingSecret: string | null) {
		this.embarrassingSecret = embarrassingSecret;
	}

	toJSON() {
		return {
			name: this.name,
			embarrassingSecret: this.embarrassingSecret
		};
	}
}

export const userGlobal = new User('Hello', '');
