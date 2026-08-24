export interface GymClass {
  id: string;
  name: string;
  description: string;
  schedule: string;
  image: string;
}

// Placeholder class list and Unsplash stand-in photos. Replace with real class info/photos.
export const gymClasses: GymClass[] = [
  {
    id: "zumba",
    name: "Zumba",
    description: "High-energy dance cardio set to Latin & pop rhythms.",
    schedule: "Mon, Wed, Fri · 6:00 PM",
    image:
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "yoga",
    name: "Yoga",
    description: "Improve flexibility, breathing, and mental focus.",
    schedule: "Daily · 7:00 AM",
    image:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "crossfit",
    name: "CrossFit",
    description: "Functional, high-intensity workouts in a group setting.",
    schedule: "Tue, Thu, Sat · 6:30 AM",
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "personal-training",
    name: "Personal Training",
    description: "One-on-one coaching tailored to your specific goals.",
    schedule: "By appointment",
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "diet-consultation",
    name: "Diet Consultation",
    description: "Personalized nutrition plans from certified dietitians.",
    schedule: "By appointment",
    image:
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=1200&auto=format&fit=crop",
  },
];
