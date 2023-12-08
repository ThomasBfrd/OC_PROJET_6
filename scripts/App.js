class App {
    constructor() {
        this.photographerSection = document.querySelector('.photographer_section')
        this.getPhotographers = new GetPhotographers('/data/photographers.json')
    }

    async init() {

        const photographersData = await this.getPhotographers.getPhotograph()
        
        photographersData.forEach(photographer => {
                const card = new PhotographerCard(photographer)
                this.photographerSection.appendChild(card.createPhotographerCard())
            })
    }
}

const app = new App()
app.init()