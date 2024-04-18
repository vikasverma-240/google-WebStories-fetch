// WebStories.jsx
import React, { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';
import './WebStories.css'; // Make sure to import the CSS file

const WebStories = () => {
    const [stories, setStories] = useState([]);
    const [error, setError] = useState(null);
    const [visibleCount, setVisibleCount] = useState(6); // 6 items initially for 2 rows with 3 items each

    useEffect(() => {
        const fetchStories = async () => {
            try {
                const response = await fetch('https://your-wordpress-site.com/wp-json/web-stories/v1/web-story');
                const data = await response.json();
                setStories(data);
            } catch (error) {
                setError(error.message);
                console.error('Error fetching stories:', error);
            }
        };
        fetchStories();
    }, []);

    const handleViewMore = () => {
        setVisibleCount((prevCount) => prevCount + 3); // Add one row (3 stories) per click
    };

    const visibleStories = stories.slice(0, visibleCount);

    return (
        <div className="web-stories-container">
            {error && <p className="error-message">{error}</p>}
            <div className="web-stories-grid">
                {visibleStories.length > 0 ? visibleStories.map((story) => (
                    <article key={story.id} className="story-card">
                        <a href={story.link} target="_blank" rel="noopener noreferrer">
                            <img className="story-image" src={story.story_poster.url} alt={story.title.rendered} />
                            <div className="story-content">
                                <h3 className="story-title">{story.title.rendered}</h3>
                                {/* Other content here */}
                            </div>
                        </a>
                        <div className="story-date">
                            {/* Date formatting logic */}
                            {new Date(story.date).toLocaleDateString()}
                        </div>
                    </article>
                )) : <p className="no-stories">No stories found.</p>}
            </div>
            {visibleCount < stories.length && (
                <div className="view-more">
                    <button onClick={handleViewMore}>View More</button>
                </div>
            )}
        </div>
    );
};

export default WebStories;
