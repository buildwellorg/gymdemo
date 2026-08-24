export interface Equipment {
  id: string;
  name: string;
  description: string;
  image: string;
}

// Placeholder equipment list and Unsplash stand-in photos. Replace with real gym photos.
export const basicEquipment: Equipment[] = [
  {
    id: "treadmills",
    name: "Treadmills",
    description: "Cardio zone with 10+ treadmills",
    image:
      "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "free-weights",
    name: "Free Weights",
    description: "Dumbbells from 1kg to 50kg",
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "strength-machines",
    name: "Strength Machines",
    description: "Full range of cable & pin-loaded machines",
    image:
      "https://images.unsplash.com/photo-1584735175315-9d5df23860e6?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "squat-racks",
    name: "Squat Racks",
    description: "Dedicated power racks for compound lifts",
    image:
      "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "functional-zone",
    name: "Functional Zone",
    description: "Kettlebells, battle ropes, TRX & more",
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "stretch-area",
    name: "Stretch Area",
    description: "Dedicated mobility & recovery space",
    image:
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1200&auto=format&fit=crop",
  },
];

export const advancedEquipment: Equipment[] = [
  {
    id: "smith-machine",
    name: "Smith Machine",
    description: "Guided-bar strength training for safe heavy lifts",
    image:
      "https://images.unsplash.com/photo-1517344368193-41552b6ad3f5?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "assault-airbike",
    name: "Assault AirBike",
    description: "High-intensity conditioning for elite cardio training",
    image:
      "https://images.unsplash.com/photo-1591741535018-d042766c62eb?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "functional-trainer-rig",
    name: "Functional Trainer Rig",
    description: "Multi-station cable rig for full-body functional work",
    image:
      "https://images.unsplash.com/photo-1554284126-aa88f22d8b74?q=80&w=1600&auto=format&fit=crop",
  },
];
