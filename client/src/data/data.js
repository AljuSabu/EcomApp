//Price filter for sorting
export const price = [
  {
    _id: 0,
    range: "0 to 1999",
    arr: [0, 1999],
  },
  {
    _id: 1,
    range: "2000 to 3999",
    arr: [2000, 3999],
  },
  {
    _id: 2,
    range: "4000 to 5999",
    arr: [4000, 5999],
  },
  {
    _id: 3,
    range: "6000 to 7999",
    arr: [6000, 7999],
  },
  {
    _id: 4,
    range: "8000 to 9999",
    arr: [8000, 9999],
  },
];

//Shared perks shown on the product detail page
export const productPerks = [
  {
    id: "shipping",
    icon: "truck",
    title: "Free shipping over ₹5,000",
    desc: "Flat ₹50 on smaller orders",
  },
  {
    id: "returns",
    icon: "returns",
    title: "7-day easy returns",
    desc: "Unused items, original packaging",
  },
  {
    id: "secure",
    icon: "shield",
    title: "Secure checkout",
    desc: "Payments protected by Razorpay",
  },
];

//Content for the product detail page
export const productInfo = [
  {
    id: "details",
    title: "Product Details",
    points: [
      "Designed and finished in small batches",
      "Made with natural, responsibly sourced materials",
      "Each piece is quality-checked before dispatch",
      "Colours may vary slightly between screens",
    ],
  },
  {
    id: "shipping",
    title: "Shipping & Delivery",
    points: [
      "Free shipping on orders above ₹5,000",
      "Flat ₹50 shipping on orders below ₹5,000",
      "Orders are dispatched within 1–2 business days",
      "Delivery in 3–5 business days across India",
    ],
  },
  {
    id: "returns",
    title: "Returns & Exchanges",
    points: [
      "Returns accepted within 7 days of delivery",
      "Items must be unused and in original packaging",
      "Refunds go to your original payment method within 5–7 business days",
      "Contact support to start a return",
    ],
  },
  {
    id: "care",
    title: "Care Instructions",
    points: [
      "Follow the care label on the product",
      "Avoid prolonged exposure to direct sunlight and moisture",
      "Clean gently with a soft, dry cloth where possible",
      "Store in a cool, dry place when not in use",
    ],
  },
];

//Dummy data for the order page
export const userOrder = [
  {
    id: "ORD-10933",
    orderNumber: "ORD-10933",
    date: "May 28, 2026",
    status: "Processing",
    paymentMethod: "Credit Card (Visa •••• 4242)",
    paymentId: "PAY-77213LZ8",
    shippingAddress: "742 Evergreen Terrace, Apt 4B, San Francisco, CA 94102",
    subtotal: 150.0,
    shipping: 50.0,
    tax: 12.0,
    total: 212.0,
    trackingNumber: null,
    carrier: null,
    estimatedDelivery: "June 02, 2026",
    items: [
      {
        id: 6,
        name: "Silver Cuff",
        price: "₹150",
        priceValue: 150,
        image: "https://picsum.photos/seed/cuff/800/1000",
        quantity: 1,
        selectedSize: "Adjustable",
      },
    ],
  },
  {
    id: "ORD-98421",
    orderNumber: "ORD-98421",
    date: "May 16, 2026",
    status: "In Transit",
    paymentMethod: "Credit Card (Visa •••• 4242)",
    paymentId: "PAY-89234XN9",
    shippingAddress: "742 Evergreen Terrace, Apt 4B, San Francisco, CA 94102",
    subtotal: 620.0,
    shipping: 0.0,
    tax: 49.6,
    total: 669.6,
    trackingNumber: "LX-883920194US",
    carrier: "FedEx Express Priority",
    estimatedDelivery: "May 20, 2026",
    items: [
      {
        id: 1,
        name: "Minimalist Watch",
        price: "₹240",
        priceValue: 240,
        image: "https://picsum.photos/seed/watch/800/1000",
        quantity: 1,
        selectedSize: "One Size",
      },
      {
        id: 2,
        name: "Leather Tote",
        price: "₹380",
        priceValue: 380,
        image: "https://picsum.photos/seed/bag/800/1000",
        quantity: 1,
        selectedSize: "Standard",
      },
    ],
  },
  {
    id: "ORD-76192",
    orderNumber: "ORD-76192",
    date: "April 28, 2026",
    status: "Delivered",
    paymentMethod: "Apple Pay",
    paymentId: "PAY-41982QM3",
    shippingAddress: "742 Evergreen Terrace, Apt 4B, San Francisco, CA 94102",
    subtotal: 120.0,
    shipping: 0.0,
    tax: 9.6,
    total: 129.6,
    trackingNumber: "LX-441209581US",
    carrier: "DHL Luxury Express",
    estimatedDelivery: "May 02, 2026",
    items: [
      {
        id: 4,
        name: "Cotton Shirt",
        price: "₹120",
        priceValue: 120,
        image: "https://picsum.photos/seed/shirt/800/1000",
        quantity: 1,
        selectedSize: "M",
      },
    ],
  },
  {
    id: "ORD-54810",
    orderNumber: "ORD-54810",
    date: "March 15, 2026",
    status: "Delivered",
    paymentMethod: "Credit Card (Mastercard •••• 8812)",
    paymentId: "PAY-11983KK2",
    shippingAddress: "742 Evergreen Terrace, Apt 4B, San Francisco, CA 94102",
    subtotal: 235.0,
    shipping: 0.0,
    tax: 18.8,
    total: 253.8,
    trackingNumber: "LX-110948293US",
    carrier: "UPS Standard",
    estimatedDelivery: "March 19, 2026",
    items: [
      {
        id: 3,
        name: "Ceramic Vase",
        price: "₹85",
        priceValue: 85,
        image: "https://picsum.photos/seed/vase/800/1000",
        quantity: 1,
        selectedSize: "Standard",
      },
      {
        id: 6,
        name: "Silver Cuff",
        price: "₹150",
        priceValue: 150,
        image: "https://picsum.photos/seed/cuff/800/1000",
        quantity: 1,
        selectedSize: "Adjustable",
      },
    ],
  },
];
