
import { mysqlPool } from '../src/config/mysql';

const updates = [
    {
        slug: 'bateshwar-temples',
        image_url: 'https://upload.wikimedia.org/wikipedia/commons/7/77/Bateshwar_Temple_Complex_-_3.jpg'
    },
    {
        slug: 'chambal-ravines',
        image_url: 'https://upload.wikimedia.org/wikipedia/commons/1/1c/Chambal-river-gorge.jpg'
    },
    {
        slug: 'mitawali-padavali',
        image_url: 'https://upload.wikimedia.org/wikipedia/commons/e/ed/General_View_of_Chausath_Yogini_Temple_Mitawali.jpg'
    },
    {
        slug: 'kakanmath-temple',
        image_url: 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Kakanmath_Temple%2C_Morena.jpg'
    },
    {
        slug: 'ater-fort',
        image_url: 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Ater-fort-bhind.webp'
    },
    {
        slug: 'chambal-sanctuary',
        image_url: 'https://upload.wikimedia.org/wikipedia/commons/8/8b/Indian_Gharial_%28National_Chambal_Sanctuary%29.jpg'
    }
];

const main = async () => {
    try {
        console.log('Starting image updates...');

        // 1. Update existing sites
        for (const site of updates) {
            const [result] = await mysqlPool.query(
                'UPDATE sites SET image_url = ? WHERE slug = ?',
                [site.image_url, site.slug]
            );
            console.log(`Updated ${site.slug}:`, (result as any).affectedRows > 0 ? 'Success' : 'No match found');
        }

        // 2. Insert Garh Kundar if missing
        const garhKundar = {
            region_id: 1, // Assumptions: Chambal is ID 1
            name: 'Garh Kundar',
            slug: 'garh-kundar',
            type: 'fort',
            short_description: 'A mysterious fort perched on a hill, known for its complex architecture.',
            full_description: 'Garh Kundar is a magnificent fort located on a high hill, surrounded by picturesque hills and forests. It has a rich history filled with legends of Khangar kings.',
            latitude: 25.4833,
            longitude: 78.9333,
            entry_fee: 0,
            avg_visit_time_mins: 120,
            image_url: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/Garh_Kundar.JPG',
            safety_score: 7,
            safety_details: JSON.stringify({ accessibility: "Moderate", terrain: "Hilly", network: "Average" }),
            ar_content_available: false
        };

        const [existing] = await mysqlPool.query('SELECT id FROM sites WHERE slug = ?', ['garh-kundar']);
        if ((existing as any[]).length === 0) {
            console.log('Inserting Garh Kundar...');
            await mysqlPool.query(
                `INSERT INTO sites (region_id, name, slug, type, short_description, full_description, latitude, longitude, entry_fee, avg_visit_time_mins, image_url, safety_score, safety_details, ar_content_available) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    garhKundar.region_id,
                    garhKundar.name,
                    garhKundar.slug,
                    garhKundar.type,
                    garhKundar.short_description,
                    garhKundar.full_description,
                    garhKundar.latitude,
                    garhKundar.longitude,
                    garhKundar.entry_fee,
                    garhKundar.avg_visit_time_mins,
                    garhKundar.image_url,
                    garhKundar.safety_score,
                    garhKundar.safety_details,
                    garhKundar.ar_content_available
                ]
            );
            console.log('Garh Kundar inserted.');
        } else {
            console.log('Garh Kundar already exists, updating image...');
            await mysqlPool.query(
                'UPDATE sites SET image_url = ? WHERE slug = ?',
                [garhKundar.image_url, garhKundar.slug]
            );
        }

        // 3. Update Region Banner
        console.log('Updating Chambal Region banner...');
        await mysqlPool.query(
            'UPDATE regions SET banner_image = ? WHERE slug = ?',
            ['https://upload.wikimedia.org/wikipedia/commons/1/1c/Chambal-river-gorge.jpg', 'chambal']
        );
        console.log('Region banner updated.');

        console.log('All updates complete.');
        process.exit(0);
    } catch (error) {
        console.error('Error updating DB:', error);
        process.exit(1);
    }
};

main();
