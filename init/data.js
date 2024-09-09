const products = [
  {
    "title": "iPhone 16 Pro Max",
    "description": "The iPhone 16 Pro Max features a 6.9-inch Super Retina XDR display with ProMotion technology, a powerful A18 Pro chip, and an advanced triple-camera system. Capture stunning photos and videos with the 48MP wide camera, and enjoy longer battery life and faster performance. The phone's titanium design with a textured matte glass back provides a premium look and feel.",
    "sellingPrice": 144900,
    "mrpPrice": 184900,
    "categories": ["Mobile", "Electronics"],
    "brand": "Apple",
    "stock": 100,
    "images": [
      "https://res.cloudinary.com/dirg3c2ip/image/upload/v1725910306/new1_itrt2f.png",
     
    ],
    "reviews": [],
    "rating": 5,
    "specifications": {
      "screenSize": "6.9 inches",
      "battery": "4352mAh",
      "processor": "A18 Pro chip",
      "camera": {
        "rearCamera": "48MP + 12MP Ultra Wide + Telephoto",
        "frontCamera": "12MP"
      },
      "operatingSystem": "iOS 18",
      "display": {
        "type": "Super Retina XDR",
        "resolution": "2796 x 1290 pixels",
        "refreshRate": "120Hz"
      },
      "connectivity": {
        "network": "5G",
        "wifi": "Wi-Fi 6E",
        "bluetooth": "Bluetooth 5.3",
        "gps": "GPS/AGPS/GLONASS/GALILEO/BDS"
      },
      "sensors": ["Face ID", "Accelerometer", "Gyroscope", "Proximity", "Compass"],
      "dimensions": {
        "height": "160.7mm",
        "width": "77.6mm",
        "thickness": "7.85mm"
      },
      "weight": "240g",
      "features": ["Dynamic Island", "Face ID", "Fast Charging", "MagSafe"],
      "warranty": "1 year manufacturer warranty"
    },
    "tags": ["smartphone", "Apple", "iPhone", "Pro"],
    "additionalImages": ["https://example.com/iphone16promax-box.jpg"],
    "slug": "iphone-16-pro-max",
    "colors": [
      {
        "color": "Desert Titanium",
        "images": [
          "https://res.cloudinary.com/dirg3c2ip/image/upload/v1725910306/new1_itrt2f.png",
          "https://res.cloudinary.com/dirg3c2ip/image/upload/v1725910306/new2_pc4e4v.png",
          "https://res.cloudinary.com/dirg3c2ip/image/upload/v1725910307/new3_uh8pzi.png",
          "https://res.cloudinary.com/dirg3c2ip/image/upload/v1725910306/new4_ldate1.png"
        ],
        "variants": [
          {

            "ram": "8GB",
            "storage": "256GB",
            "stock": 50,
            "price": 144900
          },
          {
            "ram": "8GB",
            "storage": "512GB",
            "stock": 30,
            "price": 164900
          },
          {
            "ram": "8GB",
            "storage": "1TB",
            "stock": 20,
            "price": 184900
          }
        ]
      },
      {
        "color": "Natural Titanium",
        "images": [
          "https://res.cloudinary.com/dirg3c2ip/image/upload/v1725909781/natural1_cwzes0.png",
          "https://res.cloudinary.com/dirg3c2ip/image/upload/v1725909956/natural2_llnpku.png",
          "https://res.cloudinary.com/dirg3c2ip/image/upload/v1725909957/natural3_mi5nop.png",
          "https://res.cloudinary.com/dirg3c2ip/image/upload/v1725909957/natural4_o5134f.png"
        ],
        "variants": [
          {
            "ram": "8GB",
            "storage": "256GB",
            "stock": 40,
            "price": 144900
          },
          {
            "ram": "8GB",
            "storage": "512GB",
            "stock": 20,
            "price": 164900
          },
          {
            "ram": "8GB",
            "storage": "1TB",
            "stock": 15,
            "price": 184900
          }
        ]
      },
      {
        "color": "White Titanium",
        "images": [
          "https://res.cloudinary.com/dirg3c2ip/image/upload/v1725909977/white2_x2h3ab.png",
          "https://res.cloudinary.com/dirg3c2ip/image/upload/v1725909990/white1_i6owrw.png",
          "https://res.cloudinary.com/dirg3c2ip/image/upload/v1725909990/white4_s2wp6k.png",
          "https://res.cloudinary.com/dirg3c2ip/image/upload/v1725909977/white3_q60ncw.png"
        ],
        "variants": [
          {
            "ram": "8GB",
            "storage": "256GB",
            "stock": 60,
            "price": 144900
          },
          {
            "ram": "8GB",
            "storage": "512GB",
            "stock": 25,
            "price": 164900
          },
          {
            "ram": "8GB",
            "storage": "1TB",
            "stock": 15,
            "price": 184900
          }
        ]
      }
    ],
    "discount": 10,
    "featured": true,
    "bestseller": true,
    "active": true,
    "metadata": {
      "isLimitedEdition": false,
      "releaseDate": "2024-09-20"
    },
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  
  {
    title: "Oppo F19 Pro",
    description: "Oppo F19 Pro is a revolutionary smartphone that combines style and function. Its sleek, compact design unfolds to reveal a stunning, immersive display. Capture unforgettable moments with its advanced camera system, while enjoying lightning-fast performance and seamless multitasking. Experience the future of smartphones with the Z Flip 3's durable build, water resistance, and long-lasting battery. Whether you're on the go or relaxing, this device offers a truly unique user experience.",
    sellingPrice: 17599,
    mrpPrice:  20000,
    categories: ["Mobile"],
    brand: "BrandZ",
    stock: 75, // General stock (could be used as a fallback or sum of all variants)
    images: ["https://m.media-amazon.com/images/I/616wnQmPQ-L._SX569_.jpg", "https://m.media-amazon.com/images/I/611DUOU0OML._SX569_.jpg","https://m.media-amazon.com/images/I/51kSMKsOB3L._SX569_.jpg","https://m.media-amazon.com/images/I/51Fiehk-xlL._SX569_.jpg","https://m.media-amazon.com/images/I/51g0A4NMD8L._SX569_.jpg"],
    reviews: [],
    rating: 1,
    specifications: {
      screenSize: "6.5 inches",
      battery: "4000mAh",
      processor: "Octa-core",
      camera: {
        rearCamera: "64MP + 8MP + 2MP",
        frontCamera: "16MP"
      },
      operatingSystem: "Android 11",
      display: {
        type: "AMOLED",
        resolution: "1080 x 2400 pixels",
        refreshRate: "90Hz"
      },
      connectivity: {
        network: "5G",
        wifi: "Wi-Fi 802.11 a/b/g/n/ac",
        bluetooth: "Bluetooth 5.1",
        gps: "GPS/AGPS/GLONASS/GALILEO/BDS/QZSS"
      },
      sensors: ["Fingerprint (under display)", "Accelerometer", "Gyroscope", "Proximity", "Compass"],
      dimensions: {
        height: "164.4mm",
        width: "76.3mm",
        thickness: "8.4mm"
      },
      weight: "185g",
      features: ["Face Unlock", "Fast Charging", "Reverse Charging"],
      warranty: "1 year manufacturer warranty"
    },
    tags: ["smartphone", "electronics", "mobile"],
    additionalImages: ["path/to/additionalImage1.jpg"],
    slug: "oppo-f19-pro",
    colors: [
      {
        color: "Midnight Black",
        images: ["https://m.media-amazon.com/images/I/616wnQmPQ-L._SX569_.jpg", "https://m.media-amazon.com/images/I/611DUOU0OML._SX569_.jpg","https://m.media-amazon.com/images/I/51kSMKsOB3L._SX569_.jpg","https://m.media-amazon.com/images/I/51Fiehk-xlL._SX569_.jpg","https://m.media-amazon.com/images/I/51g0A4NMD8L._SX569_.jpg"],
        variants: [
          {
            ram: "6GB",
            storage: "128GB",
            stock: 30,
            price: 17999
          },
          {
            ram: "6GB",
            storage: "256GB",
            stock: 30,
            price: 18599
          },
          {
            ram: "8GB",
            storage: "128GB",
            stock: 30,
            price: 18999
          },
          {
            ram: "8GB",
            storage: "256GB",
            stock: 15,
            price: 19999
          }
        ]
      },
      {
        color: "Aurora Blue",
        images: ["https://m.media-amazon.com/images/I/611DUOU0OML._SX569_.jpg"],
        variants: [
          {
            ram: "6GB",
            storage: "128GB",
            stock: 20,
            price: 17999
          },
          {
            ram: "8GB",
            storage: "256GB",
            stock: 10,
            price: 19999
          }
        ]
      },
      {
        color: "Sunset Dazzle",
        images: ["https://m.media-amazon.com/images/I/616wnQmPQ-L._SX569_.jpg", "https://m.media-amazon.com/images/I/611DUOU0OML._SX569_.jpg","https://m.media-amazon.com/images/I/51kSMKsOB3L._SX569_.jpg","https://m.media-amazon.com/images/I/51Fiehk-xlL._SX569_.jpg","https://m.media-amazon.com/images/I/51g0A4NMD8L._SX569_.jpg"],
        variants: [
          {
            ram: "6GB",
            storage: "128GB",
            stock: 10,
            price: 17999
          },
          {
            ram: "8GB",
            storage: "256GB",
            stock: 5,
            price: 19999
          }
        ]
      }
    ],
    discount: 10, // 10% discount
    featured: true,
    bestseller: false,
    active: true,
    metadata: {
      isLimitedEdition: false,
      releaseDate: "2023-07-01"
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  
  {
    title: "Vivo X70 Pro",
    description: "A powerful laptop with a sleek design, perfect for both work and play.",
    sellingPrice: 46990,
   mrpPrice: 51990,
    categories: ["Electronics", "Mobile"],
    brand: "BrandA",
    stock: 30,
    images: ["https://rukminim2.flixcart.com/image/416/416/ku4ezrk0/mobile/u/z/i/x70-pro-v2105-vivo-original-imag7bq4eumqhgka.jpeg?q=70&crop=false", "https://rukminim2.flixcart.com/image/832/832/ku4ezrk0/mobile/j/s/b/x70-pro-v2105-vivo-original-imag7bq42mqhfzsh.jpeg?q=70&crop=false","https://rukminim2.flixcart.com/image/832/832/ku4ezrk0/mobile/4/0/u/x70-pro-v2105-vivo-original-imag7bq4ggh5dkuj.jpeg?q=70&crop=false","https://rukminim2.flixcart.com/image/832/832/ku4ezrk0/mobile/z/f/k/x70-pro-v2105-vivo-original-imag7bq4yauabq9y.jpeg?q=70&crop=false"],
    reviews: [],
    rating: 4.8,
    specifications: {
      screenSize: "15.6 inches",
      processor: "Intel Core i7",
      ram: "16GB DDR4",
      storage: "512GB SSD",
      graphics: "NVIDIA GeForce RTX 3060",
      operatingSystem: "Windows 11",
      batteryLife: "Up to 8 hours",
      connectivity: {
      wifi: "Wi-Fi 6",
      bluetooth: "Bluetooth 5.0",
      ports: ["USB-C", "USB-A", "HDMI", "Audio Jack"]
      },
      dimensions: {
      height: "0.7 inches",
      width: "14.1 inches",
      depth: "9.7 inches"
      },
      weight: "4.19 lbs",
      color: "Space Gray",
      warranty: "1 year limited warranty"
    },
    tags: ["laptop", "electronics", "computer"],
    additionalImages: ["path/to/additionalLaptopImage1.jpg"],
    slug: "laptop-def"
  },
  {
    title: "Samsung Z flip 3",
    description: "The Samsung Galaxy Z Flip 3 is a revolutionary smartphone that combines style and function. Its sleek, compact design unfolds to reveal a stunning, immersive display. Capture unforgettable moments with its advanced camera system, while enjoying lightning-fast performance and seamless multitasking. Experience the future of smartphones with the Z Flip 3's durable build, water resistance, and long-lasting battery. Whether you're on the go or relaxing, this device offers a truly unique user experience.",
    sellingPrice: 95999,
    mrpPrice: 39999.99,
    categories: ["Electronics", "Mobile"],
    brand: "BrandB",
    stock: 80,
    images: ["https://m.media-amazon.com/images/I/41xi2LXCRPL._SX300_SY300_QL70_FMwebp_.jpg", "path/to/smartwatch2.jpg"],
    reviews: [],
    rating: 4.3,
    specifications: {
      display: {
        type: "AMOLED",
        size: "1.4 inches",
        resolution: "450 x 450 pixels"
      },
      batteryLife: "Up to 7 days",
      waterResistance: "5 ATM",
      sensors: ["Heart Rate Monitor", "Blood Oxygen Monitor", "Accelerometer", "Gyroscope", "Barometer"],
      connectivity: {
        bluetooth: "Bluetooth 5.0",
        wifi: "Wi-Fi 802.11 b/g/n"
      },
      compatibility: "Android 6.0+ and iOS 12.0+",
      dimensions: {
        height: "44.4mm",
        width: "44.4mm",
        thickness: "10.9mm"
      },
      weight: "52g",
      colors: ["Black", "Silver", "Green"],
      warranty: "1 year limited warranty"
    },
    tags: ["smartwatch", "electronics", "wearables"],
    additionalImages: ["path/to/additionalSmartwatchImage1.jpg"],
    slug: "smartwatch-ghi"
  },
  {
    title: "iPhone 14 Pro Max",
    description: "Wireless headphones with noise cancellation and superior sound quality.",
    sellingPrice: 149999,
    mrpPrice: 119999,
    categories: ["Mobile"],
    brand: "BrandZ",
    stock: 75,
    images: ["https://m.media-amazon.com/images/I/41lQuD3zXhL._SY445_SX342_QL70_FMwebp_.jpg", "path/to/headphones2.jpg"],
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
    title: "Samsung Galaxy S22 Ultra",
    description: "Wireless headphones with noise cancellation and superior sound quality.",
    sellingPrice: 129999,
    mrpPrice: 84499.99,
    categories: ["Mobile"],
    brand: "BrandX",
    stock: 50,
    images: ["https://m.media-amazon.com/images/I/41fCDR6pjpL._SX300_SY300_QL70_FMwebp_.jpg", "path/to/headphones2.jpg"],
    reviews: [],
    rating: 4.5,
    specifications: {
      batteryLife: {
        playbackTime: "Up to 60 hours with fast charging (10 min charge for 6 hours of playback)",
        standbyTime: "Up to 200 hours",
        chargingTime: "Approximately 1.5 hours"
      },
      weight: {
        weight: "Less than 220g",
        dimensions: "50 x 35 x 18 mm"
      },
      color: {
        primaryColor: "White",
        accentColor: "Silver",
        otherColors: ["Black", "Red", "Blue"]
      },
      connectorType: {
        type: "USB",
        version: "USB 2.0",
        chargingSpeed: "Fast charging supported"
      },
      brand: {
        name: "Taoxiwave",
        modelNumber: "TW-002",
        warranty: "1 year limited warranty"
      },
      batteryCapacity: {
        capacity: "15000 Milliamp Hours",
        batteryType: "Lithium-ion",
        voltage: "3.7V"
      },
      specialFeature: {
        feature: "Travel, Flashlight",
        flashlightBrightness: "Up to 80 lumens",
        flashlightRange: "Up to 30 meters"
      },
      audio: {
        driverSize: "35mm",
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
        waterResistance: "IPX6",
        dustResistance: "IP6X",
        dropTest: "Up to 1.2 meters"
      }
    },
    tags: ["headphones", "electronics", "audio"],
    additionalImages: ["path/to/additionalHeadphonesImage2.jpg"],
    slug: "bluetooth-headphones"
  },
  {
    title: "Google Pixel 7 Pro",
    description: "Wireless headphones with noise cancellation and superior sound quality.",
    sellingPrice: 84999,
    mrpPrice: 45999,
    categories: ["Mobile"],
    brand: "BrandY",
    stock: 60,
    images: ["https://m.media-amazon.com/images/I/41xbF3ik4rL._SX300_SY300_QL70_FMwebp_.jpg", "path/to/headphones2.jpg"],
    reviews: [],
    rating: 4.6,
    specifications: {
      batteryLife: {
        playbackTime: "Up to 70 hours with fast charging (10 min charge for 8 hours of playback)",
        standbyTime: "Up to 250 hours",
        chargingTime: "Approximatively 2.5 hours"
      },
      weight: {
        weight: "Less than 230g",
        dimensions: "52 x 38 x 19 mm"
      },
      color: {
        primaryColor: "Gray",
        accentColor: "Silver",
        otherColors: ["Black", "Green", "Blue"]
      },
      connectorType: {
        type: "USB",
        version: "USB 3.1",
        chargingSpeed: "Fast charging supported"
      },
      brand: {
        name: "Taoxiwave",
        modelNumber: "TW-003",
        warranty: "1 year limited warranty"
      },
      batteryCapacity: {
        capacity: "22000 Milliamp Hours",
        batteryType: "Lithium-ion",
        voltage: "3.7V"
      },
      specialFeature: {
        feature: "Camping gear, Travel, Flashlight",
        flashlightBrightness: "Up to 120 lumens",
        flashlightRange: "Up to 60 meters"
      },
      audio: {
        driverSize: "45mm",
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
    additionalImages: ["path/to/additionalHeadphonesImage3.jpg"],
    slug: "bluetooth-headphones"
  },
  {
    title: "OnePlus 10 Pro",
    description: "Wireless headphones with noise cancellation and superior sound quality.",
    sellingPrice: 71999,
    mrpPrice: 44599,
    categories: ["Mobile"],
    brand: "BrandZ",
    stock: 70,
    images: ["https://m.media-amazon.com/images/I/31hcJbP0BuL._SX300_SY300_QL70_FMwebp_.jpg", "path/to/headphones2.jpg"],
    reviews: [],
    rating: 4.8,
    specifications: {
      batteryLife: {
        playbackTime: "Up to 75 hours with fast charging (10 min charge for 9 hours of playback)",
        standbyTime: "Up to 275 hours",
        chargingTime: "Approximately 2 hours"
      },
      weight: {
        weight: "Less than 240g",
        dimensions: "54 x 39 x 21 mm"
      },
      color: {
        primaryColor: "Black",
        accentColor: "Red",
        otherColors: ["Blue", "Green", "White"]
      },
      connectorType: {
        type: "USB",
        version: "USB 3.0",
        chargingSpeed: "Fast charging supported"
      },
      brand: {
        name: "Taoxiwave",
        modelNumber: "TW-004",
        warranty: "1 year limited warranty"
      },
      batteryCapacity: {
        capacity: "18000 Milliamp Hours",
        batteryType: "Lithium-ion",
        voltage: "3.7V"
      },
      specialFeature: {
        feature: "Camping gear, Travel, Flashlight",
        flashlightBrightness: "Up to 90 lumens",
        flashlightRange: "Up to 40 meters"
      },
      audio: {
        driverSize: "42mm",
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
    additionalImages: ["path/to/additionalHeadphonesImage4.jpg"],
    slug: "bluetooth-headphones"
  },
  {
    title: "Acer Aspire 3",
    description: "Laptop with 14-inch Full HD display and up to 12 hours battery life.",
    sellingPrice: 52000,
    mrpPrice: 34999,
    categories: ["Laptops"],
    brand: "Acer",
    stock: 50,
    images: ["https://m.media-amazon.com/images/I/41qGPk4nUML._SX300_SY300_QL70_FMwebp_.jpg", "path/to/laptop2.jpg"],
    reviews: [],
    rating: 4.5,
    specifications: {
      screenSize: "14 inches",
      battery: "Up to 12 hours",
      processor: "10th Gen Intel Core i3",
      memory: {
        ram: "8GB",
        storage: "256GB SSD"
      },
      operatingSystem: "Windows 10 Home",
      display: {
        type: "Full HD",
        resolution: "1920 x 1080 pixels"
      },
      connectivity: {
        network: "Wi-Fi 6",
        bluetooth: "Bluetooth 5.0",
        usb: "2 x USB-A, 1 x USB-C"
      },
      sensors: ["Fingerprint reader"],
      dimensions: {
        height: "0.78 inches",
        width: "12.76 inches",
        thickness: "8.98 inches"
      },
      weight: "3.96 pounds",
      colors: ["Steel Grey", "Obsidian Black"],
      features: ["Backlit keyboard", "Fingerprint reader"],
      warranty: "1 year manufacturer warranty"
    },
    tags: ["laptop", "acer", "aspirer"],
    additionalImages: ["path/to/additionalLaptopImage1.jpg"],
    slug: "acer-aspirer-laptop"
  },
  {
    title: "Dell Inspiron 15",
    description: "Laptop with 15.6-inch Full HD display and up to 14 hours battery life.",
    sellingPrice: 65000,
    mrpPrice: 54999,
    categories: ["Laptops"],
    brand: "Dell",
    stock: 75,
    images: ["https://m.media-amazon.com/images/I/41ZnYns4YvL._SX300_SY300_QL70_FMwebp_.jpg", "path/to/laptop2.jpg"],
    reviews: [],
    rating: 4.6,
    specifications: {
      screenSize: "15.6 inches",
      battery: "Up to 14 hours",
      processor: "10th Gen Intel Core i5",
      memory: {
        ram: "16GB",
        storage: "512GB SSD"
      },
      operatingSystem: "Windows 10 Home",
      display: {
        type: "Full HD",
        resolution: "1920 x 1080 pixels"
      },
      connectivity: {
        network: "Wi-Fi 6",
        bluetooth: "Bluetooth 5.0",
        usb: "2 x USB-A, 1 x USB-C"
      },
      sensors: ["Fingerprint reader"],
      dimensions: {
        height: "0.78 inches",
        width: "14.31 inches",
        thickness: "9.96 inches"
      },
      weight: "4.37 pounds",
      colors: ["Platinum Silver", "Eclipse Black"],
      features: ["Backlit keyboard", "Fingerprint reader"],
      warranty: "1 year manufacturer warranty"
    },
    tags: ["laptop", "dell", "inspiron"],
    additionalImages: ["path/to/additionalLaptopImage1.jpg"],
    slug: "dell-inspiron-laptop"
  },
  {
    title: "HP Pavilion x360",
    description: "Laptop with 14-inch Full HD touchscreen display and up to 10 hours battery life.",
    sellingPrice: 92000,
    mrpPrice: 77499,
    categories: ["Laptops"],
    brand: "HP",
    stock: 60,
    images: ["https://m.media-amazon.com/images/I/41rH45mIbKL._SX300_SY300_QL70_FMwebp_.jpg", "path/to/laptop2.jpg"],
    reviews: [],
    rating: 4.4,
    specifications: {
      screenSize: "14 inches",
      battery: "Up to 10 hours",
      processor: "10th Gen Intel Core i5",
      memory: {
        ram: "8GB",
        storage: "256GB SSD"
      },
      operatingSystem: "Windows 10 Home",
      display: {
        type: "Full HD touchscreen",
        resolution: "1920 x 1080 pixels"
      },
      connectivity: {
        network: "Wi-Fi 6",
        bluetooth: "Bluetooth 5.0",
        usb: "2 x USB-A, 1 x USB-C"
      },
      sensors: ["Fingerprint reader"],
      dimensions: {
        height: "0.78 inches",
        width: "12.76 inches",
        thickness: "8.78 inches"
      },
      weight: "3.55 pounds",
      colors: ["Natural Silver", "Warm Gold"],
      features: ["Backlit keyboard", "Fingerprint reader"],
      warranty: "1 year manufacturer warranty"
    },
    tags: ["laptop", "hp", "pavilion"],
    additionalImages: ["path/to/additionalLaptopImage1.jpg"],
    slug: "hp-pavilion-laptop"
  },
  {
    title: "Lenovo IdeaPad 3",
    description: "Laptop with 15.6-inch Full HD display and up to 8 hours battery life.",
    sellingPrice: 64000,
    mrpPrice: 45999,
    categories: ["Laptops"],
    brand: "Lenovo",
    stock: 70,
    images: ["https://m.media-amazon.com/images/I/517NmAMfnWL._SY300_SX300_QL70_FMwebp_.jpg", "path/to/laptop2.jpg"],
    reviews: [],
    rating: 4.3,
    specifications: {
      screenSize: "15.6 inches",
      battery: "Up to 8 hours",
      processor: "AMD Ryzen 3",
      memory: {
        ram: "8GB",
        storage: "256GB SSD"
      },
      operatingSystem: "Windows 10 Home",
      display: {
        type: "Full HD",
        resolution: "1920 x 1080 pixels"
      },
      connectivity: {
        network: "Wi-Fi 6",
        bluetooth: "Bluetooth 5.0",
        usb: "2 x USB-A, 1 x USB-C"
      },
      sensors: ["Fingerprint reader"],
      dimensions: {
        height: "0.78 inches",
        width: "14.26 inches",
        thickness: "9.98 inches"
      },
      weight: "4.17 pounds",
      colors: ["Abyss Blue", "Granite Gray"],
      features: ["Backlit keyboard", "Fingerprint reader"],
      warranty: "1 year manufacturer warranty"
    },
    tags: ["laptop", "lenovo", "ideapad"],
    additionalImages: ["path/to/additionalLaptopImage1.jpg"],
    slug: "lenovo-ideapad-laptop"
  },
  {
    title: "ASUS ROG Strix G15",
    description: "Gaming laptop with 15.6-inch Full HD display and powerful performance.",
    sellingPrice: 182990,
    mrpPrice: 115990,
    categories: ["Laptops", "Gaming"],
    brand: "ASUS",
    stock: 20,
    images: ["https://m.media-amazon.com/images/I/61GkvvDNnCL._AC_UY327_FMwebp_QL65_.jpg", "path/to/laptop2.jpg"],
    reviews: [],
    rating: 4.9,
    specifications: {
      screenSize: "15.6 inches",
      processor: "Intel Core i7",
      memory: {
        ram: "16GB",
        storage: "1TB SSD"
      },
      graphics: "NVIDIA GeForce RTX 3070",
      operatingSystem: "Windows 10 Home",
      display: {
        type: "Full HD",
        resolution: "1920 x 1080 pixels",
        refreshRate: "144Hz"
      },
      connectivity: {
        network: "Wi-Fi 6",
        bluetooth: "Bluetooth 5.0",
        usb: "3 x USB-A, 1 x USB-C"
      },
      dimensions: {
        height: "1.02 inches",
        width: "14.17 inches",
        thickness: "10.83 inches"
      },
      weight: "5.07 pounds",
      colors: ["Black"],
      features: ["Backlit keyboard", "RGB lighting", "Gaming mode"],
      warranty: "1 year manufacturer warranty"
    },
    tags: ["laptop", "gaming", "asus"],
    additionalImages: ["path/to/additionalLaptopImage1.jpg"],
    slug: "asus-rog-strix-g15"
  },
  {
    title: "MSI GS66 Stealth",
    description: "Ultra-thin gaming laptop with 15.6-inch Full HD display and powerful performance.",
    sellingPrice: 235990,
    mrpPrice: 235990,
    categories: ["Laptops", "Gaming"],
    brand: "MSI",
    stock: 15,
    images: ["https://m.media-amazon.com/images/I/615xXeGt2rL._AC_UY327_FMwebp_QL65_.jpg", "path/to/laptop2.jpg"],
    reviews: [],
    rating: 4.8,
    specifications: {
      screenSize: "15.6 inches",
      processor: "Intel Core i9",
      memory: {
        ram: "32GB",
        storage: "2TB SSD"
      },
      graphics: "NVIDIA GeForce RTX 3080",
      operatingSystem: "Windows 10 Home",
      display: {
        type: "Full HD",
        resolution: "1920 x 1080 pixels",
        refreshRate: "300Hz"
      },
      connectivity: {
        network: "Wi-Fi 6",
        bluetooth: "Bluetooth 5.1",
        usb: "3 x USB-A, 1 x USB-C"
      },
      dimensions: {
        height: "0.71 inches",
        width: "14.17 inches",
        thickness: "9.65 inches"
      },
      weight: "4.63 pounds",
      colors: ["Black"],
      features: ["Backlit keyboard", "RGB lighting", "Gaming mode"],
      warranty: "1 year manufacturer warranty"
    },
    tags: ["laptop", "gaming", "msi"],
    additionalImages: ["path/to/additionalLaptopImage1.jpg"],
    slug: "msi-gs66-stealth"
  },
  {
    title: "Razer Blade 15",
    description: "Gaming laptop with 15.6-inch Full HD display and premium design.",
    sellingPrice: 45599,
    mrpPrice: 40999,
    categories: ["Laptops", "Gaming"],
    brand: "Razer",
    stock: 25,
    images: ["https://m.media-amazon.com/images/I/51dzm2O8ZWL._SX300_SY300_QL70_FMwebp_.jpg", "path/to/laptop2.jpg"],
    reviews: [],
    rating: 4.7,
    specifications: {
      screenSize: "15.6 inches",
      processor: "Intel Core i7",
      memory: {
        ram: "16GB",
        storage: "512GB SSD"
      },
      graphics: "NVIDIA GeForce RTX 3060",
      operatingSystem: "Windows 10 Home",
      display: {
        type: "Full HD",
        resolution: "1920 x 1080 pixels",
        refreshRate: "144Hz"
      },
      connectivity: {
        network: "Wi-Fi 6",
        bluetooth: "Bluetooth 5.0",
        usb: "3 x USB-A, 1 x USB-C"
      },
      dimensions: {
        height: "0.78 inches",
        width: "13.98 inches",
        thickness: "9.25 inches"
      },
      weight: "4.63 pounds",
      colors: ["Black"],
      features: ["Backlit keyboard", "RGB lighting", "Gaming mode"],
      warranty: "1 year manufacturer warranty"
    },
    tags: ["laptop", "gaming", "razer"],
    additionalImages: ["path/to/additionalLaptopImage1.jpg"],
    slug: "razer-blade-15"
  },
  {
    title: "Alienware m15 R6",
    description: "Gaming laptop with 15.6-inch Full HD display and Alienware Cryo-Tech cooling.",
    sellingPrice: 223322,
    mrpPrice: 142990,
    categories: ["Laptops", "Gaming"],
    brand: "Alienware",
    stock: 10,
    images: ["https://m.media-amazon.com/images/I/51dzm2O8ZWL._SX300_SY300_QL70_FMwebp_.jpg", "path/to/laptop2.jpg"],
    reviews: [],
    rating: 4.9,
    specifications: {
      screenSize: "15.6 inches",
      processor: "Intel Core i9",
      memory: {
        ram: "32GB",
        storage: "1TB SSD"
      },
      graphics: "NVIDIA GeForce RTX 3080",
      operatingSystem: "Windows 10 Home",
      display: {
        type: "Full HD",
        resolution: "1920 x 1080 pixels",
        refreshRate: "360Hz"
      },
      connectivity: {
        network: "Wi-Fi 6",
        bluetooth: "Bluetooth 5.1",
        usb: "3 x USB-A, 1 x USB-C"
      },
      dimensions: {
        height: "0.81 inches",
        width: "14.19 inches",
        thickness: "10.86 inches"
      },
      weight: "4.65 pounds",
      colors: ["Dark Side of the Moon"],
      features: ["Backlit keyboard", "RGB lighting", "Gaming mode"],
      warranty: "1 year manufacturer warranty"
    },
    tags: ["laptop", "gaming", "alienware"],
    additionalImages: ["path/to/additionalLaptopImage1.jpg"],
    slug: "alienware-m15-r6"
  },
  {
    title: "HP Spectre x360",
    description: "Convertible laptop with 13.3-inch 4K OLED display and long battery life.",
    sellingPrice: 116000,
    mrpPrice: 108499,
    categories: ["Laptops"],
    brand: "HP",
    stock: 35,
    images: ["https://m.media-amazon.com/images/I/41bF5rKo3CL._SY300_SX300_.jpg", "path/to/laptop2.jpg"],
    reviews: [],
    rating: 4.7,
    specifications: {
      screenSize: "13.3 inches",
      processor: "Intel Core i7",
      memory: {
        ram: "16GB",
        storage: "512GB SSD"
      },
      operatingSystem: "Windows 11",
      display: {
        type: "4K OLED",
        resolution: "3840 x 2160 pixels",
        touchScreen: true
      },
      connectivity: {
        network: "Wi-Fi 6",
        bluetooth: "Bluetooth 5.2",
        usb: "2 x Thunderbolt 4, 1 x USB-A"
      },
      dimensions: {
        height: "0.67 inches",
        width: "11.75 inches",
        thickness: "8.67 inches"
      },
      weight: "2.87 pounds",
      colors: ["Nightfall Black", "Poseidon Blue"],
      features: ["Convertible design", "Stylus support", "Fingerprint reader"],
      warranty: "1 year manufacturer warranty"
    },
    tags: ["laptop", "hp", "spectre"],
    additionalImages: ["path/to/additionalLaptopImage1.jpg"],
    slug: "hp-spectre-x360"
  },
  {
    title: "Dell XPS 13",
    description: "Ultra-portable laptop with 13.4-inch InfinityEdge display and premium build quality.",
    sellingPrice: 84499 ,
    mrpPrice: 74999,
    categories: ["Laptops"],
    brand: "Dell",
    stock: 40,
    images: ["https://m.media-amazon.com/images/I/41bF5rKo3CL._SY300_SX300_.jpg", "path/to/laptop2.jpg"],
    reviews: [],
    rating: 4.8,
    specifications: {
      screenSize: "13.4 inches",
      processor: "Intel Core i7",
      memory: {
        ram: "16GB",
        storage: "512GB SSD"
      },
      operatingSystem: "Windows 11",
      display: {
        type: "InfinityEdge",
        resolution: "1920 x 1200 pixels",
        touchScreen: false
      },
      connectivity: {
        network: "Wi-Fi 6",
        bluetooth: "Bluetooth 5.1",
        usb: "2 x Thunderbolt 4, 1 x USB-C"
      },
      dimensions: {
        height: "0.58 inches",
        width: "11.64 inches",
        thickness: "7.82 inches"
      },
      weight: "2.64 pounds",
      colors: ["Platinum Silver", "Frost White"],
      features: ["Ultra-portable design", "Fingerprint reader"],
      warranty: "1 year manufacturer warranty"
    },
    tags: ["laptop", "dell", "xps"],
    additionalImages: ["path/to/additionalLaptopImage1.jpg"],
    slug: "dell-xps-13"
  },
  {
    title: "Lenovo ThinkPad X1 Carbon",
    description: "Business laptop with 14-inch WQHD display and robust security features.",
    sellingPrice: 44499.99,
    mrpPrice: 40499.99,
    categories: ["Laptops"],
    brand: "Lenovo",
    stock: 30,
    images: ["https://m.media-amazon.com/images/I/41bF5rKo3CL._SY300_SX300_.jpg", "path/to/laptop2.jpg"],
    reviews: [],
    rating: 4.6,
    specifications: {
      screenSize: "14 inches",
      processor: "Intel Core i7",
      memory: {
        ram: "16GB",
        storage: "512GB SSD"
      },
      operatingSystem: "Windows 11",
      display: {
        type: "WQHD",
        resolution: "2560 x 1440 pixels",
        touchScreen: false
      },
      connectivity: {
        network: "Wi-Fi 6",
        bluetooth: "Bluetooth 5.2",
        usb: "2 x Thunderbolt 4, 2 x USB-A"
      },
      dimensions: {
        height: "0.59 inches",
        width: "12.71 inches",
        thickness: "8.54 inches"
      },
      weight: "2.49 pounds",
      colors: ["Black"],
      features: ["Robust security features", "Fingerprint reader"],
      warranty: "1 year manufacturer warranty"
    },
    tags: ["laptop", "lenovo", "thinkpad"],
    additionalImages: ["path/to/additionalLaptopImage1.jpg"],
    slug: "lenovo-thinkpad-x1-carbon"
  },
  {
    "title": "KitchenAid Stand Mixer",
    "description": "10-speed stand mixer with 5-quart stainless steel bowl and planetary mixing action.",
    "sellingPrice": 299.99,
    "mrpPrice": 349.99,
    "categories": ["Kitchen Appliances", "Mixers"],
    "brand": "KitchenAid",
    "stock": 20,
    "images": ["https://m.media-amazon.com/images/I/41AX+UnVPxL._SY300_SX300_.jpg", "path/to/mixer2.jpg"],
    "reviews": [],
    "rating": 4.8,
    "specifications": {
      "bowlSize": "5 quarts",
      "speeds": "10",
      "mixingAction": "Planetary",
      "color": "Empire Red",
      "dimensions": {
        "height": "14.5 inches",
        "width": "11.3 inches",
        "thickness": "14.6 inches"
      },
      "weight": "22 pounds",
      "features": ["Tilt-back head", "Soft-start motor"],
      "warranty": "5 year limited warranty"
    },
    "tags": ["kitchenaid", "stand mixer", "mixer"],
    "additionalImages": ["path/to/additionalMixerImage1.jpg"],
    "slug": "kitchenaid-stand-mixer"
  },
  {
    "title": "Instant Pot Duo",
    "description": "7-in-1 multi-functional pressure cooker with 6-quart capacity and 14 smart programs.",
    "sellingPrice": 749 ,
    "mrpPrice": 999 ,
    "categories": ["Kitchen Appliances", "Pressure Cookers"],
    "brand": "Instant Pot",
    "stock": 30,
    "images": ["https://m.media-amazon.com/images/I/41N4wmHtXML._SX300_SY300_QL70_FMwebp_.jpg", "path/to/pressure-cooker2.jpg"],
    "reviews": [],
    "rating": 4.7,
    "specifications": {
      "capacity": "6 quarts",
      "programs": "14",
      "functions": ["Pressure Cooker", "Slow Cooker", "Rice Cooker", "Steamer", "Sauté", "Yogurt Maker", "Warmer"],
      "color": "Black",
      "dimensions": {
        "height": "12.5 inches",
        "width": "13.2 inches",
        "thickness": "12.2 inches"
      },
      "weight": "11.8 pounds",
      "features": ["Stainless steel inner pot", "3-ply bottom", "10+ safety features"],
      "warranty": "1 year limited warranty"
    },
    "tags": ["instant pot", "pressure cooker", "multi-cooker"],
    "additionalImages": ["path/to/additionalPressureCookerImage1.jpg"],
    "slug": "instant-pot-duo"
  },
  {
    "title": "Cuisinart Food Processor",
    "description": "14-cup food processor with stainless steel blades and 720-watt motor.",
    "sellingPrice": 1999.99,
    "mrpPrice": 1249.99,
    "categories": ["Kitchen Appliances", "Food Processors"],
    "brand": "Cuisinart",
    "stock": 25,
    "images": ["https://m.media-amazon.com/images/I/41bjZPtqcxL._AC_UY327_FMwebp_QL65_.jpg", "path/to/food-processor2.jpg"],
    "reviews": [],
    "rating": 4.6,
    "specifications": {
      "capacity": "14 cups",
      "power": "720 watts",
      "blades": "Stainless steel",
      "color": "Brushed Stainless",
      "dimensions": {
        "height": "17 inches",
        "width": "10.75 inches",
        "thickness": "15.25 inches"
      },
      "weight": "18.4 pounds",
      "features": ["Dough blade", "Slicing disc", "Shredding disc"],
      "warranty": "3 year limited warranty"
    },
    "tags": ["cuisinart", "food processor", "kitchen appliances"],
    "additionalImages": ["path/to/additionalFoodProcessorImage1.jpg"],
    "slug": "cuisinart-food-processor"
  },
  {
    "title": "Ninja Air Fryer",
    "description": "4-quart air fryer with 4 functions: air fry, roast, reheat, and dehydrate.",
    "sellingPrice": 799.99,
    "mrpPrice": 629.99,
    "categories": ["Kitchen Appliances", "Air Fryers"],
    "brand": "Ninja",
    "stock": 20,
    "images": ["https://m.media-amazon.com/images/I/51dDd7k1OGL._AC_UY327_FMwebp_QL65_.jpg", "path/to/air-fryer2.jpg"],
    "reviews": [],
    "rating": 4.8,
    "specifications": {
      "capacity": "4 quarts",
      "functions": ["Air Fry", "Roast", "Reheat", "Dehydrate"],
      "color": "Black",
      "dimensions": {
        "height": "13.3 inches",
        "width": "13.6 inches",
        "thickness": "11 inches"
      },
      "weight": "8.74 pounds",
      "features": ["Ceramic-coated basket", "Temperature control", "Dishwasher-safe parts"],
      "warranty": "1 year limited warranty"
    },
    "tags": ["ninja", "air fryer", "kitchen appliances"],
    "additionalImages": ["path/to/additionalAirFryerImage1.jpg"],
    "slug": "ninja-air-fryer"
  },
  {
    "title": "Breville Smart Oven",
    "description": "1800-watt countertop oven with 10 functions and Element IQ technology.",
    "sellingPrice": 1349.99,
    "mrpPrice": 879.99,
    "categories": ["Kitchen Appliances", "Toaster Ovens"],
    "brand": "Breville",
    "stock": 15,
    "images": ["https://m.media-amazon.com/images/I/711fY0Yg05L._AC_UY327_FMwebp_QL65_.jpg", "path/to/toaster-oven2.jpg"],
    "reviews": [],
    "rating": 4.9,
    "specifications": {
      "power": "1800 watts",
      "functions": "10",
      "technology": "Element IQ",
      "color": "Stainless Steel",
      "dimensions": {
        "height": "11.25 inches",
        "width": "18.5 inches",
        "thickness": "16.25 inches"
      },
      "weight": "22.8 pounds",
      "features": ["Convection fan", "LCD display", "Non-stick interior"],
      "warranty": "1 year limited warranty"
    },
    "tags": ["breville", "smart oven", "kitchen appliances"],
    "additionalImages": ["path/to/additionalToasterOvenImage1.jpg"],
    "slug": "breville-smart-oven"
  },
  {
    "title": "Vitamix Blender",
    "description": "Professional-grade blender with 64-ounce container and variable speed control.",
    "sellingPrice": 3299.99,
    "mrpPrice": 1449.99,
    "categories": ["Kitchen Appliances", "Blenders"],
    "brand": "Vitamix",
    "stock": 10,
    "images": ["https://m.media-amazon.com/images/I/51r05bNtxyL._AC_UY327_FMwebp_QL65_.jpg", "path/to/blender2.jpg"],
    "reviews": [],
    "rating": 4.7,
    "specifications": {
      "capacity": "64 ounces",
      "controls": "Variable speed",
      "color": "Black",
      "dimensions": {
        "height": "20.5 inches",
        "width": "8.75 inches",
        "thickness": "7.25 inches"
      },
      "weight": "10.5 pounds",
      "features": ["Aircraft-grade blades", "Self-cleaning", "Tamper included"],
      "warranty": "7 year full warranty"
    },
    "tags": ["vitamix", "blender", "kitchen appliances"],
    "additionalImages": ["path/to/additionalBlenderImage1.jpg"],
    "slug": "vitamix-blender"
  },
  {
    "title": "Keurig K-Elite",
    "description": "Single-serve coffee maker with iced coffee capability and programmable settings.",
    "sellingPrice": 1229 ,
    "mrpPrice": 1429 ,
    "categories": ["Kitchen Appliances", "Coffee Makers"],
    "brand": "Keurig",
    "stock": 20,
    "images": ["https://m.media-amazon.com/images/I/41bF5rKo3CL._SY300_SX300_.jpg", "path/to/coffee-maker2.jpg"],
    "reviews": [],
    "rating": 4.8,
    "specifications": {
      "brewSize": "4, 6, 8, 10, or 12 ounces",
      "settings": "Programmable",
      "color": "Brushed Silver",
      "dimensions": {
        "height": "13.1 inches",
        "width": "9.9 inches",
        "thickness": "12.7 inches"
      },
      "weight": "6.6 pounds",
      "features": ["Iced coffee capability", "Strong brew setting", "Quiet brew technology"],
      "warranty": "1 year limited warranty"
    },
    "tags": ["keurig", "coffee maker", "kitchen appliances"],
    "additionalImages": ["path/to/additionalCoffeeMakerImage1.jpg"],
    "slug": "keurig-k-elite"
  },
  {
    "title": "Crock-Pot Slow Cooker",
    "description": "6-quart slow cooker with digital countdown control and automatic keep-warm setting.",
    "sellingPrice": 1249.99,
    "mrpPrice": 959.99,
    "categories": ["Kitchen Appliances", "Slow Cookers"],
    "brand": "Crock-Pot",
    "stock": 15,
    "images": ["https://m.media-amazon.com/images/I/41bF5rKo3CL._SY300_SX300_.jpg", "path/to/slow-cooker2.jpg"],
    "reviews": [],
    "rating": 4.7,
    "specifications": {
      "capacity": "6 quarts",
      "controls": "Digital",
      "settings": "Countdown timer",
      "color": "Stainless Steel",
      "dimensions": {
        "height": "15.4 inches",
        "width": "15.3 inches",
        "thickness": "9.9 inches"
      },
      "weight": "13.4 pounds",
      "features": ["Automatic keep-warm", "Dishwasher-safe stoneware", "Locking lid"],
      "warranty": "1 year limited warranty"
    },
    "tags": ["crock-pot", "slow cooker", "kitchen appliances"],
    "additionalImages": ["path/to/additionalSlowCookerImage1.jpg"],
    "slug": "crock-pot-slow-cooker"
  },
  {
    "title": "Hamilton Beach Toaster",
    "description": "2-slice toaster with extra-wide slots and bagel, defrost, and cancel functions.",
    "sellingPrice": 1549.99,
    "mrpPrice": 1229.99,
    "categories": ["Kitchen Appliances", "Toasters"],
    "brand": "Hamilton Beach",
    "stock": 25,
    "images": ["https://m.media-amazon.com/images/I/41bF5rKo3CL._SY300_SX300_.jpg", "path/to/toaster2.jpg"],
    "reviews": [],
    "rating": 4.6,
    "specifications": {
      "slots": "2",
      "functions": ["Bagel", "Defrost", "Cancel"],
      "color": "Silver",
      "dimensions": {
        "height": "7.5 inches",
        "width": "11.3 inches",
        "thickness": "7.5 inches"
      },
      "weight": "3.2 pounds",
      "features": ["Extra-wide slots", "Toast boost", "Auto shutoff"],
      "warranty": "1 year limited warranty"
    },
    "tags": ["hamilton beach", "toaster", "kitchen appliances"],
    "additionalImages": ["path/to/additionalToasterImage1.jpg"],
    "slug": "hamilton-beach-toaster"
  },



  {
    title: "Levi's Men's Casual Shirt",
    description: "A classic casual shirt from Levi's, perfect for everyday wear. Made from high-quality cotton, this shirt features a relaxed fit and a stylish design.",
    sellingPrice: 1999,
    mrpPrice: 2500,
    categories: ["Clothing", "Shirts"],
    brand: "Levi's",
    stock: 100,
    images: [
      "https://m.media-amazon.com/images/I/51x90NnvS5L._AC_UL480_FMwebp_QL65_.jpg",
      "https://m.media-amazon.com/images/I/51XruJV28HL._AC_UL480_FMwebp_QL65_.jpg",
      "https://m.media-amazon.com/images/I/51wAJpGFhGL._AC_UL480_FMwebp_QL65_.jpg"
    ],
    reviews: [],
    rating: 4,
    specifications: {
      fabric: "Cotton",
      sleeveType: "Short Sleeve",
      collarType: "Spread Collar",
      fit: "Relaxed Fit",
      size: ["S", "M", "L", "XL"],
      color: ["White", "Light Blue", "Pink"],
      pattern: ["Solid", "Striped"],
      length: "Regular",
      cuffStyle: "Button Cuff",
      pocket: "Single Pocket"
    },
    features: ["Breathable fabric", "Soft and comfortable", "Easy to iron"],
    careInstructions: ["Machine wash", "Tumble dry", "Iron low"],
    warranty: "1 year manufacturer warranty",
    tags: ["casual shirt", "men's shirt", "levis"],
    additionalImages: ["path/to/additionalShirtImage1.jpg", "path/to/additionalShirtImage2.jpg"],
    slug: "levis-mens-casual-shirt"
  },
  {
    title: "Wrangler Jeans",
    description: "A stylish and comfortable pair of jeans from Wrangler, perfect for everyday wear. Made from high-quality denim, these jeans feature a slim fit and a fashionable design.",
    sellingPrice: 2999,
    mrpPrice: 3500,
    categories: ["Clothing", "Jeans"],
    brand: "Wrangler",
    stock: 50,
    images: [
      "https://m.media-amazon.com/images/I/71mRre7cFsL._AC_UL480_FMwebp_QL65_.jpg",
      "https://m.media-amazon.com/images/I/61gFw2BjKzgL._SX569_.jpg",
      "https://m.media-amazon.com/images/I/61Fw2BjKzgL._SX569_.jpg"
    ],
    reviews: [],
    rating: 4,
    specifications: {
      fabric: "Denim",
      fit: "Slim Fit",
      size: ["28", "30", "32", "34"],
      color: ["Blue", "Black", "Grey"],
      style: ["Regular", "Slim", "Tapered"],
      length: ["Regular", "Long", "Short"],
      pocket: ["Five Pocket"],
      fly: ["Zip Fly"],
      waist: ["Mid Rise", "Low Rise"]
    },
    features: ["Stretchable fabric", "Comfortable fit", "Fashionable design"],
    careInstructions: ["Machine wash", "Tumble dry", "Iron low"],
    warranty: "1 year manufacturer warranty",
    tags: ["jeans", "men's jeans", "wrangler"],
    additionalImages: ["path/to/additionalJeansImage1.jpg", "path/to/additionalJeansImage2.jpg"],
    slug: "wrangler-mens-slim-fit-jeans"
  },
  {
    title: "Adidas Men's Crew Neck Sweater",
    description: "A warm and comfortable crew neck sweater from Adidas, perfect for casual wear. Made from high-quality cotton, this sweater features a relaxed fit and a stylish design.",
    sellingPrice: 2999,
    mrpPrice: 3500,
    categories: ["Clothing", "Sweaters"],
    brand: "Adidas",
    stock: 50,
    images: [
      "https://m.media-amazon.com/images/I/51+NsmrRmZL._AC_UL480_FMwebp_QL65_.jpg",
      "https://m.media-amazon.com/images/I/61gFw2BjKzgL._SX569_.jpg",
      "https://m.media-amazon.com/images/I/61Fw2BjKzgL._SX569_.jpg"
    ],
    reviews: [],
    rating: 4,
    specifications: {
      fabric: "Cotton",
      fit: "Relaxed Fit",
      size: ["S", "M", "L", "XL"],
      color: ["Navy", "Grey", "White", "Black"],
      style: ["Crew Neck", "V-Neck"],
      sleeve: ["Long Sleeve"],
      neckline: ["Crew Neck"],
      pocket: ["No Pocket"]
    },
    features: ["Soft and comfortable", "Warm and cozy", "Fashionable design"],
    careInstructions: ["Machine wash", "Tumble dry", "Iron low"],
    warranty: "1 year manufacturer warranty",
    tags: ["sweater", "men's sweater", "adidas"],
    additionalImages: ["path/to/additionalSweaterImage1.jpg", "path/to/additionalSweaterImage2.jpg"],
    slug: "adidas-mens-crew-neck-sweater"
  },

  {
    title: "Denali Jacket",
    description: "A warm and durable Denali jacket from The North Face, perfect for outdoor activities. Made from high-quality polyester, this jacket features a relaxed fit and a stylish design.",
    sellingPrice: 4999,
    mrpPrice: 6000,
    categories: ["Clothing", "Jackets"],
    brand: "The North Face",
    stock: 20,
    images: [
      "https://m.media-amazon.com/images/I/61hz9cK6gnL._AC_UL480_FMwebp_QL65_.jpg",
      "https://m.media-amazon.com/images/I/61gFw2BjKzgL._SX569_.jpg",
      "https://m.media-amazon.com/images/I/61Fw2BjKzgL._SX569_.jpg"
    ],
    reviews: [],
    rating: 4,
    specifications: {
      fabric: "Polyester",
      fit: "Relaxed Fit",
      size: ["S", "M", "L", "XL"],
      color: ["Black", "Navy", "Grey", "Red"],
      style: ["Denali", "Fleece"],
      sleeve: ["Long Sleeve"],
      neckline: ["Crew Neck"],
      pocket: ["Multiple Pockets"]
    },
    features: ["Warm and durable", "Water-resistant", "Breathable fabric"],
    careInstructions: ["Machine wash", "Tumble dry", "Iron low"],
    warranty: "1 year manufacturer warranty",
    tags: ["jacket", "men's jacket", "the north face"],
    additionalImages: ["path/to/additionalJacketImage1.jpg", "path/to/additionalJacketImage2.jpg"],
    slug: "the-north-face-mens-denali-jacket"
  },

  {
    title: "Quilted  Jacket",
    description: "A stylish and comfortable pair of shoes from Nike, perfect for everyday wear. Made from high-quality materials, these shoes feature a sleek design and a responsive midsole.",
    sellingPrice: 6999,
    mrpPrice: 8000,
    categories: ["Footwear", "Shoes"],
    brand: "Nike",
    stock: 30,
    images: [
      "https://m.media-amazon.com/images/I/41qKmOIyD5L._AC_UL480_FMwebp_QL65_.jpg",
      "https://m.media-amazon.com/images/I/61gFw2BjKzgL._SX569_.jpg",
      "https://m.media-amazon.com/images/I/61Fw2BjKzgL._SX569_.jpg"
    ],
    reviews: [],
    rating: 4,
    specifications: {
      material: "Synthetic",
      fit: "True to Size",
      size: ["6", "7", "8", "9", "10"],
      color: ["Black", "White", "Grey", "Red"],
      style: ["Running", "Casual"],
      sole: ["Rubber"],
      heel: ["Low Heel"],
      width: ["Medium"]
    },
    features: ["Responsive midsole", "Breathable upper", "Stylish design"],
    careInstructions: ["Wipe clean with a damp cloth", "Avoid exposure to direct sunlight"],
    warranty: "1 year manufacturer warranty",
    tags: ["shoes", "men's shoes", "nike"],
    additionalImages: ["path/to/additionalShoesImage1.jpg", "path/to/additionalShoesImage2.jpg"],
    slug: "nike-mens-air-max-270-shoes"
  },
  
  {
    "title": "Floral Dress",
    "description": "A beautiful and elegant floral dress from Zara, perfect for any occasion. Made from high-quality materials, this dress features a fitted waist and a flowy skirt.",
    "sellingPrice": 2999,
    "mrpPrice": 3500,
    "categories": ["Clothing", "Dresses"],
    "brand": "Zara",
    "stock": 30,
    "images": [
      "https://m.media-amazon.com/images/I/41IRV3ekqQL._AC_UL480_FMwebp_QL65_.jpg",
      "https://m.media-amazon.com/images/I/61gFw2BjKzgL._SX569_.jpg",
      "https://m.media-amazon.com/images/I/61Fw2BjKzgL._SX569_.jpg"
    ],
    "reviews": [],
    "rating": 4,
    "specifications": {
      "fabric": "Cotton",
      "fit": "Fitted",
      "size": ["S", "M", "L", "XL"],
      "color": ["Red", "Blue", "Yellow", "Green"],
      "style": ["Floral", "Bodycon"],
      "sleeve": ["Short Sleeve"],
      "neckline": ["V-Neck"],
      "length": ["Knee Length"]
    },
    "features": ["Fitted waist", "Flowy skirt", "Beautiful floral print"],
    "careInstructions": ["Machine wash", "Tumble dry", "Iron low"],
    "warranty": "1 year manufacturer warranty",
    "tags": ["dress", "women's dress", "zara"],
    "additionalImages": ["path/to/additionalDressImage1.jpg", "path/to/additionalDressImage2.jpg"],
    "slug": "zara-womens-floral-dress"
  },
  {
    "title": "H&M Women's Denim Jumpsuit",
    "description": "A stylish and comfortable denim jumpsuit from H&M, perfect for casual wear. Made from high-quality materials, this jumpsuit features a relaxed fit and a trendy design.",
    "sellingPrice": 1999,
    "mrpPrice": 2500,
    "categories": ["Clothing", "Jumpsuits"],
    "brand": "H&M",
    "stock": 25,
    "images": [
      "https://m.media-amazon.com/images/I/31aGblh9mzL._AC_UL480_FMwebp_QL65_.jpg",
      "https://m.media-amazon.com/images/I/61gFw2BjKzgL._SX569_.jpg",
      "https://m.media-amazon.com/images/I/61Fw2BjKzgL._SX569_.jpg"
    ],
    "reviews": [],
    "rating": 4,
    "specifications": {
      "fabric": "Denim",
      "fit": "Relaxed",
      "size": ["S", "M", "L", "XL"],
      "color": ["Blue", "Black", "White", "Grey"],
      "style": ["Casual", "Trendy"],
      "sleeve": ["Long Sleeve"],
      "neckline": ["Round Neck"],
      "length": ["Full Length"]
    },
    "features": ["Relaxed fit", "Trendy design", "Comfortable denim fabric"],
    "careInstructions": ["Machine wash", "Tumble dry", "Iron low"],
    "warranty": "1 year manufacturer warranty",
    "tags": ["jumpsuit", "women's jumpsuit", "h&m"],
    "additionalImages": ["path/to/additionalJumpsuitImage1.jpg", "path/to/additionalJumpsuitImage2.jpg"],
    "slug": "h&m-womens-denim-jumpsuit"
  },
  {
    "title": "Zara Top",
    "description": "A trendy and stylish off-the-shoulder top from Zara, perfect for casual wear. Made from high-quality materials, this top features a relaxed fit and a beautiful design.",
    "sellingPrice": 999,
    "mrpPrice": 1200,
    "categories": ["Clothing", "Tops"],
    "brand": "Zara",
    "stock": 30,
    "images": [
      "https://m.media-amazon.com/images/I/61-ca6P9eHL._AC_UL480_FMwebp_QL65_.jpg",
      "https://m.media-amazon.com/images/I/61gFw2BjKzgL._SX569_.jpg",
      "https://m.media-amazon.com/images/I/61Fw2BjKzgL._SX569_.jpg"
    ],
    "reviews": [],
    "rating": 4,
    "specifications": {
      "fabric": "Cotton",
      "fit": "Relaxed",
      "size": ["S", "M", "L", "XL"],
      "color": ["White", "Black", "Grey", "Navy"],
      "style": ["Off-the-Shoulder", "Casual"],
      "sleeve": ["Short Sleeve"],
      "neckline": ["Off-the-Shoulder"],
      "length": ["Cropped"]
    },
    "features": ["Relaxed fit", "Beautiful design", "Off-the-shoulder style"],
    "careInstructions": ["Machine wash", "Tumble dry", "Iron low"],
    "warranty": "1 year manufacturer warranty",
    "tags": ["top", "women's top", "zara"],
    "additionalImages": ["path/to/additionalTopImage1.jpg", "path/to/additionalTopImage2.jpg"],
    "slug": "zara-womens-off-the-shoulder-top"
  },
  {
    "title": "H&M Men's Slim Fit Shirt",
    "description": "A stylish and comfortable slim fit shirt from H&M, perfect for casual wear. Made from high-quality materials, this shirt features a fitted design and a beautiful pattern.",
    "sellingPrice": 999,
    "mrpPrice": 1200,
    "categories": ["Clothing", "Shirts"],
    "brand": "H&M",
    "stock": 30,
    "images": [
      "https://m.media-amazon.com/images/I/61DGAlvxRLL._AC_UL480_FMwebp_QL65_.jpg",
      "https://m.media-amazon.com/images/I/61gFw2BjKzgL._SX569_.jpg",
      "https://m.media-amazon.com/images/I/61Fw2BjKzgL._SX569_.jpg"
    ],
    "reviews": [],
    "rating": 4,
    "colors": [
      {
        "color": "White",
        "images": [
          "https://m.media-amazon.com/images/I/61DGAlvxRLL._AC_UL480_FMwebp_QL65_.jpg",
          "https://m.media-amazon.com/images/I/61gFw2BjKzgL._SX569_.jpg"
        ],
        "variants": [
          {
            "size": "S",
            "stock": 10,
            "price": 999
          },
          {
            "size": "M",
            "stock": 8,
            "price": 999
          },
          {
            "size": "L",
            "stock": 5,
            "price": 1999
          }
        ]
      },
      {
        "color": "Black",
        "images": [
          "https://m.media-amazon.com/images/I/61Fw2BjKzgL._SX569_.jpg",
          "https://m.media-amazon.com/images/I/61gFw2BjKzgL._SX569_.jpg"
        ],
        "variants": [
          {
            "size": "M",
            "stock": 7,
            "price": 999
          },
          {
            "size": "L",
            "stock": 10,
            "price": 999
          },
          {
            "size": "XL",
            "stock": 5,
            "price": 999
          }
        ]
      }
    ],
    "specifications": {
      "fabric": "Cotton",
      "fit": "Slim Fit",
      "style": ["Casual", "Slim Fit"],
      "sleeve": ["Short Sleeve"],
      "neckline": ["Pointed Collar"],
      "length": ["Regular"]
    },
    "features": ["Comfortable fit", "Beautiful pattern", "High-quality materials"],
    "careInstructions": ["Machine wash", "Tumble dry", "Iron low"],
    "warranty": "1 year manufacturer warranty",
    "tags": ["shirt", "men's shirt", "h&m"],
    "additionalImages": ["path/to/additionalShirtImage1.jpg", "path/to/additionalShirtImage2.jpg"],
    "slug": "h&m-mens-slim-fit-shirt"
  },
  
  {
    "title": "Levi's  top",
    "description": "A classic and stylish pair of high-waisted jeans from Levi's, perfect for casual wear. Made from high-quality materials, these jeans feature a comfortable fit and a timeless design.",
    "sellingPrice": 1999,
    "mrpPrice": 2500,
    "categories": ["Clothing", "Jeans"],
    "brand": "Levi's",
    "stock": 25,
    "images": [
      "https://m.media-amazon.com/images/I/81g0TspIidL._AC_UL480_FMwebp_QL65_.jpg",
      "https://m.media-amazon.com/images/I/61gFw2BjKzgL._SX569_.jpg",
      "https://m.media-amazon.com/images/I/61Fw2BjKzgL._SX569_.jpg"
    ],
    "reviews": [],
    "rating": 4,
    "specifications": {
      "fabric": "Denim",
      "fit": "High-Waisted",
      "size": ["28", "30", "32", "34"],
      "color": ["Blue", "Black", "Grey", "White"],
      "style": ["Casual", "High-Waisted"],
      "waist": ["High Rise"],
      "length": ["Full Length"]
    },
    "features": ["Comfortable fit", "Timeless design", "High-quality denim"],
    "careInstructions": ["Machine wash", "Tumble dry", "Iron low"],
    "warranty": "1 year manufacturer warranty",
    "tags": ["jeans", "women's jeans", "levis"],
    "additionalImages": ["path/to/additionalJeansImage1.jpg", "path/to/additionalJeansImage2.jpg"],
    "slug": "levis-womens-high-waisted-jeans"
  },
  {
  
    "title": "Headway 5E Upper-Intermediate SB with Online Practice Paperback",
    "description": "Headway 5th edition provides fresh, relevant English instruction needed for success today. The course retains its trusted methodology and has been updated with new texts, topics, and digital resources. The Student's Book offers all the language and skills students need to improve their English, with integrated Online Practice ensuring relevant and useful practice outside the classroom.",
    "highlights": [
    "Updated content with new texts and topics",
    "Integrated Online Practice for extra learning support",
    "Comprehensive coverage of language and skills"
    ],

    "sellingPrice": 199.99,
    "mrpPrice": 499.99,
    "categories": [
      "Books",
      "Education",
      "Language Learning"
    ],
    "brand": "Oxford University Press",
    "stock": 100,
    "images": [
      "https://m.media-amazon.com/images/I/61oOoV3GuEL._SY342_.jpg",
      "https://m.media-amazon.com/images/I/815j94JFO1L._SY342_.jpg"
    ],
    "reviews": [],
    "rating": 4.7,   
      "specifications": {
        "ISBN-10": "0194539695",
        "ISBN-13": "978-0194539692",
        "Edition": "5th",
        "Publisher": "OUP Oxford",
        "Publication date": "27 June 2019",
        "Language": "English",
        "Item Weight": "456 g",
        "Dimensions": "21.9 x 0.8 x 27.6 cm",
        "Country of Origin": "United Kingdom"
      },
    "tags": [
      "English Language",
      "Learning",
      "Books",
      "Upper-Intermediate"
    ],
    "additionalImages": [],
    "slug": "headway-5e-upper-intermediate-sb-with-online-practice-paperback",
    "discount": 10,
    "featured": false,
    "bestseller": true,
    "active": true,
    "metadata": {
      "author": "Liz and John Soars",
      "onlinePractice": true
    },
    "createdAt": "2024-08-16T12:00:00Z",
    "updatedAt": "2024-08-16T12:00:00Z"
  }

];

module.exports = { products };