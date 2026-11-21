/**
 * keralam.eat — "order direct" platform
 * Kitchen data. Every kitchen handles its own delivery and keeps all the money.
 *
 * ⚠️ DEMO DATA — the seven kitchens below are placeholders.
 * Real kitchens replace them: add your entry, open a pull request.
 *
 * Schema:
 *   slug       — url id, shows as keralam.eat/<slug>
 *   name       — kitchen name
 *   area, city — where it cooks
 *   lat, lng   — approximate location (for "kitchens near me")
 *   cuisine    — one line of what kind of food
 *   tagline    — one sentence in the kitchen's own voice
 *   hours      — opening hours (local time)
 *   open       — open right now? (real version: managed by the kitchen)
 *   whatsapp   — WhatsApp number, country code first, digits only
 *   delivery   — fee in ₹, radius it delivers itself (km), honest ETA
 *   menu       — categories of { name, mal?, desc, price, veg }
 *                mal — the dish's name in Malayalam script, optional
 */
window.RESTAURANTS = [
  {
    slug: "ammas-kitchen",
    name: "Amma's Kitchen",
    area: "Beach Road",
    city: "Kozhikode",
    lat: 11.2588, lng: 75.7804,
    cuisine: "Malabar home food",
    tagline: "Fish moilee on Sundays, and the week's other good decisions.",
    hours: "11:00 – 22:30",
    open: true,
    whatsapp: "919800000001",
    delivery: { fee: 30, radiusKm: 4, eta: "30–40 min" },
    menu: [
      {
        category: "Meals & rice",
        items: [
          { name: "Fish moilee", mal: "മീൻ മോളി", desc: "Seer fish in turmeric coconut milk, rested overnight opinion.", price: 180, veg: false },
          { name: "Kozhikode biryani", mal: "കോഴിക്കോട് ബിരിയാണി", desc: "Jeerakasala rice, chicken, sealed and dum-cooked.", price: 160, veg: false },
          { name: "Rice meals", mal: "ചോറ്", desc: "Matta rice, sambar, thoran, pickle, pappadam.", price: 90, veg: true },
          { name: "Appam (2)", mal: "അപ്പം", desc: "Lacy edges, soft centre, fermented overnight.", price: 40, veg: true }
        ]
      },
      {
        category: "Sweets",
        items: [
          { name: "Palada payasam", mal: "പാലട പായസം", desc: "An hour of stirring. The colour is the proof.", price: 60, veg: true }
        ]
      }
    ]
  },
  {
    slug: "thattu-kada-7",
    name: "Thattu Kada No. 7",
    area: "Vyttila Junction",
    city: "Kochi",
    lat: 9.9678, lng: 76.3194,
    cuisine: "Street food",
    tagline: "One wok, one flame, and a queue from six in the evening.",
    hours: "17:30 – 00:30",
    open: true,
    whatsapp: "919800000002",
    delivery: { fee: 20, radiusKm: 3, eta: "20–30 min" },
    menu: [
      {
        category: "From the wok",
        items: [
          { name: "Kappa & meen curry", mal: "കപ്പയും മീൻകറിയും", desc: "Tapioca and fiery fish curry, the correct pairing.", price: 120, veg: false },
          { name: "Beef ularthiyathu", mal: "ബീഫ് ഉലത്തിയത്", desc: "Fried dry with coconut slivers and too many curry leaves.", price: 160, veg: false },
          { name: "Parotta (2)", mal: "പൊറോട്ട", desc: "Flaked, layered, and regrettable only in the morning.", price: 30, veg: true },
          { name: "Egg roast", mal: "മുട്ട റോസ്റ്റ്", desc: "Three eggs in a dark masala that clings.", price: 80, veg: false },
          { name: "Kaya mezhukkupuratti", mal: "കായ മെഴുക്കപ്പുരട്ടി", desc: "Plantain fried till the edges catch.", price: 60, veg: true }
        ]
      }
    ]
  },
  {
    slug: "kaapi-dosa-co",
    name: "Kaapi & Dosa Co.",
    area: "Panampilly Nagar",
    city: "Kochi",
    lat: 9.9569, lng: 76.2969,
    cuisine: "Dosa & coffee bar",
    tagline: "Dosas crisp enough to hear, and kaapi that needs no introduction.",
    hours: "07:00 – 22:00",
    open: true,
    whatsapp: "919800000006",
    delivery: { fee: 25, radiusKm: 3, eta: "25–35 min" },
    menu: [
      {
        category: "From the tawa & the filter",
        items: [
          { name: "Ghee roast dosa", mal: "നെയ് റോസ്റ്റ് ദോശ", desc: "Paper-crisp, ghee all the way to the edges.", price: 70, veg: true },
          { name: "Masala dosa", mal: "മസാല ദോശ", desc: "The classic, folded like it should be.", price: 80, veg: true },
          { name: "Egg podi dosa", mal: "മുട്ട ദോശ", desc: "Dosa rolled around egg and gunpowder.", price: 95, veg: false },
          { name: "Vada (2)", mal: "വട", desc: "Crisp outside, weather-cloud inside.", price: 20, veg: true },
          { name: "Filter kaapi", mal: "കാപ്പി", desc: "Steel tumbler, foam on top, no substitutes.", price: 15, veg: true }
        ]
      }
    ]
  },
  {
    slug: "chakara",
    name: "Chakara",
    area: "Mattancherry",
    city: "Kochi",
    lat: 9.9657, lng: 76.2433,
    cuisine: "Fish & tapioca",
    tagline: "The boats come in at five; the frying starts at six.",
    hours: "16:00 – 23:30",
    open: true,
    whatsapp: "919800000007",
    delivery: { fee: 40, radiusKm: 5, eta: "35–45 min" },
    menu: [
      {
        category: "From the boats",
        items: [
          { name: "Neymeen fry", mal: "നെയ്മീൻ പൊരി", desc: "Kingfish in masala and hot coconut oil.", price: 240, veg: false },
          { name: "Kappa & meen curry", mal: "കപ്പയും മീൻകറിയും", desc: "Tapioca, and a curry that came off a boat this morning.", price: 140, veg: false },
          { name: "Shappu-style beef curry", mal: "ഷാപ്പ് ബീഫ് കറി", desc: "Dark, hot, cooked like the toddy shops do it.", price: 160, veg: false },
          { name: "Meen pollichathu (tilapia)", mal: "മീൻ പൊള്ളിച്ചത്", desc: "In banana leaf, grilled till the leaf scorches.", price: 180, veg: false }
        ]
      }
    ]
  },
  {
    slug: "sadya-garden",
    name: "Sadya Garden",
    area: "Round East",
    city: "Thrissur",
    lat: 10.5220, lng: 76.2130,
    cuisine: "Sadya & vegetarian",
    tagline: "Twenty-six positions on a banana leaf, and a queue that starts at noon.",
    hours: "12:00 – 15:00",
    open: false,
    whatsapp: "919800000003",
    delivery: { fee: 40, radiusKm: 6, eta: "45–55 min" },
    menu: [
      {
        category: "On the leaf",
        items: [
          { name: "Full Sadya", mal: "സദ്യ", desc: "The whole twenty-six, parippu and ghee to pazham.", price: 250, veg: true },
          { name: "Onam Sadya", mal: "ഓണസദ്യ", desc: "The same leaf, plus four payasams and no excuses.", price: 300, veg: true },
          { name: "Avial", mal: "അവിയൽ", desc: "Every vegetable at once, held together by coconut.", price: 80, veg: true },
          { name: "Thoran", mal: "തോരൻ", desc: "Today's vegetable. Ask what today is.", price: 60, veg: true },
          { name: "Ada pradhaman", mal: "അടപ്രഥമൻ", desc: "Ada, jaggery and coconut milk, in the middle of the meal where it belongs.", price: 70, veg: true }
        ]
      }
    ]
  },
  {
    slug: "puttu-and-co",
    name: "Puttu & Co.",
    area: "KK Road",
    city: "Kottayam",
    lat: 9.5940, lng: 76.5215,
    cuisine: "Breakfast",
    tagline: "The first shop awake, and it shows in the kadala.",
    hours: "05:30 – 11:00",
    open: true,
    whatsapp: "919800000004",
    delivery: { fee: 20, radiusKm: 3, eta: "25–35 min" },
    menu: [
      {
        category: "Morning",
        items: [
          { name: "Puttu & kadala", mal: "പുട്ടും കടലയും", desc: "Rice log, coconut layers, black chana in dark masala.", price: 60, veg: true },
          { name: "Appam & stew", mal: "അപ്പവും സ്റ്റൂവും", desc: "The stew has cardamom in it. You will taste it.", price: 75, veg: true },
          { name: "Idiyappam & egg curry", mal: "ഇടിയപ്പവും മുട്ടക്കറിയും", desc: "String hoppers, eggs, and a curry that means it.", price: 85, veg: false },
          { name: "Kaya mezhukkupuratti", mal: "കായ മെഴുക്കപ്പുരട്ടി", desc: "Plantain fried with shallots and coconut slivers.", price: 50, veg: true },
          { name: "Chaya", mal: "ചായ", desc: "Strong, sweet, and the reason anyone is civilised before eight.", price: 10, veg: true }
        ]
      }
    ]
  },
  {
    slug: "karimeen-house",
    name: "Karimeen House",
    area: "Punnamada",
    city: "Alappuzha",
    lat: 9.4936, lng: 76.3402,
    cuisine: "Backwater fish",
    tagline: "The fish has a shorter journey than your order does.",
    hours: "12:00 – 22:00",
    open: true,
    whatsapp: "919800000005",
    delivery: { fee: 50, radiusKm: 8, eta: "40–50 min" },
    menu: [
      {
        category: "From the water",
        items: [
          { name: "Karimeen pollichathu", mal: "കരിമീൻ പൊള്ളിച്ചത്", desc: "Pearl spot in banana leaf, grilled till the leaf scorches.", price: 320, veg: false },
          { name: "Neymeen fry", mal: "നെയ്മീൻ പൊരി", desc: "Seer fish, masala, and hot coconut oil. No further description needed.", price: 240, veg: false },
          { name: "Fish moilee", mal: "മീൻ മോളി", desc: "The gentle one, for people who ordered the fry last time.", price: 200, veg: false },
          { name: "Fish curry meals", mal: "മീൻകറി", desc: "Matta rice and a curry that improves on the way to your door.", price: 130, veg: false }
        ]
      }
    ]
  }
];
