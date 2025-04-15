class Offer {
    constructor(
        id,
        businessName,
        description,
        incentive,
        category,
        level,
        creatorId = null // ID del creador asignado (si lo hay)
    ) {
        this.id = id;
        this.businessName = businessName;
        this.description = description;
        this.incentive = incentive;
        this.category = category;
        this.level = level; // Nivel requerido para la oferta (Principiante, Intermedio, Avanzado)
        this.creatorId = creatorId; // ID del creador asignado a la oferta
        this.acceptedDate = null; // Fecha en que el negocio aceptó la propuesta del creador
    }
}

export default Offer;