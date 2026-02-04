const API_BASE_URL = 'http://localhost:5000/api/reviews';

async function fetchAndDisplayReviews(containerId, course, collegeName) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = '<p>Loading reviews...</p>';

    try {
        let url = `${API_BASE_URL}?`;
        if (course) url += `course=${encodeURIComponent(course)}&`;
        if (collegeName) url += `college_name=${encodeURIComponent(collegeName)}`;

        const response = await fetch(url);
        console.log(`Fetching from: ${url}`);
        const reviews = await response.json();
        console.log('Reviews received:', reviews);

        container.innerHTML = '';

        if (reviews.length === 0) {
            container.innerHTML = '<p>No reviews yet. Be the first to review!</p>';
            return;
        }

        reviews.forEach(review => {
            const reviewCard = document.createElement('div');
            reviewCard.className = 'review';
            // Matching existing style class 'review' or 'review-box'
            // In BCA_1.html it uses 'review'. In others it might differ.
            // I'll add some inline styles to be safe or reuse class.
            reviewCard.style.cssText = "background: rgba(255, 255, 255, 0.1); padding: 20px; border-radius: 10px; margin-bottom: 10px; color: inherit;";

            reviewCard.innerHTML = `
                <strong>${review.user_name}</strong> 
                <span style="font-size: 0.8em; opacity: 0.8">(${new Date(review.created_at).toLocaleDateString()})</span>
                <div style="margin-top: 5px;">${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</div>
                <p style="margin-top: 5px; font-style: italic;">"${review.review_text}"</p>
            `;
            container.appendChild(reviewCard);
        });

    } catch (error) {
        console.error('Error fetching reviews:', error);
        container.innerHTML = '<p>Error loading reviews.</p>';
    }
}

// Analytics Tracker
(async function trackVisit() {
    try {
        await fetch('http://localhost:5000/api/analytics/visit', { method: 'POST' });
    } catch (e) {
        console.log('Tracking error', e);
    }
})();
