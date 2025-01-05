
export const findIconByKeyword = (phrase) => {
    if (!phrase) return "mdi-help-circle";

    // Split the phrase into individual words, normalize them
    const words = phrase
        .toLowerCase()
        .split(/[ ,]+/) // Split by space, comma, or both
        .filter(Boolean); // Remove empty strings

    // Check each word for a matching icon
    for (const word of words) {
        if (categoryIcons[word]) {
            return categoryIcons[word];
        }
    }

    // Default icon if no matches are found
    return "mdi-help-circle";
};


const categoryIcons = {
    software: "mdi-laptop",
    groceries: "mdi-cart",
    restaurant: "mdi-silverware-fork-knife",
    bar: "mdi-coffee",
    vehicle: "mdi-car",
    wage: "mdi-cash",
    rent: "mdi-home-city",
    cinema: "mdi-filmstrip",
    misc: "mdi-dots-horizontal",
    delivery: "mdi-truck-delivery",
    home: "mdi-home",
    gifts: "mdi-gift",
    meds: "mdi-pill",
    wellness: "mdi-spa",
    fuel: "mdi-fuel",
    clothes: "mdi-tshirt-crew",
    electronics: "mdi-cellphone",
    transfer: "mdi-swap-horizontal",
    pets: "mdi-dog",
    others: "mdi-help-circle",
    education: "mdi-school",
    leisure: "mdi-clock-outline",
    shipping: "mdi-email",
    culture: "mdi-theater",
    lottery: "mdi-cards",
    loan: "mdi-bank",
    maintenance: "mdi-wrench",
    taxi: "mdi-taxi",
    father: "mdi-human-male",
    charges: "mdi-currency-usd",
    phone: "mdi-phone",
    shopping: "mdi-cart-outline",
    feed: "mdi-seed",
    filler: "mdi-water",
    housing: "mdi-home-group",
    internet: "mdi-wifi",
    entertainment: "mdi-controller-classic",
    charity: "mdi-charity",
    healthcare: "mdi-hospital",
    travel: "mdi-airplane",
    holiday: "mdi-beach",
    events: "mdi-party-popper",
    transportation: "mdi-bus",
    utilities: "mdi-lightning-bolt",
    food: "mdi-food",
    jewels: "mdi-diamond-stone",
    cooking: "mdi-pot",
    scooters: "mdi-scooter",
    fitness: "mdi-run",
    finances: "mdi-cash-minus",
    hobbies: "mdi-puzzle",
    parking: "mdi-parking",
    communication: "mdi-laptop",
    repairs: "mdi-hammer-wrench",
    fines: "mdi-alert-circle",
    beauty: "mdi-heart-pulse",
    stationery: "mdi-pencil",
    dentist: "mdi-tooth",
    gym: "mdi-dumbbell",
    interests: "mdi-percent",
    coffee: "mdi-coffee",
    income: "mdi-arrow-up-bold",
    insurance: "mdi-shield-car",
    public: "mdi-bus",
    sale: "mdi-tag",
    life: "mdi-ticket",
    walking: "mdi-walk",
    missing: "mdi-help-box",
    force: "mdi-weather-lightning",
    mortgage: "mdi-bank",
    services: "mdi-tools",
    taxes: "mdi-currency-usd",
    debts: "mdi-currency-usd-off",
    advisory: "mdi-account-tie",
    dues: "mdi-cash",
    pharmacy: "mdi-pill",
    banks: "mdi-bank",
    postal: "mdi-email",
    books: "mdi-book",
    lending: "mdi-handshake",
    job: "mdi-briefcase",
    nonsense: "mdi-emoticon-poop",
};