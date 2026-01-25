
interface TelemetryData {
    speed: number;       // km/h
    gForce: number;      // g
    impactZone?: string; // e.g. 'front', 'side', 'rear'
    airbagDeployed?: boolean;
}

export class SeverityClassifier {
    /**
     * Analyze telemetry to determine incident severity.
     * Returns: 'Critical' | 'Severe' | 'Moderate' | 'Low'
     */
    static classify(telemetry: TelemetryData): string {
        const { speed, gForce, airbagDeployed } = telemetry;

        // 1. Critical: High speed + High G-Force + Airbag
        if (gForce > 4.0 || (speed > 80 && airbagDeployed)) {
            return 'Critical';
        }

        // 2. Severe: Significant G-Force or High Speed
        if (gForce > 2.5 || speed > 60) {
            return 'Severe';
        }

        // 3. Moderate: Low speed impact
        if (gForce > 1.5 || speed > 30) {
            return 'Moderate';
        }

        // 4. Low: Minor bumps
        return 'Low';
    }

    /**
     * Generate AI advice based on severity.
     */
    static getAdvice(severity: string): string {
        switch (severity) {
            case 'Critical':
                return 'DO NOT MOVE the victim. Check breathing. Apply pressure to bleeding.';
            case 'Severe':
                return 'Check for consciousness. Keep victim warm. Do not give water.';
            case 'Moderate':
                return 'Move to safety if possible. Check for hidden injuries.';
            case 'Low':
                return 'Exchange insurance info. Take photos of damage.';
            default:
                return 'Stay calm and wait for help.';
        }
    }
}
