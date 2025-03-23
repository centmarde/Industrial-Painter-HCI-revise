export interface Suggestion {
  label: string;
  value: string;
}

export type ServiceType = 'commercial' | 'industrial' | 'interiorDesign' | 'exteriorPaint';

// Size suggestions based on service type
export const getSizeSuggestions = (serviceType: ServiceType): Suggestion[] => {
  switch (serviceType) {
    case 'commercial':
      return [
        { label: 'Small Office', value: '50' },
        { label: 'Medium Office', value: '120' },
        { label: 'Large Office', value: '250' },
        { label: 'Retail Space', value: '180' },
        { label: 'Restaurant', value: '150' },
        { label: 'Conference Room', value: '80' },
        { label: 'Reception Area', value: '40' },
        { label: 'Entire Floor', value: '500' },
      ];
    case 'industrial':
      return [
        { label: 'Small Warehouse', value: '300' },
        { label: 'Medium Warehouse', value: '800' },
        { label: 'Large Warehouse', value: '2000' },
        { label: 'Factory Floor', value: '1500' },
        { label: 'Production Area', value: '1000' },
        { label: 'Storage Facility', value: '500' },
        { label: 'Loading Bay', value: '200' },
        { label: 'Industrial Office', value: '150' },
      ];
    case 'interiorDesign':
      return [
        { label: 'Small Room', value: '15' },
        { label: 'Medium Room', value: '25' },
        { label: 'Large Room', value: '40' },
        { label: 'Studio Apartment', value: '50' },
        { label: 'One Bedroom Apt', value: '70' },
        { label: 'Two Bedroom Apt', value: '100' },
        { label: 'Small House', value: '150' },
        { label: 'Large House', value: '250' },
      ];
    case 'exteriorPaint':
      return [
        { label: 'Small House', value: '120' },
        { label: 'Medium House', value: '200' },
        { label: 'Large House', value: '350' },
        { label: 'Small Building', value: '500' },
        { label: 'Medium Building', value: '1000' },
        { label: 'Fence/Gate', value: '50' },
        { label: 'Garage', value: '80' },
        { label: 'Deck/Patio', value: '40' },
      ];
    default:
      return [
        { label: 'Small Room', value: '15' },
        { label: 'Medium Room', value: '25' },
        { label: 'Large Room', value: '40' },
        { label: 'Small House', value: '120' },
        { label: 'Office Space', value: '200' },
      ];
  }
};

// Dimension suggestions based on service type
export const getDimensionSuggestions = (serviceType: ServiceType): Suggestion[] => {
  switch (serviceType) {
    case 'commercial':
      return [
        { label: 'Small Office', value: '5m x 4m x 2.7m' },
        { label: 'Medium Office', value: '8m x 6m x 2.7m' },
        { label: 'Conference Room', value: '10m x 5m x 3m' },
        { label: 'Reception Area', value: '6m x 5m x 3m' },
        { label: 'Corridor', value: '10m x 2m x 2.7m' },
        { label: 'Retail Space', value: '15m x 12m x 3.5m' },
        { label: 'Restaurant Area', value: '12m x 10m x 3m' },
        { label: 'Commercial Kitchen', value: '8m x 6m x 3m' },
      ];
    case 'industrial':
      return [
        { label: 'Small Warehouse', value: '20m x 15m x 6m' },
        { label: 'Large Warehouse', value: '50m x 40m x 8m' },
        { label: 'Production Area', value: '30m x 20m x 5m' },
        { label: 'Factory Floor', value: '45m x 30m x 6m' },
        { label: 'Storage Area', value: '25m x 20m x 5m' },
        { label: 'Loading Bay', value: '15m x 10m x 4m' },
        { label: 'Machine Shop', value: '20m x 15m x 4.5m' },
        { label: 'Industrial Office', value: '10m x 8m x 3m' },
      ];
    case 'interiorDesign':
      return [
        { label: 'Small Bedroom', value: '3m x 3m x 2.4m' },
        { label: 'Master Bedroom', value: '5m x 4m x 2.7m' },
        { label: 'Living Room', value: '6m x 5m x 2.7m' },
        { label: 'Kitchen', value: '4m x 3m x 2.5m' },
        { label: 'Bathroom', value: '2.5m x 2m x 2.4m' },
        { label: 'Dining Room', value: '4m x 3.5m x 2.7m' },
        { label: 'Home Office', value: '3.5m x 3m x 2.4m' },
        { label: 'Hallway', value: '5m x 1.5m x 2.4m' },
      ];
    case 'exteriorPaint':
      return [
        { label: 'Small House Front', value: '10m x 7m' },
        { label: 'Medium House Front', value: '15m x 8m' },
        { label: 'Large House Front', value: '20m x 10m' },
        { label: 'Single-Story House', value: '15m x 15m x 3m' },
        { label: 'Two-Story House', value: '12m x 10m x 6m' },
        { label: 'Fence Length', value: '25m x 2m' },
        { label: 'Garage', value: '6m x 3.5m x 2.5m' },
        { label: 'Deck/Patio', value: '5m x 4m' },
      ];
    default:
      return [
        { label: 'Small Bedroom', value: '3m x 3m x 2.4m' },
        { label: 'Living Room', value: '5m x 4m x 2.7m' },
        { label: 'Kitchen', value: '4m x 3m x 2.5m' },
        { label: 'Bathroom', value: '2.5m x 2m x 2.4m' },
        { label: 'Garage', value: '6m x 3m x 2.4m' },
        { label: 'Office Room', value: '4m x 3.5m x 2.7m' },
        { label: 'Hallway', value: '5m x 1.5m x 2.4m' },
        { label: 'Dining Room', value: '4m x 3m x 2.7m' },
      ];
  }
};

