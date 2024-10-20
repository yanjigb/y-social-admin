import { EAdvertiseStatus, IAdvertise } from "src/types/advertise";
import randomId from "../../utils/random-id";

const now = new Date("2024-06-01T00:00:00Z");

export const mockAds: IAdvertise[] = [
  {
    userID: "user_001",
    title: "Summer Sale on Shoes!",
    description: "Get 30% off on all summer footwear. Limited time offer!",
    media_content: "https://example.com/media/shoes.jpg",
    budget: 100000,
    currency: "VND",
    schedule_start: new Date("2024-06-01T00:00:00Z"),
    schedule_end: new Date("2024-06-30T00:00:00Z"),
    cta: "Shop Now",
    status: EAdvertiseStatus['ACTIVE'],
    goal: {
      goalID: "goal_001",
    },
    adTargetAudience: {
      adID: "ad_001",
      ageRange: "18-35",
      gender: "female",
      location: "Vietnam",
      interest: "Fashion",
    },
    result: [
      {
        date: new Date("2024-06-01T00:00:00Z"),
        impressions: 1000,
        clicks: 150,
        conversions: 30,
        cost: 50000,
        ctr: 10,
      },
    ],
    link_action: "",
    score: 85,
    _id: randomId(),
    createdAt: now,
    updatedAt: now,
  },
  {
    userID: "user_002",
    title: "Gourmet Coffee Subscription",
    description: "Enjoy fresh coffee delivered to your door every month.",
    media_content: "https://example.com/media/coffee.jpg",
    budget: 200000,
    currency: "USD",
    schedule_start: new Date("2024-05-01T00:00:00Z"),
    schedule_end: new Date("2024-08-01T00:00:00Z"),
    cta: "Subscribe Now",
    status: EAdvertiseStatus['ACTIVE'],
    goal: {
      goalID: "goal_002",
    },
    adTargetAudience: {
      adID: "ad_002",
      ageRange: "25-45",
      gender: "all",
      location: "USA",
      interest: "Coffee",
    },
    result: [
      {
        date: new Date("2024-05-01T00:00:00Z"),
        impressions: 2000,
        clicks: 300,
        conversions: 50,
        cost: 80000,
        ctr: 10,
      },
    ],
    link_action: "",
    score: 90,
    _id: randomId(),
    createdAt: now,
    updatedAt: now,
  },
  {
    userID: "user_003",
    title: "Fitness Program for Beginners",
    description: "Join our online fitness program and get fit from home!",
    media_content: "https://example.com/media/fitness.jpg",
    budget: 150000,
    currency: "VND",
    schedule_start: new Date("2024-04-01T00:00:00Z"),
    schedule_end: new Date("2024-04-30T00:00:00Z"),
    cta: "Join Now",
    status: EAdvertiseStatus['ACTIVE'],
    goal: {
      goalID: "goal_003",
    },
    adTargetAudience: {
      adID: "ad_003",
      ageRange: "18-50",
      gender: "male",
      location: "Vietnam",
      interest: "Fitness",
    },
    result: [
      {
        date: new Date("2024-04-01T00:00:00Z"),
        impressions: 500,
        clicks: 50,
        conversions: 10,
        cost: 20000,
        ctr: 10,
      },
    ],
    link_action: "",
    score: 68,
    _id: randomId(),
    createdAt: now,
    updatedAt: now,
  },
  {
    userID: "user_004",
    title: "New Tech Gadget Launch",
    description: "Discover the latest in tech with our new gadget!",
    media_content: "https://example.com/media/gadget.jpg",
    budget: 300000,
    currency: "USD",
    schedule_start: new Date("2024-07-01T00:00:00Z"),
    schedule_end: new Date("2024-07-31T00:00:00Z"),
    cta: "Learn More",
    status: EAdvertiseStatus['DISABLED'],
    goal: {
      goalID: "goal_004",
    },
    adTargetAudience: {
      adID: "ad_004",
      ageRange: "18-40",
      gender: "all",
      location: "Global",
      interest: "Technology",
    },
    result: [
      {
        date: new Date("2024-07-01T00:00:00Z"),
        impressions: 3000,
        clicks: 500,
        conversions: 100,
        cost: 120000,
        ctr: 10,
      },
    ],
    link_action: "",
    score: 95,
    _id: randomId(),
    createdAt: now,
    updatedAt: now,
  },
  {
    userID: "user_005",
    title: "Luxury Watch Collection",
    description: "Explore our exclusive luxury watches collection.",
    media_content: "https://example.com/media/watch.jpg",
    budget: 500000,
    currency: "USD",
    schedule_start: new Date("2024-03-01T00:00:00Z"),
    schedule_end: new Date("2024-03-30T00:00:00Z"),
    cta: "Shop Luxury",
    status: EAdvertiseStatus['ACTIVE'],
    goal: {
      goalID: "goal_005",
    },
    adTargetAudience: {
      adID: "ad_005",
      ageRange: "30-60",
      gender: "male",
      location: "Global",
      interest: "Luxury Goods",
    },
    result: [
      {
        date: new Date("2024-03-01T00:00:00Z"),
        impressions: 1500,
        clicks: 200,
        conversions: 20,
        cost: 90000,
        ctr: 10,
      },
    ],
    link_action: "",
    score: 88,
    _id: randomId(),
    createdAt: now,
    updatedAt: now,
  },
  {
    userID: "user_006",
    title: "Organic Skincare Products",
    description: "Nourish your skin with our range of organic skincare.",
    media_content: "https://example.com/media/skincare.jpg",
    budget: 120000,
    currency: "VND",
    schedule_start: new Date("2024-08-01T00:00:00Z"),
    schedule_end: new Date("2024-09-01T00:00:00Z"),
    cta: "Shop Now",
    status: EAdvertiseStatus['ACTIVE'],
    goal: {
      goalID: "goal_006",
    },
    adTargetAudience: {
      adID: "ad_006",
      ageRange: "20-40",
      gender: "female",
      location: "Vietnam",
      interest: "Beauty",
    },
    result: [
      {
        date: new Date("2024-08-01T00:00:00Z"),
        impressions: 800,
        clicks: 100,
        conversions: 15,
        cost: 40000,
        ctr: 10,
      },
    ],
    link_action: "",
    score: 80,
    _id: randomId(),
    createdAt: now,
    updatedAt: now,
  },
  {
    userID: "user_007",
    title: "Online Course: Digital Marketing",
    description: "Learn the ins and outs of digital marketing from experts.",
    media_content: "https://example.com/media/course.jpg",
    budget: 250000,
    currency: "USD",
    schedule_start: new Date("2024-02-01T00:00:00Z"),
    schedule_end: new Date("2024-05-01T00:00:00Z"),
    cta: "Enroll Now",
    status: EAdvertiseStatus['DISABLED'],
    goal: {
      goalID: "goal_007",
    },
    adTargetAudience: {
      adID: "ad_007",
      ageRange: "18-35",
      gender: "all",
      location: "Global",
      interest: "Education",
    },
    result: [
      {
        date: new Date("2024-02-01T00:00:00Z"),
        impressions: 2000,
        clicks: 250,
        conversions: 30,
        cost: 60000,
        ctr: 10,
      },
    ],
    link_action: "",
    score: 78,
    _id: randomId(),
    createdAt: now,
    updatedAt: now,
  },
  {
    userID: "user_008",
    title: "Pet Supplies Discount",
    description: "Save 20% on all pet supplies this month!",
    media_content: "https://example.com/media/petsupplies.jpg",
    budget: 70000,
    currency: "VND",
    schedule_start: new Date("2024-09-01T00:00:00Z"),
    schedule_end: new Date("2024-09-30T00:00:00Z"),
    cta: "Shop Now",
    status: EAdvertiseStatus['ACTIVE'],
    goal: {
      goalID: "goal_008",
    },
    adTargetAudience: {
      adID: "ad_008",
      ageRange: "25-55",
      gender: "all",
      location: "Vietnam",
      interest: "Pets",
    },
    result: [
      {
        date: new Date("2024-09-01T00:00:00Z"),
        impressions: 1500,
        clicks: 200,
        conversions: 40,
        cost: 30000,
        ctr: 10,
      },
    ],
    link_action: "",
    score: 82,
    _id: randomId(),
    createdAt: now,
    updatedAt: now,
  },
  {
    userID: "user_009",
    title: "Home Decor Essentials",
    description: "Revamp your space with our exclusive home decor items.",
    media_content: "https://example.com/media/homedecor.jpg",
    budget: 180000,
    currency: "USD",
    schedule_start: new Date("2024-10-01T00:00:00Z"),
    schedule_end: new Date("2024-10-31T00:00:00Z"),
    cta: "Discover More",
    status: EAdvertiseStatus['ACTIVE'],
    goal: {
      goalID: "goal_009",
    },
    adTargetAudience: {
      adID: "ad_009",
      ageRange: "20-50",
      gender: "all",
      location: "USA",
      interest: "Home Improvement",
    },
    result: [
      {
        date: new Date("2024-10-01T00:00:00Z"),
        impressions: 1000,
        clicks: 150,
        conversions: 25,
        cost: 70000,
        ctr: 10,
      },
    ],
    link_action: "",
    score: 87,
    _id: randomId(),
    createdAt: now,
    updatedAt: now,
  },
  {
    userID: "user_010",
    title: "Travel Package to Bali",
    description:
      "Experience the beauty of Bali with our exclusive travel package.",
    media_content: "https://example.com/media/travel.jpg",
    budget: 350000,
    currency: "USD",
    schedule_start: new Date("2024-11-01T00:00:00Z"),
    schedule_end: new Date("2024-11-30T00:00:00Z"),
    cta: "Book Now",
    status: EAdvertiseStatus['ACTIVE'],
    goal: {
      goalID: "goal_010",
    },
    adTargetAudience: {
      adID: "ad_010",
      ageRange: "25-60",
      gender: "all",
      location: "Global",
      interest: "Travel",
    },
    result: [
      {
        date: new Date("2024-11-01T00:00:00Z"),
        impressions: 2000,
        clicks: 300,
        conversions: 50,
        cost: 100000,
        ctr: 10,
      },
    ],
    link_action: "",
    score: 92,
    _id: randomId(),
    createdAt: now,
    updatedAt: now,
  },
];
