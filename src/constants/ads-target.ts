import { IAdsTarget } from "src/types/advertise";

const AdsTargetKey = {
  ENGAGEMENT: "ENGAGEMENT",
  AWARENESS: "AWARENESS",
};

export const AdsCTAList = [
  "Learn More",
  "Get Started",
  "Contact Us",
  "Buy Now",
];

export const AdsRate = {
  AUDIENCE_SIZE: import.meta.env.VITE_ADS_AUDIENCE_SIZE,
  ENGAGEMENT_RATE: import.meta.env.VITE_ADS_ENGAGEMENT_RATE,
};

export const AdsTargetList: IAdsTarget[] = [
  {
    key: AdsTargetKey.AWARENESS,
    title: "Awareness",
    description:
      "Show your ads to people who are most likely to remember them.",
    pros: [
      {
        title: "Reach",
        description:
          "Reach the maximum number of people who may be interested in your brand.",
      },
      {
        title: "Brand awareness",
        description: "Reach people who are more likely to watch your video.",
      },
      {
        title: "Video views",
        description: "Reach people who are more likely to watch your video.",
      },
      {
        title: "Store location awareness",
        description:
          "Reach people using the physical location for your business, organization or set of stores. ",
      },
    ],
  },
  {
    key: AdsTargetKey.ENGAGEMENT,
    title: "Engagement",
    description:
      "Get more messages, purchases through messaging, video views, post engagement, Page likes, or event responses.",
    pros: [
      {
        title: "Post engagement",
        description: "Get people to interact with your posts.",
      },
      {
        title: "Calls",
        description:
          "Get people who may be interested in your business to call you.",
      },
      {
        title: "Messages",
        description:
          "Encourage people to start a conversation with you or initiate a purchase through messaging apps.",
      },
    ],
  },
];
