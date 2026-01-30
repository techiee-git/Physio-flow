
import { fetchDoctors } from '../src/lib/adminApi';

async function main() {
    console.log('Fetching doctors...');
    try {
        const doctors = await fetchDoctors();
        console.log('Result:', JSON.stringify(doctors, null, 2));
    } catch (error) {
        console.error('Fatal error calling fetchDoctors:', error);
    }
}

main();
