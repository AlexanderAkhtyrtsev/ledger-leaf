export const findIconByKeyword = (phrase) => {
    if (!phrase) return "mdi-help-circle";

    const normalizedPhrase = phrase.toLowerCase();

    for (const [icon, keywords] of Object.entries(categoryIcons)) {
        const keywordList = keywords.split(", ");
        if (keywordList.some(keyword => normalizedPhrase.includes(keyword))) {
            return icon;
        }
    }

    return "mdi-help-circle";
};

export const categoryIcons = {
    "mdi-laptop": "software, tech, app, games, communication",
    "mdi-cart": "groceries, shopping, food",
    "mdi-silverware-fork-knife": "restaurant, dining, meals",
    "mdi-coffee": "bar, cafe, coffee",
    "mdi-car": "vehicle, transportation, rideshare",
    "mdi-cash": "wage, income, salary, dues",
    "mdi-home-city": "rent, housing, mortgage",
    "mdi-filmstrip": "cinema, movies, entertainment",
    "mdi-dots-horizontal": "misc, others, filler",
    "mdi-truck-delivery": "delivery, shipping, postal",
    "mdi-home": "home, garden, maintenance",
    "mdi-gift": "gifts, donations, charity",
    "mdi-pill": "meds, pharmacy, healthcare",
    "mdi-spa": "wellness, beauty, yoga",
    "mdi-fuel": "fuel, gas, vehicle maintenance",
    "mdi-tshirt-crew": "clothes, apparel, shoes",
    "mdi-cellphone": "electronics, accessories, gadgets",
    "mdi-swap-horizontal": "transfer, transactions",
    "mdi-dog": "pets, animals, pet care",
    "mdi-help-circle": "others, missing, nonsense",
    "mdi-school": "education, development, learning",
    "mdi-clock-outline": "leisure, free time, celebrations",
    "mdi-email": "shipping, postal, communication",
    "mdi-theater": "culture, events, performances",
    "mdi-cards": "lottery, gambling, games",
    "mdi-bank": "loan, bank, mortgage, savings",
    "mdi-wrench": "maintenance, repairs, tools",
    "mdi-taxi": "taxi, rideshare, transportation",
    "mdi-human-male": "father, family, childcare",
    "mdi-currency-usd": "charges, fees, taxes, fines",
    "mdi-phone": "phone, mobile, communication",
    "mdi-cart-outline": "shopping, groceries, retail",
    "mdi-seed": "feed, agriculture, gardening",
    "mdi-water": "filler, water, hydration",
    "mdi-home-group": "housing, living, real estate",
    "mdi-wifi": "internet, connectivity",
    "mdi-controller-classic": "entertainment, gaming, leisure",
    "mdi-charity": "charity, donations, gifts",
    "mdi-hospital": "healthcare, doctor, wellness",
    "mdi-airplane": "travel, airtravel, vacation",
    "mdi-beach": "holiday, trips, relaxation",
    "mdi-party-popper": "events, celebrations, parties",
    "mdi-bus": "transportation, public transport",
    "mdi-lightning-bolt": "utilities, electricity, energy",
    "mdi-food": "food, drinks, meals",
    "mdi-diamond-stone": "jewels, luxury, accessories",
    "mdi-pot": "cooking, kitchen, recipes",
    "mdi-scooter": "scooters, rideshare, transportation",
    "mdi-run": "fitness, active sport, wellness",
    "mdi-cash-minus": "finances, expenses, budgeting",
    "mdi-puzzle": "hobbies, crafts, DIY",
    "mdi-parking": "parking, vehicle, transportation",
    "mdi-hammer-wrench": "repairs, tools, maintenance",
    "mdi-alert-circle": "fines, penalties, warnings",
    "mdi-heart-pulse": "beauty, health, fitness",
    "mdi-pencil": "stationery, tools, writing",
    "mdi-tooth": "dentist, healthcare, wellness",
    "mdi-dumbbell": "gym, fitness, exercise",
    "mdi-percent": "interests, dividends, savings",
    "mdi-arrow-up-bold": "income, revenue, earnings",
    "mdi-shield-car": "insurance, vehicle, protection",
    "mdi-tag": "sale, discounts, retail",
    "mdi-walk": "walking, leisure, exercise",
    "mdi-help-box": "missing, nonsense, unknown",
    "mdi-weather-lightning": "force, emergencies, unforeseen",
    "mdi-tools": "services, tools, repairs",
    "mdi-hand-heart": "donations, charity, kindness",
    "mdi-chart-line": "investments, finances, growth",
    "mdi-book": "books, education, learning",
    "mdi-piggy-bank": "savings, finances, budgeting",
};
