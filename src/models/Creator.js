class Creator {
    constructor(
        fullName,
        email,
        password,
        country,
        city,
        instagram,
        tiktok,
        interests,
        level = 'Principiante' // Nivel por defecto
    ) {
        this.fullName = fullName;
        this.email = email;
        this.password = password;
        this.country = country;
        this.city = city;
        this.instagram = instagram;
        this.tiktok = tiktok;
        this.interests = interests;
        this.level = level; // Principiante, Intermedio, Avanzado
        this.campaignsCompleted = 0;
        this.reviews = 'N/A';
    }
}

export default Creator;