class PhotographerCard {
  constructor(data) {
    this._data = new Photographer(data);
  }

  createPhotographerCard() {
    const $article = document.createElement("article");

    const photographersCard = `
        <a href="/photographer.html?id=${this._data._id}">
            <div class="imgUser">
            <img src="${this._data.portrait}" alt="" class="portrait_${this._data._id}">
            </div>
            <h2 class="name">${this._data.name}</h2>
        </a>
        <div class="textContent">
            <p class="city">${this._data.city}, ${this._data.country}</p>
            <p class="tagline">${this._data.tagline}</p>
            <p class="price">${this._data.price}€/jour</p>
        </div>
       `;

    $article.innerHTML = photographersCard;
    return $article;
  }
}
