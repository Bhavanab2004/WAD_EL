-- Create Users Table (for Admin)
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'user', -- 'admin' or 'user'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Reviews Table
CREATE TABLE IF NOT EXISTS reviews (
    id SERIAL PRIMARY KEY,
    user_name VARCHAR(100) NOT NULL,
    user_email VARCHAR(100) NOT NULL, -- Storing email even if not registered user
    course VARCHAR(50) NOT NULL,
    college_name VARCHAR(255) NOT NULL,
    review_text TEXT NOT NULL,
    rating INT CHECK (rating >= 1 AND rating <= 5),
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Website Views Table
CREATE TABLE IF NOT EXISTS website_views (
    id SERIAL PRIMARY KEY,
    ip_address VARCHAR(45),
    user_agent TEXT,
    visited_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
