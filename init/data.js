const products = [
  {
    title: "Mobile",
    description: "Wireless headphones with noise cancellation and superior sound quality.",
    sellingPrice: 149.99,
    mrpPrice: 569.99,
    categories: ["Mobile"],
    brand: "BrandZ",
    stock: 75,
    images: ["https://m.media-amazon.com/images/I/5155PFA2N+L._AC_UY327_FMwebp_QL65_.jpg", "path/to/headphones2.jpg"],
    reviews: [],
    rating: 4.7,
    specifications: {
      batteryLife: {
        playbackTime: "Up to 80 hours with fast charging (10 min charge for 10 hours of playback)",
        standbyTime: "Up to 300 hours",
        chargingTime: "Approximately 2 hours"
      },
      weight: {
        weight: "Less than 250g",
        dimensions: "55 x 40 x 20 mm"
      },
      color: {
        primaryColor: "Black",
        accentColor: "Orange",
        otherColors: ["Red", "Blue", "White"]
      },
      connectorType: {
        type: "USB",
        version: "USB 3.0",
        chargingSpeed: "Fast charging supported"
      },
      brand: {
        name: "Taoxiwave",
        modelNumber: "TW-001",
        warranty: "1 year limited warranty"
      },
      batteryCapacity: {
        capacity: "20000 Milliamp Hours",
        batteryType: "Lithium-ion",
        voltage: "3.7V"
      },
      specialFeature: {
        feature: "Camping gear, Travel, Flashlight",
        flashlightBrightness: "Up to 100 lumens",
        flashlightRange: "Up to 50 meters"
      },
      audio: {
        driverSize: "40mm",
        frequencyResponse: "20Hz - 20kHz",
        impedance: "32 ohms",
        sensitivity: "100 dB"
      },
      microphone: {
        type: "Omnidirectional",
        frequencyResponse: "100Hz - 10kHz",
        sensitivity: "-42 dB"
      },
      durability: {
        waterResistance: "IPX7",
        dustResistance: "IP6X",
        dropTest: "Up to 1.5 meters"
      }
    },
    tags: ["headphones", "electronics", "audio"],
    additionalImages: ["path/to/additionalHeadphonesImage1.jpg"],
    slug: "bluetooth-headphones"
  },
  {
    title: "Mobile",
    description: "A high-end smartphone with a stunning display and powerful processor.",
    sellingPrice: 149.99,
    mrpPrice: 199.99,
    categories: ["Electronics", "Mobile"],
    brand: "BrandX",
    stock: 50,
    images: ["https://m.media-amazon.com/images/I/5155PFA2N+L._AC_UY327_FMwebp_QL65_.jpg", "path/to/smartphone2.jpg"],
    reviews: [],
    rating: 4.5,
    specifications: { screenSize: "6.5 inches", battery: "4000mAh", processor: "Octa-core" },
    tags: ["smartphone", "electronics", "mobile"],
    additionalImages: ["path/to/additionalSmartphoneImage1.jpg"],
    slug: "smartphone-xyz"
  },
  {
    title: "Running Shoes ABC",
    description: "Comfortable and durable running shoes for all terrains.",
    sellingPrice: 149.99,
    mrpPrice: 199.99,
    categories: ["Fashion", "Mobile"],
    brand: "BrandY",
    stock: 100,
    images: ["https://m.media-amazon.com/images/I/5155PFA2N+L._AC_UY327_FMwebp_QL65_.jpg", "path/to/shoes2.jpg"],
    reviews: [],
    rating: 4.0,
    specifications: { size: "10", color: "Red", material: "Synthetic" },
    tags: ["shoes", "fashion", "sports"],
    additionalImages: ["path/to/additionalShoesImage1.jpg"],
    slug: "running-shoes-abc"
  },
  {
    title: "Laptop DEF",
    description: "A powerful laptop with a sleek design, perfect for both work and play.",
    sellingPrice: 149.99,
    mrpPrice: 199.99,
    categories: ["Electronics", "Mobile"],
    brand: "BrandA",
    stock: 30,
    images: ["https://m.media-amazon.com/images/I/5155PFA2N+L._AC_UY327_FMwebp_QL65_.jpg", "path/to/laptop2.jpg"],
    reviews: [],
    rating: 4.8,
    specifications: { processor: "Intel i7", RAM: "16GB", storage: "512GB SSD" },
    tags: ["laptop", "electronics", "computer"],
    additionalImages: ["path/to/additionalLaptopImage1.jpg"],
    slug: "laptop-def"
  },
  {
    title: "Smartwatch GHI",
    description: "A stylish smartwatch with multiple health tracking features.",
    sellingPrice: 149.99,
    mrpPrice: 199.99,
    categories: ["Electronics", "Mobile"],
    brand: "BrandB",
    stock: 80,
    images: ["https://m.media-amazon.com/images/I/5155PFA2N+L._AC_UY327_FMwebp_QL65_.jpg", "path/to/smartwatch2.jpg"],
    reviews: [],
    rating: 4.3,
    specifications: { screenSize: "1.5 inches", batteryLife: "48 hours", waterResistance: "50 meters" },
    tags: ["smartwatch", "electronics", "wearables"],
    additionalImages: ["path/to/additionalSmartwatchImage1.jpg"],
    slug: "smartwatch-ghi"
  }
  ];
  
  module.exports = { products };
  