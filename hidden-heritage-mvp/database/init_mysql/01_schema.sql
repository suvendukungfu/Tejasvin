-- Existing Tables (Preserved)
CREATE TABLE IF NOT EXISTS regions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    banner_image VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS sites (
    id INT AUTO_INCREMENT PRIMARY KEY,
    region_id INT,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    type VARCHAR(50),
    short_description TEXT,
    full_description TEXT,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    entry_fee DECIMAL(10, 2) DEFAULT 0,
    avg_visit_time_mins INT DEFAULT 60,
    image_url VARCHAR(255),
    safety_score INT DEFAULT 10,
    safety_details JSON,
    ar_content_available BOOLEAN DEFAULT FALSE,
    ar_metadata JSON,
    FOREIGN KEY (region_id) REFERENCES regions(id)
);

CREATE TABLE IF NOT EXISTS guides (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    certification VARCHAR(255),
    fee_per_day DECIMAL(10, 2) DEFAULT 1000,
    languages VARCHAR(255),
    bio TEXT,
    image_url VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('traveler', 'admin', 'guide') DEFAULT 'traveler',
    subscription_tier ENUM('free', 'premium') DEFAULT 'free', -- NEW
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS trips (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    name VARCHAR(255),
    total_cost DECIMAL(10, 2),
    total_time_mins INT,
    site_ids JSON, 
    guide_id INT NULL,
    status ENUM('draft', 'confirmed', 'completed', 'cancelled') DEFAULT 'draft',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (guide_id) REFERENCES guides(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS payments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    trip_id INT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    currency VARCHAR(10) DEFAULT 'INR',
    status ENUM('pending', 'succeeded', 'failed') DEFAULT 'pending',
    provider VARCHAR(50) DEFAULT 'stripe_mock',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (trip_id) REFERENCES trips(id)
);

-- PHASE 4 NEW TABLES --

CREATE TABLE IF NOT EXISTS subscriptions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    plan_id VARCHAR(50) NOT NULL, -- e.g., 'premium_monthly'
    status ENUM('active', 'canceled', 'expired') DEFAULT 'active',
    start_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    end_date TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    site_id INT NOT NULL,
    rating INT CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    is_flagged BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (site_id) REFERENCES sites(id)
);

CREATE TABLE IF NOT EXISTS payouts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    guide_id INT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    status ENUM('pending', 'processed', 'failed') DEFAULT 'pending',
    trip_id INT, -- Associated trip
    processed_at TIMESTAMP NULL,
    FOREIGN KEY (guide_id) REFERENCES guides(id),
    FOREIGN KEY (trip_id) REFERENCES trips(id)
);
