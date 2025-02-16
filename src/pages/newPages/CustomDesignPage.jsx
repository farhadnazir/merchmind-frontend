
import React, { useState } from "react";
import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";
import ClipLoader from "react-spinners/ClipLoader"; // Add this library for loaders (install via npm if not already installed)


const mockupTemplates = [
  {
    mockup_uuid: "cadccef4-6e59-4e82-b077-40ad55fe4506",
    smart_object_uuid: "21e160fd-806b-4c3d-a2c4-31c75cb5c51d",
  },
  {
    mockup_uuid: "75ac5c36-1082-4fe5-ad1b-a5047962f73e",
    smart_object_uuid: "38870d52-2a34-493d-a228-19559c86e54f",
  },
  {
    mockup_uuid: "6b45f3e9-bdbd-4c10-ae87-cbb424bfa78e",
    smart_object_uuid: "84e40928-d045-424d-a21a-2eda3060388a",
  },
  {
    mockup_uuid: "378ecbf7-27c6-4c38-ae11-b852eace6514",
    smart_object_uuid: "601e8470-f09e-4014-ade7-6b7980edba8a",
  },
  {
    mockup_uuid: "42840a4b-55b6-4c56-83aa-56231b25dfe9",
    smart_object_uuid: "dffb20e8-0fb7-472e-a005-e4091e30e82e",
  },
  {
    mockup_uuid: "f9657766-927f-4d30-b529-b8d602f6a084",
    smart_object_uuid: "72f5f139-3f7b-4c41-8b48-bc6427548f4e",
  },
  {
    mockup_uuid: "df895743-fcb1-4376-9fa2-5c451b76c32c",
    smart_object_uuid: "0cf1427b-72f9-413c-961c-1d2ec59af59e",
  },
  {
    mockup_uuid: "ca7b9c95-8b81-4335-8f6a-577d59fd04e2",
    smart_object_uuid: "d319ecdd-d57d-47de-9e3c-c78a0768051a",
  },
];

const fetchDesign = async (prompt, setGeneratedImage, setError, setLoading) => {
  try {
    const defaultPrompt = "A high-quality, highly detailed, image of ";
    const fullPrompt = defaultPrompt + prompt;

    const response = await fetch("https://api.deepai.org/api/text2img", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": "79fa23a8-0c1a-4139-85b8-ed2658a4c12d",
      },
      body: JSON.stringify({ text: fullPrompt }),
    });

    const data = await response.json();
    if (data.output_url) {
      setGeneratedImage(data.output_url);
    } else {
      setError("Error: No image URL received from API");
    }
  } catch (err) {
    console.error("Error generating image:", err);
    setError("Error: Failed to generate design");
  } finally {
    setLoading(false);
  }
};

const fetchMockups = async (imageUrl, setMockups, setMockupsLoading, setError) => {
  setMockupsLoading(true);
  const url = "https://app.dynamicmockups.com/api/v1/renders";
  const apiKey = "88a9ad4c-d1ba-4dc8-a3aa-71954522be7c:bd313a3828a1bada8cd5b581904527a68aefbe99a2bb1ce9ec01d1eae2b0d7b9";

  const promises = mockupTemplates.map(async (template) => {
    const data = {
      mockup_uuid: template.mockup_uuid,
      export_options: { image_format: "jpg", image_size: 720 },
      smart_objects: [{ uuid: template.smart_object_uuid, asset: { url: imageUrl } }],
    };
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-api-key": apiKey },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      return result.data.export_path;
    } catch (error) {
      console.error("Error fetching mockup:", error);
      setError("Error: Failed to generate mockups");
      return null;
    }
  });

  const results = await Promise.all(promises);
  setMockups(results.filter(Boolean));
  setMockupsLoading(false);
};

// Function to download the image directly
const downloadImage = async (imageUrl, filename) => {
  try {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = filename;
    link.click();
    window.URL.revokeObjectURL(link.href); // Clean up URL
  } catch (error) {
    console.error("Error downloading image:", error);
  }
};

const CustomDesignPage = () => {
  const [prompt, setPrompt] = useState("");
  const [generatedImage, setGeneratedImage] = useState(null);
  const [mockups, setMockups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mockupsLoading, setMockupsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGenerateDesign = () => {
    if (!prompt.trim()) {
      setError("Please enter a prompt to generate a design.");
      return;
    }
    setError(null);
    setGeneratedImage(null);
    setMockups([]);
    setLoading(true);
    fetchDesign(prompt, setGeneratedImage, setError, setLoading);
  };

  const handleGenerateMockups = () => {
    if (generatedImage) {
      fetchMockups(generatedImage, setMockups, setMockupsLoading, setError);
    }
  };

  return (
    <div className=" min-h-screen"
  >
      <Header />
      <section className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white py-16 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold mt-[70px]">Create Your Custom Design</h1>
        <p className="mt-4 text-lg md:text-xl">Unlock your creativity with AI-powered design generation and mockup previews.</p>
      </section>

      <section className="py-16 px-4 ">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Design Anything You <span className="gradientText">Imagine</span></h2>
          <div className="flex justify-center items-center mt-10">
  <div className="relative w-full max-w-xl">
    {/* Input Field */}
    <input
      type="text"
      placeholder="Try: A magical Disney-inspired castle"
      value={prompt}
      onChange={(e) => setPrompt(e.target.value)}
      className="w-full py-4 pl-6 pr-20 rounded-full border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-700"
    />

    {/* Generate Button */}
    <button
      onClick={handleGenerateDesign}
      disabled={loading}
      className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gradient-to-r from-orange-600 to-yellow-500 hover:from-yellow-500 hover:to-orange-600 text-white font-semibold py-2 px-6 rounded-full shadow-lg focus:outline-none"
    >
      {loading ? "Loading..." : "Generate"}
    </button>
  </div>
</div>

          {error && <div className="text-red-500 mt-4">{error}</div>}
        </div>

        {generatedImage && (
          <div className="relative flex flex-col items-center mt-8">
            <div className="relative">
              <img src={generatedImage} alt="Generated Design" className="max-w-md h-auto rounded-md shadow-lg" />
            </div>
            <div className="flex gap-3">
            <button
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-md text-lg shadow-md mt-6"
              onClick={handleGenerateMockups}
              disabled={mockupsLoading}
            >
              Generate Mockups
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-md text-lg shadow-md mt-6"
              onClick={() => downloadImage(generatedImage, "design.jpg")}
            >
              Download Design
            </button>
            </div>
          </div>
        )}

        {mockups.length > 0 && (
          <div className="px-5 grid grid-cols-1 md:grid-cols-4 gap-8 mt-8">
            {mockups.map((mockupUrl, index) => (
              <div key={index} className="bg-white shadow rounded-lg p-4">
                <img src={mockupUrl} alt={`Mockup ${index + 1}`} className="w-full h-[400px] object-cover rounded-md" />
                <div className="mt-4 flex justify-between items-center">
                  <div className="flex items-center">
                    <button className="bg-gray-200 px-2 py-1 rounded-l">-</button>
                    <input
                      type="number"
                      min="1"
                      defaultValue="1"
                      className="w-12 text-center border"
                    />
                    <button className="bg-gray-200 px-2 py-1 rounded-r">+</button>
                  </div>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded">Add to Cart</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
      <Footer />
    </div>
  );
};

export default CustomDesignPage;