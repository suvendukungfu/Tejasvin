/**
 * Simulates a Machine Learning Model for Safety Scoring.
 * In a real startup, this would be a Python Microservice (FastAPI/Flask)
 * consuming live satellite data, news feeds, and user reports.
 */

interface scoreFactors {
    weatherCondition: string; // 'Clear', 'Rain', 'Storm'
    recentReportsCount: number;
    infrastructureRating: number; // 1-10
}

export const calculateSafetyScore = (factors: scoreFactors): number => {
    let score = factors.infrastructureRating;

    // Weather impact
    if (factors.weatherCondition === 'Rain') score -= 1;
    if (factors.weatherCondition === 'Storm') score -= 3;

    // Crowd/Reports impact
    if (factors.recentReportsCount > 5) score -= 2; // High complaints

    return Math.max(1, Math.min(10, score)); // Clamp 1-10
};

export const getLiveSafetyData = async (siteId: number) => {
    // Mock Data Fetching layer (would call external APIs)
    const mockWeather = ['Clear', 'Rain', 'Clear', 'Storm'][Math.floor(Math.random() * 4)];
    const mockReports = Math.floor(Math.random() * 10);

    // Base rating from DB logic would go here, assuming 8 for now
    const baseInfra = 8;

    const dynamicScore = calculateSafetyScore({
        weatherCondition: mockWeather,
        recentReportsCount: mockReports,
        infrastructureRating: baseInfra
    });

    return {
        score: dynamicScore,
        details: {
            weather: mockWeather,
            reports: mockReports,
            advisory: dynamicScore < 5 ? 'Travel with Caution' : 'Safe to Visit'
        },
        lastUpdated: new Date().toISOString()
    };
};
