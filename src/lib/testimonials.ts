export interface Testimonial {
  id: string;
  name: string;
  result: string;
  quote: string;
  beforePhoto: string;
  afterPhoto: string;
}

// Placeholder member stories and Unsplash stand-in photos. Replace with real member content.
export const testimonials: Testimonial[] = [
  {
    id: "vikram-singh",
    name: "Vikram Singh",
    result: "Lost 14 kg in 6 months",
    quote:
      "The trainers pushed me every session and the diet plan actually fit my lifestyle. Best decision I've made for my health.",
    beforePhoto:
      "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=800&auto=format&fit=crop",
    afterPhoto:
      "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "ananya-desai",
    name: "Ananya Desai",
    result: "Gained strength & confidence",
    quote:
      "I walked in barely able to do a push-up. Six months later I'm deadlifting my own bodyweight. This place changed my mindset.",
    beforePhoto:
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800&auto=format&fit=crop",
    afterPhoto:
      "https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "karan-malhotra",
    name: "Karan Malhotra",
    result: "Dropped 20% body fat",
    quote:
      "Between the CrossFit classes and personal training, I finally found a routine I actually look forward to.",
    beforePhoto:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=800&auto=format&fit=crop",
    afterPhoto:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=800&auto=format&fit=crop",
  },
];
