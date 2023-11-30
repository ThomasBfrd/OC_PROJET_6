function photographerTemplate(data) {
    const { name, id, portrait, city, country, tagline, price } = data;

    const picture = `../../assets/photographers/Photographers_ID_Photos/${portrait}`;

    function getUserCardDOM() {
      const article = document.createElement("article");

      const userRedirect = document.createElement("a");
      userRedirect.addEventListener("click", () => {
          redirectParams(id);
      })

      const userNameRedirect = document.createElement("a");
      userRedirect.addEventListener("click", () => {
          redirectParams(id);
      })

      const img = document.createElement("img");
      img.setAttribute("src", picture);
      img.setAttribute("alt", name);
      img.classList.add("imgUser");

      const divTxt = document.createElement("div");
      divTxt.classList.add("textContent");

      const h2 = document.createElement("h2");
      h2.textContent = name;

      const cityTxt = document.createElement("p");
      cityTxt.classList.add("city");
      cityTxt.textContent = `${city}, ${country}`;

      const taglineTxt = document.createElement("p");
      taglineTxt.classList.add("tagline");
      taglineTxt.textContent = tagline;

      const priceTxt = document.createElement("p");
      priceTxt.classList.add("price");
      priceTxt.textContent = `${price}€/jour`;

      userRedirect.appendChild(img);
      article.appendChild(userRedirect)
      userNameRedirect.appendChild(h2);
      divTxt.appendChild(userNameRedirect);
      divTxt.appendChild(cityTxt);
      divTxt.appendChild(taglineTxt);
      divTxt.appendChild(priceTxt);
      article.appendChild(divTxt)

      return article;
    }
    return { name, picture, city, tagline, price, getUserCardDOM };
}

const redirectParams = (id) => {
    const query = new URLSearchParams();
    query.append("id", `${id}`)
    const params = query.toString();
    location.href = "../../photographer.html?" + params
}