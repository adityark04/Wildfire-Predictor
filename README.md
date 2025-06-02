# Wildfire-Predictor
This project, the Wildfire Risk Predictor, is a web application designed to estimate the likelihood of wildfires based on user-provided environmental and human activity data. It leverages the power of the Google Gemini API to simulate an AI-driven prediction.

How It Works
Users input a range of relevant variables that influence wildfire risk, including:

Temperature (in °C or °F)
Humidity (percentage)
Wind Speed (in km/h or mph)
Precipitation (recent rainfall, in mm
Soil Moisture (relative or percentage)
Vegetation Index (NDVI) (measuring vegetation health)
Human Activity Level (scaled input reflecting factors such as proximity to roads, power lines, campgrounds, etc.)

Once the data is submitted, the application processes this information through a backend system—simulated in this version by a direct call to the Google Gemini API. The model analyzes the inputs using a generative AI approach and returns a comprehensive wildfire risk assessment.


The output consists of:

Risk Probability: A numerical value between 0 and 1 indicating the likelihood of wildfire occurrence.
Qualitative Risk Level: A human-readable classification of the risk (e.g., Low, Moderate, High, Very High, Extreme).
Textual Assessment: An AI-generated explanation that details the reasoning behind the prediction, including how each factor contributed to the result.
This information is then presented to the user in a dynamic, responsive interface.

Technologies Used
Frontend Framework: React with TypeScript for strong typing and maintainable component architecture.
Styling: Tailwind CSS for rapid UI development and responsive, utility-first styling.
AI Integration: Google Gemini API is used to simulate backend logic and generate intelligent risk assessments based on user input.


Purpose and Impact
This project aims to provide an accessible, interactive tool for understanding wildfire risks based on dynamic real-world data. By translating complex environmental variables into actionable insights, the application empowers users to make informed decisions and promotes awareness of wildfire prevention and response.

This project can be extended for:
Real-time integration with live sensor or satellite data
Deployment as a mobile app or public dashboard
Use by municipalities, fire departments, or conservation groups