// Material suggestions based on service type
export const getMaterialSuggestions = (serviceType: ServiceType): Suggestion[] => {
  switch (serviceType) {
    case 'commercial':
      return [
        { label: 'Acrylic Paint', value: 'Acrylic paint with washable finish' },
        { label: 'Epoxy Coating', value: 'Epoxy coating for high-traffic areas' },
        { label: 'Anti-Microbial', value: 'Anti-microbial paint for healthcare settings' },
        { label: 'Low VOC', value: 'Low VOC paint for environmentally conscious offices' },
        { label: 'Textured Finish', value: 'Textured finish for accent walls' },
        { label: 'Stain Resistant', value: 'Stain resistant paint for cafeterias and break rooms' },
        { label: 'Fire Retardant', value: 'Fire retardant paint for safety compliance' },
        { label: 'Acoustic Paint', value: 'Acoustic dampening paint for noise reduction' },
      ];
    case 'industrial':
      return [
        { label: 'Epoxy Floor Coating', value: 'Heavy-duty epoxy floor coating' },
        { label: 'Rust Inhibitor', value: 'Rust inhibiting paint for metal structures' },
        { label: 'High Temp', value: 'High temperature resistant paint for machinery areas' },
        { label: 'Chemical Resistant', value: 'Chemical resistant coating for processing areas' },
        { label: 'Anti-Slip', value: 'Anti-slip floor coating for safety' },
        { label: 'Waterproof', value: 'Waterproof sealant for exterior surfaces' },
        { label: 'Corrosion Protection', value: 'Corrosion protection coating for metal equipment' },
        { label: 'Oil Resistant', value: 'Oil resistant paint for garage and maintenance areas' },
      ];
    case 'interiorDesign':
      return [
        { label: 'Matte Finish', value: 'Matte finish paint for modern look' },
        { label: 'Eggshell', value: 'Eggshell finish for living areas' },
        { label: 'Semi-Gloss', value: 'Semi-gloss for kitchens and bathrooms' },
        { label: 'Satin Finish', value: 'Satin finish for high-traffic areas' },
        { label: 'Accent Wall', value: 'Feature wall paint with texture or bold color' },
        { label: 'Eco-Friendly', value: 'Eco-friendly low VOC paint' },
        { label: 'Child-Safe', value: 'Child-safe washable paint' },
        { label: 'Moisture Resistant', value: 'Moisture resistant paint for bathrooms' },
      ];
    case 'exteriorPaint':
      return [
        { label: 'Weather Resistant', value: 'Weather resistant exterior paint' },
        { label: 'UV Protection', value: 'UV protective coating for fade resistance' },
        { label: 'Waterproof Sealant', value: 'Waterproof sealant for rain protection' },
        { label: 'Elastomeric', value: 'Elastomeric coating for crack prevention' },
        { label: 'Anti-Mold', value: 'Anti-mold and mildew resistant paint' },
        { label: 'Masonry Paint', value: 'Masonry and stucco specific paint' },
        { label: 'Wood Stain', value: 'Wood stain and sealer for wooden surfaces' },
        { label: 'Metal Paint', value: 'Rust-proof metal paint for railings and fixtures' },
      ];
    default:
      return [
        { label: 'Standard Paint', value: 'Standard quality paint' },
        { label: 'Premium Paint', value: 'Premium quality paint with better coverage' },
        { label: 'Eco-Friendly', value: 'Eco-friendly low VOC paint' },
        { label: 'Washable', value: 'Washable and durable paint' },
      ];
  }
};

