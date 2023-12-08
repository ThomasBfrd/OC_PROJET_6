class Api {

    constructor(url) {
        this._url = url;
    }

    async getData() {
        return fetch(this._url)
            .then(response => response.json())
            .then(response => response.photographers)
            .catch(error => console.log(error))
    }
}

class GetPhotographers extends Api {

    constructor(url) {
        super(url)
    }

    async getPhotograph() {
        return await this.getData()
    }
}