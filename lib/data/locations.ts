// Instead of importing from another file, let's export the locations data directly
// Replace the entire file content with:

// Static location data
export const locations = [
  {
    id: "1",
    name: "Freetown",
    description:
      "Sierra Leone's vibrant capital city, nestled between mountains and the Atlantic Ocean, offering a blend of history, culture, and urban experiences.",
    longDescription:
      "Freetown, the capital city of Sierra Leone, is a vibrant metropolis nestled between lush mountains and the sparkling Atlantic Ocean. Founded in 1792 as a settlement for freed slaves, the city is rich in history and cultural significance. Today, Freetown is a bustling urban center that serves as the political, economic, and cultural heart of Sierra Leone.\n\nThe city offers a diverse range of experiences for visitors. Explore the historic Cotton Tree, a symbol of freedom that has stood in the center of Freetown for over 200 years. Visit the National Museum to learn about Sierra Leone's complex history, or take a stroll through the colorful Big Market to experience local commerce and crafts.\n\nFreetown's beaches, including Lumley Beach and Aberdeen Beach, provide beautiful coastal escapes within the city limits. As the sun sets, experience the city's vibrant nightlife with numerous restaurants, bars, and clubs offering both local and international cuisine and entertainment.",
    image: "/images/location-1.jpg",
    images: [
      "/images/location-1.jpg",
      "/images/freetown-1.jpg",
      "/images/freetown-2.jpg",
      "/images/freetown-3.jpg",
      "/images/freetown-4.jpg",
    ],
    region: "Western Area",
    activities: ["City Tours", "Historical Sites", "Beaches", "Nightlife"],
    highlights: [
      "Cotton Tree - Historic symbol in the city center",
      "National Museum - Showcasing Sierra Leone's history",
      "Lumley Beach - Popular beach with restaurants and nightlife",
      "St. George's Cathedral - Historic Anglican cathedral",
      "Big Market - Vibrant market for local crafts and goods",
    ],
    tours: [
      {
        id: "freetown-city",
        name: "Freetown City Tour",
        duration: "Full Day (8 hours)",
        price: 75,
        description:
          "Explore the highlights of Freetown with a knowledgeable local guide. Visit historical landmarks, markets, and cultural sites.",
        includes: ["Professional guide", "Transportation", "Lunch", "Entrance fees", "Bottled water"],
        groupSize: "Up to 10 people",
      },
      {
        id: "freetown-historical",
        name: "Historical Freetown Walking Tour",
        duration: "Half Day (4 hours)",
        price: 45,
        description:
          "Walk through Freetown's historic districts and learn about the city's founding, colonial history, and path to independence.",
        includes: ["Professional guide", "Bottled water", "Snack"],
        groupSize: "Up to 15 people",
      },
      {
        id: "freetown-culinary",
        name: "Freetown Culinary Experience",
        duration: "Half Day (5 hours)",
        price: 60,
        description:
          "Taste your way through Freetown's diverse culinary scene. Visit local markets, street food vendors, and restaurants.",
        includes: ["Food tastings", "Professional guide", "Transportation", "Bottled water"],
        groupSize: "Up to 8 people",
      },
    ],
    nearbyAttractions: [
      "Tacugama Chimpanzee Sanctuary - 30 minutes away",
      "Bunce Island - Historical slave trading fort accessible by boat",
      "Tokeh Beach - Pristine beach about 1 hour from Freetown",
      "John Obey Beach - Secluded beach with eco-lodges",
    ],
  },
  {
    id: "2",
    name: "Banana Islands",
    description:
      "A tropical paradise just off the coast of Freetown, featuring pristine beaches, crystal-clear waters, and a rich history.",
    longDescription:
      "The Banana Islands are a tropical paradise located just off the coast of the Freetown Peninsula. This small archipelago consists of three islands: Dublin Island, Ricketts Island, and Mes-Meheux. Dublin and Ricketts are connected by a stone causeway, while Mes-Meheux is uninhabited.\n\nWith their pristine white-sand beaches, crystal-clear waters, and lush vegetation, the Banana Islands offer an idyllic escape from the mainland. The islands are renowned for their excellent snorkeling and diving opportunities, with vibrant coral reefs and diverse marine life just offshore.\n\nBeyond their natural beauty, the Banana Islands have a rich and complex history. They were once a significant site for the transatlantic slave trade and later became home to freed slaves. Today, visitors can explore historical ruins, including old churches and slave trader residences, that provide glimpses into the islands' past.\n\nThe local communities on the islands maintain a traditional way of life, with fishing being the primary occupation. Visitors can experience authentic Sierra Leonean hospitality, sample fresh seafood, and enjoy the relaxed island atmosphere.",
    image: "/images/location-2.jpg",
    images: [
      "/images/location-2.jpg",
      "/images/banana-islands-1.jpg",
      "/images/banana-islands-2.jpg",
      "/images/banana-islands-3.jpg",
      "/images/banana-islands-4.jpg",
    ],
    region: "Western Area",
    activities: ["Snorkeling", "Beaches", "Historical Sites", "Fishing"],
    highlights: [
      "Dublin Beach - Pristine white sand beach with clear waters",
      "Historical Ruins - Remnants of churches and buildings from colonial era",
      "Coral Reefs - Vibrant marine ecosystems perfect for snorkeling",
      "Traditional Fishing Villages - Experience local island life",
      "Mes-Meheux - Uninhabited island with untouched nature",
    ],
    tours: [
      {
        id: "banana-day",
        name: "Banana Islands Day Trip",
        duration: "Full Day (10 hours)",
        price: 120,
        description:
          "Experience the beauty of the Banana Islands with a day trip from Freetown. Includes boat transportation, beach time, and a guided tour of historical sites.",
        includes: ["Round-trip boat transfer", "Professional guide", "Lunch", "Snorkeling equipment", "Bottled water"],
        groupSize: "Up to 12 people",
      },
      {
        id: "banana-overnight",
        name: "Banana Islands Overnight Adventure",
        duration: "2 Days, 1 Night",
        price: 250,
        description:
          "Immerse yourself in island life with an overnight stay. Explore historical sites, enjoy water activities, and experience a beautiful sunset and sunrise.",
        includes: ["Round-trip boat transfer", "Accommodation", "Meals", "Professional guide", "Snorkeling equipment"],
        groupSize: "Up to 8 people",
      },
      {
        id: "banana-snorkel",
        name: "Banana Islands Snorkeling Expedition",
        duration: "Full Day (8 hours)",
        price: 150,
        description:
          "Discover the underwater wonders around the Banana Islands with a guided snorkeling tour of multiple reef sites.",
        includes: ["Round-trip boat transfer", "Professional guide", "Snorkeling equipment", "Lunch", "Bottled water"],
        groupSize: "Up to 6 people",
      },
    ],
    nearbyAttractions: [
      "Kent Beach - Beautiful mainland beach near the boat departure point",
      "Freetown - Capital city with historical and cultural attractions",
      "Tokeh Beach - Another beautiful beach on the peninsula",
    ],
  },
  {
    id: "3",
    name: "Tiwai Island",
    description:
      "A wildlife sanctuary in the Moa River, home to rare primates, hundreds of bird species, and lush rainforest ecosystems.",
    longDescription:
      "Tiwai Island is a remarkable wildlife sanctuary situated in the Moa River in southeastern Sierra Leone. This 12 square kilometer island is one of West Africa's most important conservation areas and a biodiversity hotspot. The island is covered in tropical rainforest and is home to an extraordinary concentration of wildlife.\n\nTiwai is particularly famous for its primate population, hosting 11 different species including the endangered Diana monkey, western red colobus, and the rare pygmy hippopotamus. The island is also a birdwatcher's paradise with over 135 bird species recorded. Additionally, Tiwai supports diverse plant life, with hundreds of plant species, many with medicinal properties used by local communities.\n\nVisitors to Tiwai Island can explore the rainforest through a network of trails, participate in guided wildlife viewing walks, take boat trips around the island, and learn about conservation efforts. The island offers a unique opportunity to experience one of Sierra Leone's most pristine natural environments while supporting community-based conservation initiatives.\n\nAccommodation on the island is basic but comfortable, with eco-lodges and camping options available. The experience of staying overnight on the island, surrounded by the sounds of the forest and river, is truly unforgettable.",
    image: "/images/location-3.jpg",
    images: [
      "/images/location-3.jpg",
      "/images/tiwai-1.jpg",
      "/images/tiwai-2.jpg",
      "/images/tiwai-3.jpg",
      "/images/tiwai-4.jpg",
    ],
    region: "Southern Province",
    activities: ["Wildlife Viewing", "Hiking", "Boat Tours", "Camping"],
    highlights: [
      "Primate Watching - Home to 11 primate species including rare Diana monkeys",
      "Pygmy Hippo Habitat - One of the few places to potentially spot this rare species",
      "Birdwatching - Over 135 bird species recorded on the island",
      "Rainforest Trails - Network of paths through pristine forest",
      "Moa River - Beautiful river surrounding the island with fishing villages",
    ],
    tours: [
      {
        id: "tiwai-wildlife",
        name: "Tiwai Wildlife Experience",
        duration: "3 Days, 2 Nights",
        price: 350,
        description:
          "Immerse yourself in the biodiversity of Tiwai Island with guided wildlife walks, boat trips, and overnight stays in eco-lodges.",
        includes: [
          "Transportation from Bo or Kenema",
          "Accommodation",
          "Meals",
          "Professional guides",
          "Conservation fee",
          "Boat trips",
        ],
        groupSize: "Up to 8 people",
      },
      {
        id: "tiwai-day",
        name: "Tiwai Day Excursion",
        duration: "Full Day (10 hours)",
        price: 150,
        description:
          "Experience the highlights of Tiwai Island with a day trip including guided wildlife walks and a boat tour.",
        includes: ["Transportation from Bo or Kenema", "Lunch", "Professional guide", "Conservation fee", "Boat trip"],
        groupSize: "Up to 10 people",
      },
      {
        id: "tiwai-research",
        name: "Tiwai Research & Conservation Tour",
        duration: "4 Days, 3 Nights",
        price: 500,
        description:
          "Join researchers and conservation staff to learn about and participate in wildlife monitoring and conservation activities.",
        includes: [
          "Transportation from Bo or Kenema",
          "Accommodation",
          "Meals",
          "Research activities",
          "Conservation fee",
          "Boat trips",
        ],
        groupSize: "Up to 6 people",
      },
    ],
    nearbyAttractions: [
      "Bo - Sierra Leone's second largest city",
      "Gola Rainforest National Park - Larger protected rainforest area",
      "Traditional villages along the Moa River",
    ],
  },
  {
    id: "4",
    name: "Tacugama Chimpanzee Sanctuary",
    description:
      "A conservation center dedicated to rescuing and rehabilitating chimpanzees, offering educational tours and eco-lodges.",
    longDescription:
      "Tacugama Chimpanzee Sanctuary, established in 1995, is a haven for rescued and orphaned chimpanzees located in the Western Area Peninsula National Park, just 30 minutes from Freetown. The sanctuary was created to address the issues of deforestation, bushmeat hunting, and the illegal pet trade that threaten Sierra Leone's wild chimpanzee population.\n\nSpread across 100 acres of pristine rainforest, Tacugama provides a safe and natural environment for over 100 chimpanzees. Many of these animals have been rescued from traumatic situations and undergo rehabilitation with the hope of eventual reintroduction to the wild when possible.\n\nVisitors to Tacugama can take guided tours to learn about chimpanzee behavior, conservation challenges, and the sanctuary's rescue and rehabilitation work. The tours offer opportunities to observe chimpanzees in large, naturalistic enclosures while maintaining appropriate distances to ensure both human and animal safety.\n\nBeyond its work with chimpanzees, Tacugama is involved in broader conservation initiatives, environmental education, and community development projects. The sanctuary also offers eco-lodges for overnight stays, allowing visitors to experience the rainforest environment and potentially hear the calls of wild chimpanzees in the surrounding forest.",
    image: "/images/location-4.jpg",
    images: [
      "/images/location-4.jpg",
      "/images/tacugama-1.jpg",
      "/images/tacugama-2.jpg",
      "/images/tacugama-3.jpg",
      "/images/tacugama-4.jpg",
    ],
    region: "Western Area",
    activities: ["Wildlife Viewing", "Guided Tours", "Education", "Hiking"],
    highlights: [
      "Chimpanzee Viewing - Observe rescued chimps in naturalistic enclosures",
      "Educational Center - Learn about conservation and rehabilitation efforts",
      "Rainforest Trails - Guided walks in the surrounding protected forest",
      "Eco-Lodges - Overnight accommodation in the sanctuary",
      "Conservation Programs - Learn about ongoing research and protection initiatives",
    ],
    tours: [
      {
        id: "tacugama-day",
        name: "Tacugama Day Visit",
        duration: "Half Day (4 hours)",
        price: 40,
        description:
          "Join a guided tour of the sanctuary to learn about chimpanzees and conservation efforts. Observe chimps during their feeding time.",
        includes: ["Entrance fee", "Guided tour", "Conservation contribution"],
        groupSize: "Up to 15 people",
      },
      {
        id: "tacugama-overnight",
        name: "Tacugama Overnight Experience",
        duration: "2 Days, 1 Night",
        price: 150,
        description:
          "Stay overnight in an eco-lodge within the sanctuary. Includes evening and morning tours, plus hiking in the surrounding forest.",
        includes: ["Accommodation", "Meals", "Guided tours", "Conservation contribution"],
        groupSize: "Up to 8 people",
      },
      {
        id: "tacugama-volunteer",
        name: "Tacugama Volunteer Day",
        duration: "Full Day (8 hours)",
        price: 75,
        description:
          "Spend a day assisting sanctuary staff with non-animal tasks such as food preparation, enrichment making, or maintenance projects.",
        includes: ["Lunch", "Guided tour", "Volunteer activities", "Conservation contribution"],
        groupSize: "Up to 6 people",
      },
    ],
    nearbyAttractions: [
      "Western Area Peninsula National Park - Protected rainforest area",
      "Freetown - Capital city with historical and cultural attractions",
      "Beaches of the Western Peninsula - Including River No. 2 and Tokeh",
    ],
  },
  {
    id: "5",
    name: "Tokeh Beach",
    description: "One of Sierra Leone's most beautiful beaches, with golden sands, clear waters, and luxury resorts.",
    longDescription:
      "Tokeh Beach is widely regarded as one of Sierra Leone's most stunning coastal destinations. Located on the Western Peninsula, approximately 30 kilometers from Freetown, this pristine beach features a long stretch of golden sand, crystal-clear waters, and a backdrop of lush green mountains.\n\nThe beach offers excellent swimming conditions with generally calm waters and gradual depth changes. The surrounding landscape provides a picturesque setting, with dramatic hills covered in tropical vegetation meeting the shoreline. Sunrise and sunset views at Tokeh are particularly spectacular, casting beautiful colors across the Atlantic Ocean.\n\nIn recent years, Tokeh has seen the development of luxury accommodations, including The Place resort, which offers high-end facilities while maintaining the natural beauty of the area. These developments have made Tokeh more accessible to visitors seeking comfort alongside their beach experience.\n\nDespite these developments, parts of Tokeh Beach remain relatively untouched, and the local fishing community continues its traditional practices. Visitors can observe local fishermen bringing in their daily catch or launching their colorful boats into the sea, providing authentic cultural experiences alongside relaxation.",
    image: "/images/location-5.jpg",
    images: [
      "/images/location-5.jpg",
      "/images/tokeh-1.jpg",
      "/images/tokeh-2.jpg",
      "/images/tokeh-3.jpg",
      "/images/tokeh-4.jpg",
    ],
    region: "Western Area",
    activities: ["Swimming", "Sunbathing", "Water Sports", "Dining"],
    highlights: [
      "Golden Sand Beach - Long stretch of pristine coastline",
      "Clear Waters - Excellent for swimming and water activities",
      "Luxury Resorts - High-end accommodation options",
      "Fishing Village - Authentic local culture and fresh seafood",
      "Mountain Backdrop - Beautiful scenery surrounding the beach",
    ],
    tours: [
      {
        id: "tokeh-day",
        name: "Tokeh Beach Day Trip",
        duration: "Full Day (8 hours)",
        price: 85,
        description:
          "Enjoy a day at Tokeh Beach with transportation from Freetown, beach time, and lunch at a beachside restaurant.",
        includes: ["Round-trip transportation", "Beach access", "Lunch", "Bottled water"],
        groupSize: "Up to 12 people",
      },
      {
        id: "tokeh-weekend",
        name: "Tokeh Weekend Getaway",
        duration: "3 Days, 2 Nights",
        price: 350,
        description:
          "Escape to Tokeh Beach for a relaxing weekend stay at a beachfront resort with meals and activities included.",
        includes: ["Transportation from Freetown", "Accommodation", "Meals", "Beach activities"],
        groupSize: "Up to 10 people",
      },
      {
        id: "tokeh-water",
        name: "Tokeh Water Sports Adventure",
        duration: "Full Day (6 hours)",
        price: 120,
        description:
          "Experience the thrill of water sports at Tokeh Beach, including kayaking, paddleboarding, and snorkeling.",
        includes: ["Transportation from Freetown", "Equipment rental", "Instructor", "Lunch", "Bottled water"],
        groupSize: "Up to 8 people",
      },
    ],
    nearbyAttractions: [
      "River No. 2 Beach - Another beautiful beach nearby",
      "Bureh Beach - Popular surfing spot",
      "Western Area Peninsula National Park - Protected rainforest area",
      "Freetown - Capital city with historical and cultural attractions",
    ],
  },
  {
    id: "6",
    name: "Mount Bintumani",
    description:
      "Sierra Leone's highest peak, offering challenging hikes and breathtaking views of the surrounding landscapes.",
    longDescription:
      "Mount Bintumani, also known as Loma Mansa, stands as Sierra Leone's highest peak at 1,945 meters (6,381 feet) above sea level. Located in the Loma Mountains of northeastern Sierra Leone, this majestic mountain is the centerpiece of the Loma Mountains National Park, a protected area of exceptional biodiversity.\n\nThe journey to Mount Bintumani offers adventurous travelers a challenging but rewarding experience. The trek typically takes 2-3 days to complete, passing through diverse ecosystems including montane grasslands, tropical forests, and unique high-altitude vegetation. Along the way, hikers may encounter rare wildlife such as colobus monkeys, duikers, and numerous bird species endemic to the Upper Guinea forests.\n\nReaching the summit rewards climbers with breathtaking panoramic views of Sierra Leone's northern landscapes, stretching for miles in all directions. The mountain's slopes are home to several small villages where traditional ways of life continue largely unchanged, offering cultural insights alongside natural beauty.\n\nThe Loma Mountains region is also culturally significant, with local communities maintaining traditional beliefs about the mountain's spiritual importance. Visitors should approach the area with respect for both the natural environment and cultural heritage.",
    image: "/images/location-6.jpg",
    images: [
      "/images/location-6.jpg",
      "/images/bintumani-1.jpg",
      "/images/bintumani-2.jpg",
      "/images/bintumani-3.jpg",
      "/images/bintumani-4.jpg",
    ],
    region: "Northern Province",
    activities: ["Hiking", "Mountain Climbing", "Photography", "Camping"],
    highlights: [
      "Summit - Sierra Leone's highest point with panoramic views",
      "Loma Mountains National Park - Protected area with diverse ecosystems",
      "Wildlife Viewing - Opportunities to see rare and endemic species",
      "Traditional Villages - Experience authentic rural Sierra Leonean life",
      "Diverse Ecosystems - Trek through multiple habitat types",
    ],
    tours: [
      {
        id: "bintumani-trek",
        name: "Mount Bintumani Trek",
        duration: "5 Days, 4 Nights",
        price: 450,
        description:
          "Complete trek to the summit of Mount Bintumani with experienced guides, porters, and camping equipment.",
        includes: [
          "Transportation from Freetown",
          "Camping equipment",
          "Meals",
          "Professional guides",
          "Porters",
          "Park fees",
        ],
        groupSize: "Up to 8 people",
      },
      {
        id: "bintumani-express",
        name: "Bintumani Express Trek",
        duration: "3 Days, 2 Nights",
        price: 350,
        description: "Faster-paced trek to the summit for experienced hikers with good fitness levels.",
        includes: [
          "Transportation from Kabala",
          "Camping equipment",
          "Meals",
          "Professional guides",
          "Porters",
          "Park fees",
        ],
        groupSize: "Up to 6 people",
      },
      {
        id: "loma-exploration",
        name: "Loma Mountains Exploration",
        duration: "6 Days, 5 Nights",
        price: 550,
        description:
          "Comprehensive exploration of the Loma Mountains region, including Mount Bintumani summit and visits to local villages.",
        includes: [
          "Transportation from Freetown",
          "Accommodation",
          "Meals",
          "Professional guides",
          "Porters",
          "Park fees",
          "Village visits",
        ],
        groupSize: "Up to 8 people",
      },
    ],
    nearbyAttractions: [
      "Kabala - Nearest town with mountain views and cultural experiences",
      "Wara Wara Mountains - Another beautiful mountain range nearby",
      "Traditional Kuranko and Limba villages in the region",
    ],
  },
]
