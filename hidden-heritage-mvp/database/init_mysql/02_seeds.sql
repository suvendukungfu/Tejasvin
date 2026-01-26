-- Seed Regions
INSERT INTO regions (name, slug, description, banner_image) VALUES 
('Chambal Region', 'chambal', 'A land of mystery, deep ravines, and forgotten history, Chambal offers a journey into the wild heart of India.', '/assets/chambal_banner.jpg');

-- Seed Sites (Chambal)
INSERT INTO sites (region_id, name, slug, type, short_description, full_description, latitude, longitude, entry_fee, avg_visit_time_mins, image_url, safety_score, safety_details, ar_content_available, ar_metadata) VALUES
(1, 'Bateshwar Temples', 'bateshwar-temples', 'temple', 'A cluster of 200 sandstone temples dedicated to Shiva and Vishnu.', 'Restored by the ASI, these temples date back to the 8th-10th century and were once hidden by the ravines and dacoits. The site is a marvel of Gurjara-Pratihara architecture.', 26.7577, 78.1729, 0.00, 90, '/assets/bateshwar.jpg', 8, '{"accessibility": "Moderate", "terrain": "Uneven steps", "network": "Good"}', TRUE, '{"model_type": "360_view"}'),
(1, 'Chambal Ravines', 'chambal-ravines', 'ravine', 'The infamous badlands, home to diverse wildlife and legends.', 'Explore the breathtaking landscape of the Chambal ravines, formed by centuries of soil erosion. Perfect for a guided jeep safari to spot Gharials and migratory birds.', 26.6500, 78.3000, 500.00, 120, '/assets/ravines.jpg', 6, '{"accessibility": "Low", "terrain": "Rugged", "network": "Poor", "advisory": "Guide Mandatory"}', FALSE, NULL),
(1, 'Mitawali Padavali', 'mitawali-padavali', 'temple', 'The circular temple that inspired the Indian Parliament House.', 'The Chausath Yogini Temple at Mitawali is an ancient circular structure sitting atop a hill, offering panoramic views. Nearby Padavali is known for its intricate carvings.', 26.4746, 78.2045, 25.00, 60, '/assets/mitawali.jpg', 9, '{"accessibility": "High", "terrain": "200 steps to top", "network": "Good"}', TRUE, '{"model_type": "reconstruction"}'),
(1, 'Kakanmath Temple', 'kakanmath-temple', 'temple', 'A towering, gravity-defying temple built without lime or cement.', 'Legend says it was built by ghosts in a single night. This Shiva temple stands tall despite being partially in ruins, showcasing incredible engineering.', 26.6800, 78.0800, 0.00, 45, '/assets/kakanmath.jpg', 7, '{"accessibility": "Moderate", "terrain": "Flat but debris", "network": "Moderate"}', FALSE, NULL),
(1, 'Ater Fort', 'ater-fort', 'fort', 'A grand fortress along the Chambal river.', 'Built by the Bhadauria kings, this fort lies deep within the ravines. It contains the Khooni Darwaza and Raja ka Bangla, echoing tales of valor.', 26.7300, 78.6000, 50.00, 120, '/assets/ater_fort.jpg', 7, '{"accessibility": "Moderate", "terrain": "Hilly walk", "network": "Poor"}', FALSE, NULL),
(1, 'National Chambal Sanctuary', 'chambal-sanctuary', 'nature', 'River safari to see Gharials, Dolphins, and Skimmers.', 'A protected area on the Chambal River, offering boat safaris to observe the critically endangered Gharial, Red-crowned roof turtle, and Gangetic Dolphin.', 26.8000, 78.5000, 800.00, 180, '/assets/river_safari.jpg', 9, '{"accessibility": "High", "terrain": "Boat ramp", "network": "Moderate"}', FALSE, NULL);

-- Seed Guides
INSERT INTO guides (name, certification, fee_per_day, languages, bio, image_url) VALUES 
('Rameshwar Singh', 'MP Tourism Certified', 1500.00, 'Hindi, English', 'Expert in Chambal history and bird watching. 15 years of experience.', '/assets/guide1.jpg'),
('Sunita Sharma', 'ASI Heritage Guide', 1800.00, 'Hindi, English, French', 'Specializes in temple architecture and archaeology.', '/assets/guide2.jpg'),
('Vikram Tomar', 'Local Expert', 1200.00, 'Hindi, Bundeli', 'Born in the ravines, Vikram knows every hidden trail and local legend.', '/assets/guide3.jpg');

-- Seed Users (Password is 'password123' hashed with bcrypt cost 10)
-- $2b$10$w... is a placeholder hash, using a known one or just text for now?
-- For MVP without running bcrypt on seed, I'll use a fixed hash for 'secret'.
-- Hash for 'secret': $2a$10$2.6.2.6.2.6.2.6.2.6.2.6.2.6.2.6.2.6.2.6.2.6.2.6.2.6.
-- Actually, let's just insert a dummy.
INSERT INTO users (name, email, password_hash, role) VALUES
('Demo Traveler', 'user@example.com', '$2b$10$3euPcmQFCiblsZeEu5s7p.9/1.1.1.1.1.1.1.1.1.1.1.1.1.1.1', 'traveler'),
('Admin User', 'admin@example.com', '$2b$10$3euPcmQFCiblsZeEu5s7p.9/1.1.1.1.1.1.1.1.1.1.1.1.1.1.1', 'admin');
