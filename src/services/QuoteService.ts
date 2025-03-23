import { Response } from '../../../utils/Quote';

export interface QuoteData {
  serviceType: string;
  size: {
    squareMeters: string;
    dimensions: string;
  };
  requirements: {
    materials: string;
    timeframe: string;
  };
}

export interface QuoteResponse {
  fixedEstimate: string;
  detailedResponse: string;
}

export class QuoteService {
  private response = Response();

  // Generate appropriate prompt based on user inputs
  generatePrompt(data: QuoteData): string {
    return `I need a quote for a ${data.serviceType} painting job with the following details:
      - Size: ${data.size.squareMeters} square meters
      - Dimensions: ${data.size.dimensions}
      - Required Materials: ${data.requirements.materials}
      - Timeframe: ${data.requirements.timeframe}
      
      Please provide a detailed quote including:
      1. A FIXED ESTIMATE (using the format 'FIXED_ESTIMATE: $X,XXX')
      2. Estimated cost range (min-max)
      3. Required materials with quantities
      4. Estimated time to complete
      5. Brief recommendations for this type of project`;
  }

  // Extract fixed estimate from response - handles both formats
  extractFixedEstimate(response: string): string {
    // Try to match the format without brackets first
    let match = response.match(/FIXED_ESTIMATE:\s*([\$\£\€][\d,\.]+)/i);
    
    // If not found, try the format with brackets
    if (!match) {
      match = response.match(/\[FIXED_ESTIMATE:\s*([\$\£\€][\d,\.]+)\]/i);
    }
    
    return match ? match[1] : "Price on request";
  }

  // Get AI response based on the quote data
  async getQuoteResponse(data: QuoteData): Promise<QuoteResponse> {
    const prompt = this.generatePrompt(data);
    const responseText = await this.response.getResponse(prompt);
    
    // Extract fixed estimate and clean up the display response
    const fixedEstimate = this.extractFixedEstimate(responseText);
    
    // Remove the FIXED_ESTIMATE line from the response (both formats)
    const detailedResponse = responseText
      .replace(/FIXED_ESTIMATE:\s*[\$\£\€][\d,\.]+\s*\n?/i, '')
      .replace(/\[FIXED_ESTIMATE:\s*[\$\£\€][\d,\.]+\]\s*\n?/i, '')
      .trim();
    
    return {
      fixedEstimate,
      detailedResponse
    };
  }
}