// Timeframe suggestions based on service type
export const getTimeframeSuggestions = (serviceType: ServiceType): Suggestion[] => {
  switch (serviceType) {
    case 'commercial':
      return [
        { label: 'During Closure', value: 'During business closure or weekends' },
        { label: 'After Hours', value: 'After business hours (evenings)' },
        { label: 'Phased Approach', value: 'Phased approach over several weeks' },
        { label: '1-2 Weeks', value: 'Complete within 1-2 weeks' },
        { label: 'Within 30 Days', value: 'Complete within 30 days' },
        { label: 'Next Quarter', value: 'Schedule for next quarter' },
        { label: 'Annual Shutdown', value: 'During annual maintenance shutdown' },
        { label: 'Immediate', value: 'As soon as possible (emergency)' },
      ];
    case 'industrial':
      return [
        { label: 'Production Downtime', value: 'During scheduled production downtime' },
        { label: 'Annual Maintenance', value: 'During annual maintenance period' },
        { label: 'Weekend Only', value: 'Weekends only to avoid disruption' },
        { label: 'Phased Project', value: 'Phased project over 2-3 months' },
        { label: 'Swing Shift', value: 'During swing shift with reduced activity' },
        { label: 'Holiday Shutdown', value: 'During holiday shutdown period' },
        { label: '30-45 Days', value: 'Complete within 30-45 days' },
        { label: 'Quarterly Planning', value: 'Align with quarterly maintenance planning' },
      ];
    case 'interiorDesign':
      return [
        { label: '2-3 Days', value: 'Quick job within 2-3 days' },
        { label: '1 Week', value: 'Complete within 1 week' },
        { label: '2 Weeks', value: 'Complete within 2 weeks' },
        { label: 'Weekend Project', value: 'Weekend only project' },
        { label: 'Before Moving In', value: 'Before moving into the property' },
        { label: 'Within 30 Days', value: 'Complete within 30 days' },
        { label: 'Room by Room', value: 'Room by room over several weeks' },
        { label: 'While on Vacation', value: 'While residents are on vacation' },
      ];
    case 'exteriorPaint':
      return [
        { label: 'Next Week', value: 'Start next week' },
        { label: 'Within 2 Weeks', value: 'Complete within 2 weeks' },
        { label: 'Before Rainy Season', value: 'Complete before rainy season starts' },
        { label: 'Spring Schedule', value: 'Schedule for spring' },
        { label: 'Summer Project', value: 'Summer project (warm weather)' },
        { label: 'Fall Schedule', value: 'Schedule for fall' },
        { label: '30 Day Window', value: 'Complete within 30 days' },
        { label: 'Weather Dependent', value: 'Flexible timing dependent on weather conditions' },
      ];
    default:
      return [
        { label: 'ASAP', value: 'As soon as possible' },
        { label: '1 Week', value: 'Within 1 week' },
        { label: '2 Weeks', value: 'Within 2 weeks' },
        { label: '30 Days', value: 'Within 30 days' },
      ];
  }
};
