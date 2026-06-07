import { Camera, Heart, Building2, Award, Home } from "lucide-react";

export const BRAND = {
  name: "DJAY",
  full: "Djay Photography",
  by: "by Djeha",
  phone: "+27 71 677 3919",
  phoneHref: "tel:+27716773919",
  whatsapp: "https://wa.me/27716773919",
  email: "info@djeha.co.za",
  address: "6 Carey Street, Wynberg, Johannesburg, 2000",
  mapsHref: "https://maps.google.com/?q=6+Carey+Street+Wynberg+Johannesburg",
  tagline: "Grace and Precision",
};

export type CategoryKey =
  | "weddings"
  | "graduations"
  | "portraits"
  | "prom"
  | "corporate"
  | "real-estate";

export type Category = {
  key: CategoryKey;
  slug: string;
  label: string;
  tagline: string;
  description: string;
  hero: string;
  thumb: string;
  gallery: string[];
  stackPhotos?: string[];
};

export const CATEGORIES: Category[] = [
{
    key: "weddings",
    slug: "/weddings",
    label: "Weddings",
    tagline: "Vows, tears, first dances.",
    description:
      "Your wedding day is the most important day of your life. We capture every whispered vow, every joyful tear, every first dance with the grace it deserves.",
    hero: "/images/Weddings/IMG_1897-Edit-2.jpg",
    thumb: "/images/Weddings/IMG_1255-Edit.jpg",
    stackPhotos: [
      "/images/Weddings/IMG_3453.JPG",
      "/images/Weddings/IMG_3455.JPG",
      "/images/Weddings/IMG_3457.JPG",
      "/images/Weddings/IMG_3459.JPG",
      "/images/Weddings/IMG_3461.JPG",
    ],
    gallery: [
      
      "/images/Weddings/IMG_3454.JPG",
      "/images/Weddings/IMG_3456.JPG",
      "/images/Weddings/IMG_1627-Edit.jpg",
      "/images/Weddings/IMG_3461.JPG",
      "/images/Weddings/IMG_3463.JPG",
      "/images/Weddings/IMG_1255-Edit.jpg",

    ],
  },
 
{
    key: "graduations",
    slug: "/graduations",
    label: "Graduations",
    tagline: "Pride, achievement, milestones.",
    description:
      "Years of dedication and sacrifice, finally celebrated. Let us capture the pride, the joy, and the achievement of your graduation day.",
    hero: "https://images.unsplash.com/photo-1627556704302-624286467c65?w=1920&q=85",
    thumb: "/images/Graduation/IMG_3416.JPG",
    stackPhotos: [
      "/images/Graduation/IMG_3416.JPG",
      "/images/Graduation/DJAY9788.jpg",
      "/images/Graduation/IMG_3419.jpg",
      "/images/Graduation/IMG_3420.jpg",
      "/images/Graduation/IMG_3421.jpg",
    ],
    gallery: [
      "/images/Graduation/DJAY9788.jpg",
      "/images/Graduation/IMG_3419.jpg",
      "/images/Graduation/IMG_3416.JPG",
      "/images/Graduation/IMG_3422.jpg",
      "/images/Graduation/IMG_3417.JPG",
      "/images/Graduation/IMG_3418.JPG",
      "/images/Graduation/IMG_3420.jpg",
      "/images/Graduation/IMG_3421.jpg",
      "/images/Graduation/DJAY9736.jpg",
    ],
  },
{
    key: "prom",
    slug: "/prom",
    label: "Prom",
    tagline: "Glamour, once in a lifetime.",
    description:
      "Matric dance is a once-in-a-lifetime evening of glamour, excitement, and memory-making. We'll preserve every stunning detail.",
    hero: "/images/Matric/IMG_3467.JPG",
    thumb: "/images/Matric/IMG_3467.JPG",
    stackPhotos: [
      "/images/Matric/IMG_3467.JPG",
      "/images/Matric/IMG_3468.JPG",
      "/images/Matric/IMG_3469.JPG",
      "/images/Matric/IMG_3471.JPG",
      "/images/Matric/IMG_3472.JPG",
    ],
    gallery: [
      "/images/Matric/IMG_3467.JPG",
      "/images/Matric/IMG_3468.JPG",
      "/images/Matric/IMG_3469.JPG",
      "/images/Matric/IMG_3471.JPG",
      "/images/Matric/IMG_3472.JPG",
      "/images/Matric/IMG_3474.JPG",
      "/images/Matric/IMG_3475.JPG",
      "/images/Matric/IMG_3477.JPG",
      "/images/Matric/IMG_3478.JPG",
      "/images/Matric/IMG_3479.JPG",
      "/images/Matric/IMG_3481.JPG",
      "/images/Matric/IMG_3482.JPG",
      "/images/Matric/IMG_3483.JPG",
    ],
  },

  {
    key: "portraits",
    slug: "/portraits",
    label: "Portraits",
    tagline: "Essence revealed in light.",
    description:
      "A great portrait reveals more than just your face — it captures your essence, your story, your soul. We create portraits that feel timeless.",
    hero: "/images/Portraits/IMG_3516.JPG",
    thumb: "/images/Portraits/IMG_3511.JPG",
    stackPhotos: [
      "/images/Portraits/IMG_3511.JPG",
      "/images/Portraits/IMG_3512.JPG",
      "/images/Portraits/IMG_3513.JPG",
      "/images/Portraits/IMG_3514.JPG",
      "/images/Portraits/IMG_3515.JPG",
    ],
    gallery: [
      "/images/Portraits/IMG_3511.JPG",
      "/images/Portraits/IMG_3512.JPG",
      "/images/Portraits/IMG_3513.JPG",
      "/images/Portraits/IMG_3514.JPG",
      "/images/Portraits/IMG_3515.JPG",
      "/images/Portraits/IMG_3516.JPG",
      "/images/Portraits/IMG_3517.JPG",
      "/images/Portraits/IMG_3518.jpg",
      "/images/Portraits/IMG_3519.jpg",
      "/images/Portraits/IMG_3520.jpg",
      "/images/Portraits/IMG_3521.JPG",
      "/images/Portraits/IMG_3522.JPG",
      "/images/Portraits/IMG_3523.JPG",
      "/images/Portraits/IMG_3524.JPG",
      "/images/Portraits/IMG_3525.JPG",
      "/images/Portraits/IMG_3526.JPG",
      "/images/Portraits/IMG_3527.JPG",
      "/images/Portraits/IMG_3528.JPG",
      "/images/Portraits/IMG_3529.JPG",
    ],
  },
{
    key: "corporate",
    slug: "/corporate",
    label: "Corporate",
    tagline: "Imagery that commands respect.",
    description:
      "From annual galas to product launches, we bring professional polish to every corporate occasion. Imagery that commands respect.",
    hero: "/images/Corporate/SIM_4806.jpg",
    thumb: "/images/Corporate/3S2A8772.jpg",
    stackPhotos: [
      "/images/Corporate/IMG_3488.JPG",
      "/images/Corporate/IMG_3490.JPG",
      "/images/Corporate/IMG_3492.JPG",
      "/images/Corporate/IMG_3494.JPG",
      "/images/Corporate/IMG_3496.JPG",
    ],
    gallery: [
      "/images/Corporate/IMG_3488.JPG",
      "/images/Corporate/IMG_3495.JPG",
      "/images/Corporate/IMG_3490.JPG",
      "/images/Corporate/IMG_3491.JPG",
      "/images/Corporate/IMG_3492.JPG",
      "/images/Corporate/IMG_3493.JPG",
      "/images/Corporate/IMG_3494.JPG",
      "/images/Corporate/IMG_3495.JPG",
      "/images/Corporate/IMG_3496.JPG",
      "/images/Corporate/IMG_3497.JPG",
      "/images/Corporate/IMG_3498.JPG",
      "/images/Corporate/IMG_3499.JPG",
      "/images/Corporate/IMG_3500.JPG",
      "/images/Corporate/IMG_3501.JPG",
      "/images/Corporate/IMG_3502.JPG",
      "/images/Corporate/IMG_3503.JPG",
      "/images/Corporate/IMG_3504.JPG",
      "/images/Corporate/IMG_3505.JPG",
    ],
  },
{
    key: "real-estate",
    slug: "/real-estate",
    label: "Real Estate",
    tagline: "Spaces at their absolute finest.",
    description:
      "Properties that photograph beautifully sell faster and for more. Our architectural photography presents every space at its absolute finest.",
    hero: "/images/RealEstate/IMG_9325-HDR.jpg",
    thumb: "/images/RealEstate/IMG_9413-HDR.jpg",
    stackPhotos: [
      "/images/RealEstate/IMG_3533.JPG",
      "/images/RealEstate/IMG_3536.JPG",
      "/images/RealEstate/IMG_3535.JPG",
      "/images/RealEstate/IMG_3536.JPG",
      "/images/RealEstate/IMG_3537.JPG",
    ],
    gallery: [
      "/images/RealEstate/IMG_3533.JPG",
      "/images/RealEstate/IMG_3534.JPG",
      "/images/RealEstate/IMG_3535.JPG",
      "/images/RealEstate/IMG_3536.JPG",
      "/images/RealEstate/IMG_3537.JPG",
      "/images/RealEstate/IMG_3538.JPG",
      "/images/RealEstate/IMG_3539.JPG",
    ],
  },
];

