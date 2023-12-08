class Profile {
    constructor() {
        this.photographerSection = document.querySelector('.photograph_header')
        this.getPhotographers = new GetPhotographers('/data/photographers.json')
    }

    async init() {

        const photographersData = await this.getPhotographers.getPhotograph()
        
        const urlId = new URL(document.location)
        const id = parseInt(urlId.searchParams.get('id'))

        const profile = photographersData.filter(profile => profile.id === id)[0]
        const page = new PhotographerProfile(profile).createPhotographerCard()
        this.photographerSection.appendChild(page);
    }
}

const profile = new Profile()
profile.init()