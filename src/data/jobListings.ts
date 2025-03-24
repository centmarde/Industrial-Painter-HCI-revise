export interface JobListing {
  id: string;
  companyName: string;
  position: string;
  location: string;
  description: string;
  requirements: string[];
  salary: string;
  applyLink: string;
  logo: string;
  postedDate: string;
}

export const jobListings: JobListing[] = [
  {
    id: "job1",
    companyName: "IndustrialTech Solutions",
    position: "Senior Industrial Painter",
    location: "Chicago, IL",
    description: "We are looking for experienced industrial painters to join our team working on large-scale infrastructure projects.",
    requirements: [
      "5+ years experience in industrial painting",
      "Knowledge of safety regulations",
      "Experience with airless spray equipment",
      "OSHA certification preferred"
    ],
    salary: "$65,000 - $85,000",
    applyLink: "https://example.com/apply/job1",
    logo: "https://via.placeholder.com/150",
    postedDate: "2023-10-15"
  },
  {
    id: "job2",
    companyName: "MetalCoat Industries",
    position: "Paint Supervisor",
    location: "Detroit, MI",
    description: "Supervise a team of industrial painters for automotive factory equipment maintenance.",
    requirements: [
      "7+ years of industrial painting experience",
      "3+ years in supervisory role",
      "Experience with quality control and inspection",
      "Strong communication skills"
    ],
    salary: "$75,000 - $95,000",
    applyLink: "https://example.com/apply/job2",
    logo: "https://via.placeholder.com/150",
    postedDate: "2023-10-12"
  },
  {
    id: "job3",
    companyName: "MarineCoat Systems",
    position: "Marine Industrial Painter",
    location: "Seattle, WA",
    description: "Specialized industrial painting for marine vessels, docks, and offshore structures.",
    requirements: [
      "Experience with marine-grade coatings",
      "Able to work in varying weather conditions",
      "Comfortable with heights and confined spaces",
      "NACE certification a plus"
    ],
    salary: "$70,000 - $90,000",
    applyLink: "https://example.com/apply/job3",
    logo: "https://via.placeholder.com/150",
    postedDate: "2023-10-10"
  },
  {
    id: "job4",
    companyName: "BridgeWorks Construction",
    position: "Industrial Coating Technician",
    location: "Pittsburgh, PA",
    description: "Apply protective coatings to bridges, highways, and other infrastructure projects.",
    requirements: [
      "3+ years experience in structural steel coating",
      "Valid driver's license",
      "Ability to operate boom lifts and scaffolding",
      "Knowledge of bridge painting regulations"
    ],
    salary: "$60,000 - $75,000",
    applyLink: "https://example.com/apply/job4",
    logo: "https://via.placeholder.com/150",
    postedDate: "2023-10-08"
  },
  {
    id: "job5",
    companyName: "PowerPlant Maintenance Inc.",
    position: "Industrial Painter/Blaster",
    location: "Houston, TX",
    description: "Responsible for surface preparation and painting of power generation equipment and facilities.",
    requirements: [
      "Experience with sandblasting and surface prep",
      "Knowledge of high-temperature coatings",
      "Confined space certification",
      "Flexible schedule for outage work"
    ],
    salary: "$55,000 - $70,000",
    applyLink: "https://example.com/apply/job5",
    logo: "https://via.placeholder.com/150",
    postedDate: "2023-10-05"
  },
  {
    id: "job6",
    companyName: "AerospaceFinish Technologies",
    position: "Aircraft Coating Specialist",
    location: "Dallas, TX",
    description: "Apply specialized coatings to aircraft components following strict industry standards and specifications.",
    requirements: [
      "3+ years experience in aerospace painting",
      "Knowledge of FAA regulations",
      "Experience with HVLP spray systems",
      "Ability to read and interpret technical blueprints"
    ],
    salary: "$70,000 - $90,000",
    applyLink: "https://example.com/apply/job6",
    logo: "https://via.placeholder.com/150",
    postedDate: "2023-09-28"
  },
  {
    id: "job7",
    companyName: "IndustrialChem Coatings",
    position: "Epoxy Floor Coating Technician",
    location: "Denver, CO",
    description: "Specialize in application of industrial epoxy floor coatings for manufacturing facilities and warehouses.",
    requirements: [
      "2+ years in epoxy application",
      "Experience with floor preparation",
      "Knowledge of chemical resistance requirements",
      "Valid driver's license and reliable transportation"
    ],
    salary: "$55,000 - $75,000",
    applyLink: "https://example.com/apply/job7",
    logo: "https://via.placeholder.com/150",
    postedDate: "2023-09-25"
  },
  {
    id: "job8",
    companyName: "OilRig Protective Services",
    position: "Offshore Industrial Painter",
    location: "New Orleans, LA",
    description: "Work on offshore oil platforms applying corrosion-resistant coatings in challenging marine environments.",
    requirements: [
      "Offshore experience preferred",
      "TWIC card and safety certifications",
      "Willing to work 2-3 week rotations",
      "Experience with marine-grade coatings"
    ],
    salary: "$85,000 - $110,000",
    applyLink: "https://example.com/apply/job8",
    logo: "https://via.placeholder.com/150",
    postedDate: "2023-09-20"
  },
  {
    id: "job9",
    companyName: "RailTech Maintenance",
    position: "Railway Equipment Painter",
    location: "Baltimore, MD",
    description: "Responsible for preparing and painting railway cars and equipment with durable protective coatings.",
    requirements: [
      "Experience with large-scale painting projects",
      "Knowledge of railway safety procedures",
      "Ability to work in varying weather conditions",
      "Mechanical aptitude"
    ],
    salary: "$60,000 - $80,000",
    applyLink: "https://example.com/apply/job9",
    logo: "https://via.placeholder.com/150",
    postedDate: "2023-09-15"
  },
  {
    id: "job10",
    companyName: "WaterTank Preservation Inc.",
    position: "Water Tank Coating Specialist",
    location: "Phoenix, AZ",
    description: "Apply NSF-approved coatings to municipal water tanks and storage facilities.",
    requirements: [
      "Experience with NSF/ANSI 61 compliant coatings",
      "Confined space certification",
      "Comfortable working at heights",
      "Knowledge of proper containment procedures"
    ],
    salary: "$65,000 - $85,000",
    applyLink: "https://example.com/apply/job10",
    logo: "https://via.placeholder.com/150",
    postedDate: "2023-09-10"
  }
];
