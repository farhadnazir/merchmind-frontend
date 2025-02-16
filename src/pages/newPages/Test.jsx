import React, { useState } from 'react';

const Test = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [prompt, setPrompt] = useState('');
    const [imageUrl, setImageUrl] = useState(null); // To store the image URL from the response

    // Function to handle text-to-image request
    const fetchData = async (userPrompt) => {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'api-key': '79fa23a8-0c1a-4139-85b8-ed2658a4c12d', // Your DeepAI API key
            },
            body: JSON.stringify({
                text: userPrompt, // Send the text prompt to the API
            }),
        };

        try {
            setLoading(true); // Set loading to true before the request
            const response = await fetch('https://api.deepai.org/api/text2img', options);
            const result = await response.json();

            if (result && result.output_url) {
                setImageUrl(result.output_url); // Set the image URL from the response
            } else {
                setError('No image URL received from API');
            }
        } catch (err) {
            console.error('Error:', err);
            setError('Failed to generate image');
        } finally {
            setLoading(false); // Set loading to false after the request completes
        }
    };

    const handleInputChange = (e) => {
        setPrompt(e.target.value); // Update prompt with user input
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!prompt.trim()) {
            alert('Please enter a prompt');
            return;
        }
        fetchData(prompt); // Trigger API call with the prompt
    };

    if (loading) return <div>Loading...</div>; // Show loading state
    if (error) return <div>Error: {error}</div>; // Show error message if there's an issue

    return (
        <div>
            <h1>Text-to-Image Generator</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={prompt}
                    onChange={handleInputChange}
                    placeholder="Enter your prompt here"
                    style={{ width: '100%', padding: '10px', fontSize: '16px' }}
                />
                <button type="submit" style={{ padding: '10px', fontSize: '16px', marginTop: '10px' }}>
                    Generate Image
                </button>
            </form>

            {imageUrl && (
                <div>
                    <h2>Generated Image</h2>
                    <img src={imageUrl} alt="Generated" style={{ maxWidth: '100%', height: 'auto' }} />
                </div>
            )}
        </div>
    );
};

export default Test;
