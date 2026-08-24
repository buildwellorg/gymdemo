export interface Trainer {
  id: string;
  name: string;
  certification: string;
  specialty: string;
  photo: string;
}

// Placeholder trainer profiles and Unsplash stand-in photos. Replace with real staff.
export const trainers: Trainer[] = [
  {
    id: "arjun-mehta",
    name: "Arjun Mehta",
    certification: "Certified Strength & Conditioning Specialist (CSCS)",
    specialty: "Powerlifting & Strength Training",
    photo:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "priya-nair",
    name: "Priya Nair",
    certification: "RYT-500 Certified Yoga Instructor",
    specialty: "Yoga & Mobility",
    photo:
      "https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "rohan-kapoor",
    name: "Rohan Kapoor",
    certification: "ACE Certified Personal Trainer",
    specialty: "Weight Loss & Functional Fitness",
    photo:
      "https://images.unsplash.com/photo-1583468982228-19f19164aee2?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "sneha-iyer",
    name: "Sneha Iyer",
    certification: "Registered Dietitian (RD)",
    specialty: "Sports Nutrition & Diet Planning",
    photo:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800&auto=format&fit=crop",
  },
];
