const products = [
  {
    title: "Oppo F19 Pro",
    description: "Wireless headphones with noise cancellation and superior sound quality.",
    sellingPrice: 149.99,
    mrpPrice: 569.99,
    categories: ["Mobile"],
    brand: "BrandZ",
    stock: 75,
    images: ["https://m.media-amazon.com/images/I/51dzm2O8ZWL._SX300_SY300_QL70_FMwebp_.jpg", "path/to/headphones2.jpg"],
    reviews: [],
    rating: 4.7,
    specifications: {
      screenSize: "6.5 inches",
      battery: "4000mAh",
      processor: "Octa-core",
      camera: {
      rearCamera: "64MP + 8MP + 2MP",
      frontCamera: "16MP"
      },
      storage: {
      internalStorage: "128GB",
      expandableStorage: "Up to 1TB"
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
      colors: ["Midnight Black", "Aurora Blue", "Sunset Dazzle"],
      features: ["Face Unlock", "Fast Charging", "Reverse Charging"],
      warranty: "1 year manufacturer warranty"
    },
    tags: ["shoes", "fashion", "sports"],
    additionalImages: ["path/to/additionalShoesImage1.jpg"],
    slug: "running-shoes-abc"
  },
  {
    title: "vivo X70 Pro",
    description: "A powerful laptop with a sleek design, perfect for both work and play.",
    sellingPrice: 149.99,
   mrpPrice: 199.99,
    categories: ["Electronics", "Mobile"],
    brand: "BrandA",
    stock: 30,
    images: ["https://m.media-amazon.com/images/I/41bF5rKo3CL._SY300_SX300_.jpg", "path/to/laptop2.jpg"],
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
    title: "samsung z flip 3",
    description: "A stylish smartwatch with multiple health tracking features.",
    sellingPrice: 149.99,
    mrpPrice: 199.99,
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
    sellingPrice: 149.99,
    mrpPrice: 569.99,
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
    sellingPrice: 129.99,
    mrpPrice: 499.99,
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
    sellingPrice: 159.99,
    mrpPrice: 599.99,
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
    sellingPrice: 139.99,
    mrpPrice: 549.99,
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
    sellingPrice: 349.99,
    mrpPrice: 699.99,
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
    sellingPrice: 449.99,
    mrpPrice: 799.99,
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
    sellingPrice: 399.99,
    mrpPrice: 749.99,
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
    sellingPrice: 299.99,
    mrpPrice: 599.99,
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
    sellingPrice: 1299.99,
    mrpPrice: 1599.99,
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
    sellingPrice: 1799.99,
    mrpPrice: 2099.99,
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
    sellingPrice: 1599.99,
    mrpPrice: 1899.99,
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
    sellingPrice: 1999.99,
    mrpPrice: 2299.99,
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
    sellingPrice: 1299.99,
    mrpPrice: 1599.99,
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
    sellingPrice: 1199.99,
    mrpPrice: 1499.99,
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
    sellingPrice: 1399.99,
    mrpPrice: 1699.99,
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
    "sellingPrice": 79.99,
    "mrpPrice": 99.99,
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
    "sellingPrice": 199.99,
    "mrpPrice": 249.99,
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
    "sellingPrice": 99.99,
    "mrpPrice": 129.99,
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
    "sellingPrice": 249.99,
    "mrpPrice": 299.99,
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
    "sellingPrice": 399.99,
    "mrpPrice": 449.99,
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
    "sellingPrice": 129.99,
    "mrpPrice": 149.99,
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
    "sellingPrice": 49.99,
    "mrpPrice": 59.99,
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
    "sellingPrice": 24.99,
    "mrpPrice": 29.99,
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

];

module.exports = { products };