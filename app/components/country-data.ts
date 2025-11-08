export const COUNTRIES: Record<string, {
  population: number;
  landArea: number;
  co2Emissions: number;
  gdp: number;
  gdpPerCapita: number;
  literacyRate: number;
  travel: {
    avgFlightCost: number;
    flightDuration: string;
    bestTimeToVisit: string;
    hotelCosts: {
      budget: number;
      midRange: number;
      luxury: number;
    };
    dailyBudget: {
      meals: number;
      transport: number;
      activities: number;
    };
  };
  music: {
    genres: string[];
    famousArtists: Array<{ name: string; genre: string }>;
    traditionalInstruments: string[];
  };
  jobMarket: {
    unemployment: number;
    avgSalary: number;
    topIndustries: Array<{ name: string; growth: number }>;
    inDemandSkills: string[];
    avgWorkHours: number;
    vacationDays: number;
    workLifeBalance: number;
  };
  olympics: {
    gold: number;
    silver: number;
    bronze: number;
    topSports: Array<{ sport: string; medals: number }>;
    recentGames: Array<{ year: number; location: string; goldMedals: number; silverMedals: number; bronzeMedals: number }>;
  };
  places: {
    topAttractions: Array<{ name: string; rating: number; description: string }>;
    mustTryFoods: string[];
    hiddenGems: string[];
  };
}> = {
  "United States": {
    population: 331900000,
    landArea: 9833520,
    co2Emissions: 5000,
    gdp: 25500,
    gdpPerCapita: 76770,
    literacyRate: 99,
    travel: {
      avgFlightCost: 0,
      flightDuration: "Domestic",
      bestTimeToVisit: "May-September",
      hotelCosts: { budget: 80, midRange: 150, luxury: 350 },
      dailyBudget: { meals: 60, transport: 30, activities: 50 }
    },
    music: {
      genres: ["Rock", "Hip-Hop", "Country", "Jazz", "Pop"],
      famousArtists: [
        { name: "Taylor Swift", genre: "Pop" },
        { name: "Kendrick Lamar", genre: "Hip-Hop" },
        { name: "Bruce Springsteen", genre: "Rock" }
      ],
      traditionalInstruments: ["Banjo", "Electric Guitar", "Harmonica", "Steel Guitar"]
    },
    jobMarket: {
      unemployment: 3.7,
      avgSalary: 75,
      topIndustries: [
        { name: "Technology", growth: 8.5 },
        { name: "Healthcare", growth: 6.2 },
        { name: "Finance", growth: 4.8 }
      ],
      inDemandSkills: ["AI/ML", "Cloud Computing", "Data Analysis", "Cybersecurity"],
      avgWorkHours: 40,
      vacationDays: 15,
      workLifeBalance: 6.5
    },
    olympics: {
      gold: 1061,
      silver: 836,
      bronze: 739,
      topSports: [
        { sport: "Swimming", medals: 553 },
        { sport: "Track & Field", medals: 342 },
        { sport: "Basketball", medals: 16 }
      ],
      recentGames: [
        { year: 2024, location: "Paris", goldMedals: 40, silverMedals: 44, bronzeMedals: 42 },
        { year: 2020, location: "Tokyo", goldMedals: 39, silverMedals: 41, bronzeMedals: 33 },
        { year: 2016, location: "Rio", goldMedals: 46, silverMedals: 37, bronzeMedals: 38 }
      ]
    },
    places: {
      topAttractions: [
        { name: "Grand Canyon", rating: 4.9, description: "Breathtaking natural wonder in Arizona" },
        { name: "Statue of Liberty", rating: 4.7, description: "Iconic symbol of freedom in New York" },
        { name: "Yellowstone", rating: 4.8, description: "First national park with geysers and wildlife" }
      ],
      mustTryFoods: ["BBQ Ribs", "New York Pizza", "Southern Fried Chicken", "Apple Pie"],
      hiddenGems: ["Antelope Canyon", "Savannah Historic District", "Crater Lake"]
    }
  },
  "Japan": {
    population: 125800000,
    landArea: 377975,
    co2Emissions: 1100,
    gdp: 4230,
    gdpPerCapita: 33640,
    literacyRate: 99,
    travel: {
      avgFlightCost: 850,
      flightDuration: "12-14 hours",
      bestTimeToVisit: "March-May, September-November",
      hotelCosts: { budget: 50, midRange: 120, luxury: 400 },
      dailyBudget: { meals: 40, transport: 20, activities: 35 }
    },
    music: {
      genres: ["J-Pop", "Enka", "City Pop", "Rock", "Traditional"],
      famousArtists: [
        { name: "Hikaru Utada", genre: "J-Pop" },
        { name: "Babymetal", genre: "Metal" },
        { name: "YMO", genre: "Electronic" }
      ],
      traditionalInstruments: ["Shamisen", "Koto", "Shakuhachi", "Taiko"]
    },
    jobMarket: {
      unemployment: 2.6,
      avgSalary: 42,
      topIndustries: [
        { name: "Automotive", growth: 5.2 },
        { name: "Electronics", growth: 4.8 },
        { name: "Robotics", growth: 7.5 }
      ],
      inDemandSkills: ["Robotics", "Manufacturing", "AI", "Japanese Language"],
      avgWorkHours: 45,
      vacationDays: 10,
      workLifeBalance: 5.5
    },
    olympics: {
      gold: 169,
      silver: 150,
      bronze: 178,
      topSports: [
        { sport: "Judo", medals: 84 },
        { sport: "Wrestling", medals: 72 },
        { sport: "Gymnastics", medals: 98 }
      ],
      recentGames: [
        { year: 2024, location: "Paris", goldMedals: 20, silverMedals: 12, bronzeMedals: 13 },
        { year: 2020, location: "Tokyo", goldMedals: 27, silverMedals: 14, bronzeMedals: 17 },
        { year: 2016, location: "Rio", goldMedals: 12, silverMedals: 8, bronzeMedals: 21 }
      ]
    },
    places: {
      topAttractions: [
        { name: "Mount Fuji", rating: 4.9, description: "Sacred mountain and iconic landmark" },
        { name: "Fushimi Inari Shrine", rating: 4.8, description: "Thousands of red torii gates in Kyoto" },
        { name: "Tokyo Skytree", rating: 4.7, description: "Tallest structure in Japan" }
      ],
      mustTryFoods: ["Sushi", "Ramen", "Tempura", "Takoyaki", "Matcha Desserts"],
      hiddenGems: ["Naoshima Art Island", "Koyasan Temple Complex", "Kawachi Fuji Gardens"]
    }
  },
  "France": {
    population: 67390000,
    landArea: 643801,
    co2Emissions: 330,
    gdp: 2780,
    gdpPerCapita: 41250,
    literacyRate: 99,
    travel: {
      avgFlightCost: 650,
      flightDuration: "8-10 hours",
      bestTimeToVisit: "April-June, September-October",
      hotelCosts: { budget: 70, midRange: 140, luxury: 450 },
      dailyBudget: { meals: 50, transport: 15, activities: 40 }
    },
    music: {
      genres: ["Chanson", "Electronic", "Pop", "Classical", "Hip-Hop"],
      famousArtists: [
        { name: "Daft Punk", genre: "Electronic" },
        { name: "Édith Piaf", genre: "Chanson" },
        { name: "David Guetta", genre: "EDM" }
      ],
      traditionalInstruments: ["Accordion", "Violin", "Hurdy-Gurdy", "Musette"]
    },
    jobMarket: {
      unemployment: 7.3,
      avgSalary: 45,
      topIndustries: [
        { name: "Luxury Goods", growth: 6.8 },
        { name: "Aerospace", growth: 5.5 },
        { name: "Tourism", growth: 4.2 }
      ],
      inDemandSkills: ["French Language", "Engineering", "Fashion Design", "Culinary Arts"],
      avgWorkHours: 35,
      vacationDays: 30,
      workLifeBalance: 8.5
    },
    olympics: {
      gold: 223,
      silver: 251,
      bronze: 278,
      topSports: [
        { sport: "Fencing", medals: 123 },
        { sport: "Cycling", medals: 89 },
        { sport: "Judo", medals: 57 }
      ],
      recentGames: [
        { year: 2024, location: "Paris", goldMedals: 16, silverMedals: 26, bronzeMedals: 22 },
        { year: 2020, location: "Tokyo", goldMedals: 10, silverMedals: 12, bronzeMedals: 11 },
        { year: 2016, location: "Rio", goldMedals: 10, silverMedals: 18, bronzeMedals: 14 }
      ]
    },
    places: {
      topAttractions: [
        { name: "Eiffel Tower", rating: 4.6, description: "Iconic iron lattice tower in Paris" },
        { name: "Louvre Museum", rating: 4.7, description: "World's largest art museum" },
        { name: "Mont Saint-Michel", rating: 4.8, description: "Medieval abbey on tidal island" }
      ],
      mustTryFoods: ["Croissant", "Coq au Vin", "Escargot", "Crème Brûlée", "Baguette"],
      hiddenGems: ["Colmar Village", "Gorges du Verdon", "Annecy Old Town"]
    }
  },
  "Germany": {
    population: 83240000,
    landArea: 357022,
    co2Emissions: 675,
    gdp: 4080,
    gdpPerCapita: 49070,
    literacyRate: 99,
    travel: {
      avgFlightCost: 600,
      flightDuration: "8-9 hours",
      bestTimeToVisit: "May-September",
      hotelCosts: { budget: 60, midRange: 110, luxury: 300 },
      dailyBudget: { meals: 45, transport: 20, activities: 35 }
    },
    music: {
      genres: ["Classical", "Electronic", "Rock", "Schlager", "Techno"],
      famousArtists: [
        { name: "Kraftwerk", genre: "Electronic" },
        { name: "Beethoven", genre: "Classical" },
        { name: "Rammstein", genre: "Industrial Metal" }
      ],
      traditionalInstruments: ["Accordion", "Zither", "Alphorn", "Lute"]
    },
    jobMarket: {
      unemployment: 3.0,
      avgSalary: 55,
      topIndustries: [
        { name: "Automotive", growth: 6.5 },
        { name: "Engineering", growth: 7.2 },
        { name: "Renewable Energy", growth: 9.1 }
      ],
      inDemandSkills: ["German Language", "Engineering", "Manufacturing", "Green Technology"],
      avgWorkHours: 35,
      vacationDays: 28,
      workLifeBalance: 8.0
    },
    olympics: {
      gold: 293,
      silver: 293,
      bronze: 310,
      topSports: [
        { sport: "Equestrian", medals: 88 },
        { sport: "Canoe/Kayak", medals: 72 },
        { sport: "Rowing", medals: 89 }
      ],
      recentGames: [
        { year: 2024, location: "Paris", goldMedals: 12, silverMedals: 13, bronzeMedals: 8 },
        { year: 2020, location: "Tokyo", goldMedals: 10, silverMedals: 11, bronzeMedals: 16 },
        { year: 2016, location: "Rio", goldMedals: 17, silverMedals: 10, bronzeMedals: 15 }
      ]
    },
    places: {
      topAttractions: [
        { name: "Neuschwanstein Castle", rating: 4.7, description: "Fairytale castle in Bavaria" },
        { name: "Brandenburg Gate", rating: 4.6, description: "Historic monument in Berlin" },
        { name: "Black Forest", rating: 4.8, description: "Dense forest region famous for cuckoo clocks" }
      ],
      mustTryFoods: ["Bratwurst", "Sauerkraut", "Pretzels", "Schnitzel", "Black Forest Cake"],
      hiddenGems: ["Rothenburg ob der Tauber", "Saxon Switzerland", "Bamberg Old Town"]
    }
  },
  "Brazil": {
    population: 214300000,
    landArea: 8515767,
    co2Emissions: 450,
    gdp: 1920,
    gdpPerCapita: 8960,
    literacyRate: 93,
    travel: {
      avgFlightCost: 750,
      flightDuration: "10-12 hours",
      bestTimeToVisit: "September-March",
      hotelCosts: { budget: 30, midRange: 70, luxury: 200 },
      dailyBudget: { meals: 25, transport: 10, activities: 30 }
    },
    music: {
      genres: ["Samba", "Bossa Nova", "Funk", "Forró", "MPB"],
      famousArtists: [
        { name: "Anitta", genre: "Pop/Funk" },
        { name: "João Gilberto", genre: "Bossa Nova" },
        { name: "Ivete Sangalo", genre: "Axé" }
      ],
      traditionalInstruments: ["Berimbau", "Pandeiro", "Cavaquinho", "Agogô"]
    },
    jobMarket: {
      unemployment: 8.5,
      avgSalary: 18,
      topIndustries: [
        { name: "Agriculture", growth: 5.8 },
        { name: "Mining", growth: 4.5 },
        { name: "Technology", growth: 8.2 }
      ],
      inDemandSkills: ["Portuguese Language", "Agricultural Tech", "Software Development", "Mining Engineering"],
      avgWorkHours: 44,
      vacationDays: 30,
      workLifeBalance: 6.0
    },
    olympics: {
      gold: 37,
      silver: 42,
      bronze: 71,
      topSports: [
        { sport: "Volleyball", medals: 30 },
        { sport: "Sailing", medals: 19 },
        { sport: "Judo", medals: 24 }
      ],
      recentGames: [
        { year: 2024, location: "Paris", goldMedals: 3, silverMedals: 7, bronzeMedals: 10 },
        { year: 2020, location: "Tokyo", goldMedals: 7, silverMedals: 6, bronzeMedals: 8 },
        { year: 2016, location: "Rio", goldMedals: 7, silverMedals: 6, bronzeMedals: 6 }
      ]
    },
    places: {
      topAttractions: [
        { name: "Christ the Redeemer", rating: 4.8, description: "Iconic statue overlooking Rio" },
        { name: "Amazon Rainforest", rating: 4.9, description: "World's largest tropical rainforest" },
        { name: "Iguazu Falls", rating: 4.9, description: "Spectacular waterfall system" }
      ],
      mustTryFoods: ["Feijoada", "Açaí Bowl", "Pão de Queijo", "Brigadeiro", "Churrasco"],
      hiddenGems: ["Lençóis Maranhenses", "Fernando de Noronha", "Chapada Diamantina"]
    }
  },
  "Australia": {
    population: 25690000,
    landArea: 7692024,
    co2Emissions: 415,
    gdp: 1680,
    gdpPerCapita: 65420,
    literacyRate: 99,
    travel: {
      avgFlightCost: 1200,
      flightDuration: "17-20 hours",
      bestTimeToVisit: "September-November, March-May",
      hotelCosts: { budget: 70, midRange: 130, luxury: 350 },
      dailyBudget: { meals: 55, transport: 25, activities: 45 }
    },
    music: {
      genres: ["Rock", "Indie", "Electronic", "Country", "Hip-Hop"],
      famousArtists: [
        { name: "AC/DC", genre: "Rock" },
        { name: "Tame Impala", genre: "Psychedelic Rock" },
        { name: "Sia", genre: "Pop" }
      ],
      traditionalInstruments: ["Didgeridoo", "Clapsticks", "Bullroarer", "Guitar"]
    },
    jobMarket: {
      unemployment: 3.5,
      avgSalary: 65,
      topIndustries: [
        { name: "Mining", growth: 6.2 },
        { name: "Healthcare", growth: 7.5 },
        { name: "Education", growth: 5.8 }
      ],
      inDemandSkills: ["Healthcare", "IT", "Construction", "Engineering"],
      avgWorkHours: 38,
      vacationDays: 20,
      workLifeBalance: 7.5
    },
    olympics: {
      gold: 164,
      silver: 173,
      bronze: 210,
      topSports: [
        { sport: "Swimming", medals: 199 },
        { sport: "Athletics", medals: 74 },
        { sport: "Cycling", medals: 55 }
      ],
      recentGames: [
        { year: 2024, location: "Paris", goldMedals: 18, silverMedals: 19, bronzeMedals: 16 },
        { year: 2020, location: "Tokyo", goldMedals: 17, silverMedals: 7, bronzeMedals: 22 },
        { year: 2016, location: "Rio", goldMedals: 8, silverMedals: 11, bronzeMedals: 10 }
      ]
    },
    places: {
      topAttractions: [
        { name: "Great Barrier Reef", rating: 4.9, description: "World's largest coral reef system" },
        { name: "Sydney Opera House", rating: 4.7, description: "Iconic performing arts center" },
        { name: "Uluru", rating: 4.8, description: "Sacred sandstone monolith" }
      ],
      mustTryFoods: ["Vegemite Toast", "Meat Pie", "Lamington", "Barramundi", "Tim Tams"],
      hiddenGems: ["Whitehaven Beach", "Kakadu National Park", "Kangaroo Island"]
    }
  },
  "Canada": {
    population: 38250000,
    landArea: 9984670,
    co2Emissions: 550,
    gdp: 2140,
    gdpPerCapita: 55990,
    literacyRate: 99,
    travel: {
      avgFlightCost: 350,
      flightDuration: "3-6 hours",
      bestTimeToVisit: "June-September",
      hotelCosts: { budget: 65, midRange: 120, luxury: 300 },
      dailyBudget: { meals: 50, transport: 25, activities: 40 }
    },
    music: {
      genres: ["Rock", "Pop", "Country", "Hip-Hop", "Folk"],
      famousArtists: [
        { name: "Drake", genre: "Hip-Hop" },
        { name: "The Weeknd", genre: "R&B" },
        { name: "Céline Dion", genre: "Pop" }
      ],
      traditionalInstruments: ["Fiddle", "Accordion", "Guitar", "Bagpipes"]
    },
    jobMarket: {
      unemployment: 5.2,
      avgSalary: 58,
      topIndustries: [
        { name: "Natural Resources", growth: 5.5 },
        { name: "Technology", growth: 8.8 },
        { name: "Healthcare", growth: 6.5 }
      ],
      inDemandSkills: ["Software Development", "Healthcare", "Engineering", "Bilingual (English/French)"],
      avgWorkHours: 37,
      vacationDays: 15,
      workLifeBalance: 7.8
    },
    olympics: {
      gold: 73,
      silver: 107,
      bronze: 147,
      topSports: [
        { sport: "Ice Hockey", medals: 28 },
        { sport: "Short Track", medals: 38 },
        { sport: "Freestyle Skiing", medals: 24 }
      ],
      recentGames: [
        { year: 2024, location: "Paris", goldMedals: 9, silverMedals: 7, bronzeMedals: 11 },
        { year: 2020, location: "Tokyo", goldMedals: 7, silverMedals: 6, bronzeMedals: 11 },
        { year: 2016, location: "Rio", goldMedals: 4, silverMedals: 3, bronzeMedals: 15 }
      ]
    },
    places: {
      topAttractions: [
        { name: "Niagara Falls", rating: 4.7, description: "Massive waterfalls on US-Canada border" },
        { name: "Banff National Park", rating: 4.9, description: "Mountain paradise in the Rockies" },
        { name: "CN Tower", rating: 4.6, description: "Iconic Toronto landmark" }
      ],
      mustTryFoods: ["Poutine", "Montreal Bagels", "Butter Tarts", "Nanaimo Bars", "Tourtière"],
      hiddenGems: ["Gros Morne National Park", "Haida Gwaii", "Tofino"]
    }
  },
  "India": {
    population: 1393400000,
    landArea: 3287263,
    co2Emissions: 2650,
    gdp: 3390,
    gdpPerCapita: 2430,
    literacyRate: 74,
    travel: {
      avgFlightCost: 900,
      flightDuration: "14-16 hours",
      bestTimeToVisit: "October-March",
      hotelCosts: { budget: 20, midRange: 50, luxury: 150 },
      dailyBudget: { meals: 15, transport: 8, activities: 20 }
    },
    music: {
      genres: ["Bollywood", "Classical", "Bhangra", "Indie", "Sufi"],
      famousArtists: [
        { name: "A.R. Rahman", genre: "Film Music" },
        { name: "Ravi Shankar", genre: "Classical" },
        { name: "Lata Mangeshkar", genre: "Playback Singing" }
      ],
      traditionalInstruments: ["Sitar", "Tabla", "Harmonium", "Sarod"]
    },
    jobMarket: {
      unemployment: 7.8,
      avgSalary: 12,
      topIndustries: [
        { name: "IT Services", growth: 9.5 },
        { name: "Pharmaceuticals", growth: 7.8 },
        { name: "Textiles", growth: 5.2 }
      ],
      inDemandSkills: ["Software Development", "Data Science", "Digital Marketing", "English"],
      avgWorkHours: 48,
      vacationDays: 12,
      workLifeBalance: 5.0
    },
    olympics: {
      gold: 10,
      silver: 9,
      bronze: 16,
      topSports: [
        { sport: "Field Hockey", medals: 12 },
        { sport: "Wrestling", medals: 7 },
        { sport: "Shooting", medals: 9 }
      ],
      recentGames: [
        { year: 2024, location: "Paris", goldMedals: 0, silverMedals: 0, bronzeMedals: 6 },
        { year: 2020, location: "Tokyo", goldMedals: 1, silverMedals: 2, bronzeMedals: 4 },
        { year: 2016, location: "Rio", goldMedals: 0, silverMedals: 1, bronzeMedals: 1 }
      ]
    },
    places: {
      topAttractions: [
        { name: "Taj Mahal", rating: 4.8, description: "Iconic white marble mausoleum" },
        { name: "Golden Temple", rating: 4.9, description: "Sacred Sikh temple in Amritsar" },
        { name: "Hawa Mahal", rating: 4.6, description: "Palace of Winds in Jaipur" }
      ],
      mustTryFoods: ["Butter Chicken", "Biryani", "Dosa", "Samosa", "Gulab Jamun"],
      hiddenGems: ["Hampi Ruins", "Spiti Valley", "Andaman Islands"]
    }
  }
};
