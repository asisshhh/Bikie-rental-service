
export interface Testimonial {
  id: string;
  name: string;
  image?: string;
  rating: number;
  comment: string;
  vehicle: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Asish nayak",
    rating: 5,
    comment: "The Hyundai Verna was amazing! Clean and easy to drive. Will definitely rent again!",
    vehicle: "Hyundai Verna"
  },
  {
    id: "2",
    name: "Khusi Singh",
    rating: 4,
    comment: "I rented the Activa 125 for a weekend trip. Great condition and perfect for the roads I wanted to explore.",
    vehicle: "Activa 125"
  },
  {
    id: "3",
    name: "Sriram nayak",
    rating: 5,
    comment: "The booking process was so simple, and the Dominor 400 was spotless and ran perfectly. Excellent service!",
    vehicle: "Dominor 400"
  }
];
