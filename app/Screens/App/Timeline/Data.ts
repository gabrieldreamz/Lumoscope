import { ImageRequireSource } from "react-native/types";

export interface NewsPath {
  image: ImageRequireSource;
  heading: string;
  subtitle: string;
}

export const images = {
  "onboarding-1": require("./timeline.png"),
  "onboarding-2": require("./timeline.png"),
  "onboarding-3": require("./timeline.png"),
};

export const NewsPaths: NewsPath[] = [
  {
    image: images["onboarding-1"],
    heading: "City Council Approves New Green Space Initiative",
    subtitle:
      "In a unanimous decision, the city council voted to allocate funds towards the creation of new green spaces in urban areas. The initiative aims to enhance public health and well-being",
  },
  {
    heading: "City Council Approves New Green Space Initiative",
    image: images["onboarding-2"],
    subtitle:
      "In a unanimous decision, the city council voted to allocate funds towards the creation of new green spaces in urban areas. The initiative aims to enhance public health and well-being",
  },
  {
    heading: "Traffic Situation in Alagbaka",
    subtitle:
      "In a unanimous decision, the city council voted to allocate funds towards the creation of new green spaces in urban areas. The initiative aims to enhance public health and well-being",
    image: images["onboarding-3"],
  },
];
