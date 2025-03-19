// Interface for the user data from the API
export interface RandomUser {
  name: {
    first: string;
    last: string;
  };
  picture: {
    large: string;
  };
  location: {
    city: string;
    country: string;
  };
}

// Interface for our customer stories
export interface CustomerStoryData {
  name: string;
  position: string;
  company: string;
  image: string;
  location: string;
  testimonial: string;
  transformationTitle: string;
  transformationText1: string;
  transformationText2: string;
  projectType: string;
  satisfaction: number;
  projectDate: string;
}

export const fetchCustomerStories = async (count: number): Promise<CustomerStoryData[]> => {
  try {
    const response = await fetch(`https://randomuser.me/api/?results=${count}`);
    const data = await response.json();
    
    if (data.results) {
      // Generate customer stories from random user data
      const projectTypes = ['Industrial Coating', 'Facility Renovation', 'Equipment Restoration', 'Structural Painting'];
      const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      const years = [2021, 2022, 2023];
      
      return data.results.map((user: RandomUser) => {
        const randomYear = years[Math.floor(Math.random() * years.length)];
        const randomMonth = months[Math.floor(Math.random() * months.length)];
        
        return {
          name: `${user.name.first} ${user.name.last}`,
          position: ['Operations Director', 'Facility Manager', 'CEO', 'Production Manager'][Math.floor(Math.random() * 4)],
          company: ['Atlas Manufacturing', 'Precision Industries', 'Global Solutions', 'TechFab Engineering'][Math.floor(Math.random() * 4)],
          image: user.picture.large,
          location: `${user.location.city}, ${user.location.country}`,
          testimonial: [
            "The transformation was so dramatic that our clients now request tours of our facility. What was once an embarrassment has become a point of pride and even a marketing tool.",
            "We couldn't be happier with the results. The industrial coating not only protected our equipment but completely revitalized our workspace. Employee morale is at an all-time high.",
            "Working with Industrial Painter transformed our aging facility into a modern marvel. The attention to detail and commitment to quality was impressive from start to finish.",
            "The team's expertise and dedication to excellence exceeded our expectations. Our facility now looks brand new, and the protective coatings have already proven their worth."
          ][Math.floor(Math.random() * 4)],
          transformationTitle: [
            "From Rust to Remarkable",
            "Revitalizing Our Industrial Space",
            "A Complete Facility Makeover",
            "Breathing New Life Into Old Equipment"
          ][Math.floor(Math.random() * 4)],
          transformationText1: [
            "When our company approached Industrial Painter, our facility was showing serious signs of wear. Our equipment was functional but looked outdated, and employee morale was suffering in the dingy environment.",
            "Our manufacturing space had become worn and tired after decades of operation. We needed a solution that wouldn't disrupt our tight production schedule.",
            "Our facility had good bones but was visually outdated and showing signs of deterioration. We wanted to create a space that reflected our commitment to quality.",
            "Years of continuous operation had taken their toll on our equipment and facilities. We needed specialized industrial painting that could withstand our demanding environment."
          ][Math.floor(Math.random() * 4)],
          transformationText2: [
            "The team developed a comprehensive industrial coating plan that not only protected our equipment and infrastructure but transformed our workspace visually. They worked after hours and on weekends to ensure zero disruption.",
            "Industrial Painter created a custom schedule that worked around our production cycles. The transformation happened so seamlessly that we maintained full operational capacity throughout the project.",
            "The Industrial Painter team assessed our needs and developed a tailored approach that addressed both aesthetic concerns and functional requirements for our industrial space.",
            "We were impressed by the meticulous preparation and application techniques. The result was not just visually stunning but has provided exceptional protection against corrosion and wear."
          ][Math.floor(Math.random() * 4)],
          projectType: projectTypes[Math.floor(Math.random() * projectTypes.length)],
          satisfaction: Math.floor(Math.random() * 2) + 9, // 9 or 10 satisfaction score
          projectDate: `${randomMonth} ${randomYear}`
        };
      });
    }
    return [];
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};

export const generateFallbackStories = (count: number): CustomerStoryData[] => {
  const fallbackStories = [];
  for (let i = 0; i < count; i++) {
    fallbackStories.push({
      name: `Customer ${i+1}`,
      position: "Operations Director",
      company: "Atlas Manufacturing",
      image: `https://randomuser.me/api/portraits/${i % 2 === 0 ? 'men' : 'women'}/${75 + i}.jpg`,
      location: "Detroit, USA",
      testimonial: "The transformation was so dramatic that our clients now request tours of our facility. What was once an embarrassment has become a point of pride and even a marketing tool.",
      transformationTitle: "From Rust to Remarkable",
      transformationText1: "When Atlas Manufacturing approached us, their 50-year-old facility was showing serious signs of wear. Their production equipment was functional but looked outdated, and employee morale was suffering in the dingy environment.",
      transformationText2: "Our team developed a comprehensive industrial coating plan that not only protected their equipment and infrastructure but transformed their workspace visually. We worked after hours and on weekends to ensure zero disruption to their production schedule.",
      projectType: 'Industrial Coating',
      satisfaction: 9,
      projectDate: 'January 2023'
    });
  }
  return fallbackStories;
};