export const NAV_LINKS = [
  ...CATEGORIES.map((c) => ({ to: c.slug, label: c.label })),
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export const TESTIMONIALS = [
  {
    quote:
      "Djeha captured our wedding day beyond our wildest dreams. Every smile, every tear, every dance move — preserved forever. We didn't just get photos, we got memories that will outlive us.",
    name: "Naledi & Sipho M.",
    event: "Wedding, 2023",
  },
  {
    quote:
      "The corporate event photos were stunning. Our client was blown away by the quality. Djeha is the only photographer we'll ever use.",
    name: "Marcus O.",
    event: "Corporate Event, 2024",
  },
  {
    quote:
      "My graduation portraits are absolutely breathtaking. Djeha has an incredible ability to make you feel at ease while creating art.",
    name: "Zanele K.",
    event: "Graduation, 2023",
  },
  {
    quote:
      "Every prom photo looked like it came from a magazine. My daughter cried happy tears when she saw them.",
    name: "Sandra P.",
    event: "Matric Dance, 2023",
  },
  {
    quote:
      "The real estate photos sold our property in 3 days. The quality was extraordinary.",
    name: "David L.",
    event: "Real Estate, 2024",
  },
];

export const TIMELINE = [
  { year: "2016", title: "Founded", body: "Born from a passion for capturing authentic human moments across Johannesburg.", icon: Camera },
  { year: "2017", title: "First Wedding", body: "Our first high-end wedding commission set the standard for everything that followed.", icon: Heart },
  { year: "2019", title: "Corporate", body: "Expanded into corporate events, becoming trusted by Johannesburg's top companies.", icon: Building2 },
  { year: "2022", title: "500 Events", body: "Celebrated our 500th event — a milestone of trust, artistry, and growth.", icon: Award },
  { year: "2023", title: "Real Estate", body: "Launched premium real estate photography with Johannesburg's top agencies.", icon: Home },
];
