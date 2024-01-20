'use strict';

export default class API {
	async getData() {
		const url = '/../../data/photographers.json';
		const response = await fetch(url);
		const data = await response.json();

		const dataPhotographers = [...data.photographers];
		const dataMedias = [...data.media];

		return {
			'photographers': dataPhotographers,
			'media': dataMedias,
		};
	}
}
