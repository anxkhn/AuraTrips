# 🌟 AuraTrips: AI-Powered Personalized Travel Itinerary Generator


## 📚 Table of Contents

- [Introduction](#-introduction)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Setup and Installation](#-setup-and-installation)
- [Usage](#-usage)
- [AI and Data Processing](#-ai-and-data-processing)
- [Design Choices](#-design-choices)
- [Challenges and Solutions](#-challenges-and-solutions)
- [Future Improvements](#-future-improvements)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

## 🌈 Introduction

AuraTrips is an innovative, **AI-powered travel itinerary generator** designed to create personalized travel experiences based on user preferences. Leveraging cutting-edge AI technologies, including **RAG (Retrieval-Augmented Generation)** and **LLM (Large Language Models)**, AuraTrips curates dream vacations by synthesizing data from thousands of verified travelers' experiences.

This solution addresses the Atlan Engineering Fellowship Task - 2024, focusing on creating a web application that generates tailored travel itineraries. AuraTrips goes beyond the basic requirements, offering a seamless, user-friendly interface coupled with powerful backend processing to deliver dynamic, detailed itineraries that cater to individual needs and preferences.

## ✨ Features

<details>
<summary>Click to expand</summary>

- 🖥️ User-friendly interface for inputting travel preferences
- 🤖 AI-powered itinerary generation using RAG and LLM technologies
- 💡 Personalized recommendations based on budget, interests, and trip duration
- 🗺️ Integration with Google Maps API for location visualization
- 📱 Responsive design for seamless use across devices
- 🔐 User authentication and itinerary saving functionality

</details>

## 🛠️ Tech Stack

<details>
<summary>Click to expand</summary>

### Backend

- **FastAPI**: High-performance, easy-to-use framework for building APIs
- **SQLAlchemy**: SQL toolkit and ORM for database operations
- **Pydantic**: Data validation and settings management
- **Groq API**: For accessing the LLaMA 3 language model
- **Python 3.9+**

### Frontend

- **React**: A JavaScript library for building user interfaces
- **Vite**: Next-generation frontend tooling
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: Re-usable components built with Radix UI and Tailwind
- **React Router**: Declarative routing for React applications
- **Axios**: Promise-based HTTP client for making API requests

### AI and Data Processing

- **LLaMA 3**: Open-source large language model for natural language processing
- **RAG (Retrieval-Augmented Generation)**: For enhancing AI responses with external data
- **CSV data ingestion**: For processing local datasets of travel destinations

</details>

## 🏗️ Architecture

<details>
<summary>Click to expand</summary>

AuraTrips follows a modern, scalable architecture:

1. **Frontend**: built with React, providing a responsive and interactive user interface.
2. **Backend API**: FastAPI-powered RESTful API handling user requests, authentication, and AI processing.
3. **Database**: SQLite for development, with easy file based makes it easy to deploy with backend.
4. **AI Processing**: Integration with Groq API for accessing the LLaMA 3 model, enhanced with RAG for personalized recommendations.
5. **External Services**: Google Maps API for location visualization and mapping features.

</details>

## 🚀 Setup and Installation

<details>
<summary>Click to expand</summary>

### Backend

1. Clone the repository:
   ```
   git clone https://github.com/anxkhn/auratrips.git
   cd auratrips/server
   ```

2. Set up a virtual environment:
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
   ```

3. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

4. Set up environment variables:
   ```
   cp .env.example .env
   ```
   Edit the `.env` file with your specific configuration.

5. Run the server:
   ```
   uvicorn app.main:app --reload
   ```

### Frontend

1. Navigate to the client directory:
   ```
   cd ../client
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   ```
   cp .env.example .env
   ```
   Edit the `.env` file with your specific configuration.

4. Run the development server:
   ```
   npm run dev
   ```

</details>

## 📖 Usage

<details>
<summary>Click to expand</summary>

1. Open your browser and navigate to `http://localhost:5173` (or the port specified by Vite).
2. Sign up or log in to your AuraTrips account.
3. Fill in your travel preferences, including destination, budget, interests, and trip duration.
4. Click "Generate Itinerary" to receive your personalized travel plan.
5. Explore and customize your itinerary as needed.

![Usage Demo](https://via.placeholder.com/800x400?text=AuraTrips+Usage+Demo)

</details>

## 🧠 AI and Data Processing

<details>
<summary>Click to expand</summary>

AuraTrips implements a **RAG (Retrieval-Augmented Generation) model** to leverage data from a local CSV file containing information about the best travel destinations. This approach allows us to provide more accurate and up-to-date recommendations by combining the power of large language models with real-world data.

The **open-source LLaMA 3 model** is used for curating and generating personalized itineraries. By utilizing this advanced language model, we can create more natural and context-aware travel plans that truly reflect the user's preferences and interests.

The RAG implementation involves the following steps:

1. **Data Ingestion**: We process a CSV file containing verified travel destination data sourced from Kaggle. This dataset has information about 300+ destinations, and user ratings, providing a rich source of information for generating personalized itineraries.
2. **Retrieval**: When a user inputs their preferences, we use this data to retrieve relevant information about potential destinations and activities.
3. **Generation**: The LLaMA 3 model then uses this retrieved information, along with the user's preferences, to generate a tailored itinerary.


</details>

## 🎨 Design Choices

<details>
<summary>Click to expand</summary>

1. **FastAPI for Backend**: Chosen for its high performance, easy-to-use async capabilities, and built-in support for OpenAPI documentation.
2. **React with Vite for Frontend**: React provides a robust ecosystem for building interactive UIs, while Vite offers lightning-fast build times and hot module replacement.
3. **Tailwind CSS and shadcn/ui**: Allow for rapid UI development with a consistent design language.
4. **RAG Implementation**: Ensures AI-generated itineraries are grounded in real-world data and up-to-date information.
5. **LLaMA 3 via Groq API**: Offers more control over the AI's outputs and potential for future fine-tuning.
6. **CSV Data Integration**: Maintains a curated, high-quality dataset that can be easily updated and expanded.

</details>

## 🚧 Challenges and Solutions

<details>
<summary>Click to expand</summary>

1. **Challenge**: Integrating RAG with LLaMA 3 for accurate travel recommendations.
   **Solution**: Developed a custom pipeline that retrieves relevant information from our CSV dataset based on user preferences, then uses this context to guide the LLaMA 3 model in generating personalized itineraries.

2. **Challenge**: Unable to share with friends and family.
   **Solution**: Added a feature to share the itinerary by downloading it as a PDF file or printing it. Additionally, the unique link can be shared via email.

3. **Challenge**: Expensive to keep using LLaMA 3 model.
   **Solution**: Implemented caching of responses from the LLM to reduce the cost of using the model. Subsequent requests for the same itinerary are essentially free as they are hashed to get a unique id and stored in the database.

</details>

## 🔮 Future Improvements

<details>
<summary>Click to expand</summary>

1. Implement user feedback loops to continuously improve AI recommendations.
2. Integrate real-time pricing and availability data from travel APIs.
3. Develop a mobile app for on-the-go itinerary access and updates.
4. Enable sharing of entire itinerary PDF with friends and family via email.

</details>

## 🚀 Deployment

<details>
<summary>Click to expand</summary>

### Backend

The backend is deployed on Railway and can be accessed at:
https://auratrips-backend-pvt-production.up.railway.app/

### Frontend

The frontend is deployed on Vercel and can be accessed at:
https://auratrips.vercel.app


## Personal Note

I want to extend my sincere apologies for the delay in completing this project and for submitting it as a single commit. Due to unforeseen circumstances and time constraints, I wasn't able to follow my usual development process of making regular, smaller commits.

Despite these limitations, I've put my best effort into creating a comprehensive and innovative solution that meets the requirements of the Atlan Engineering Fellowship Task. I hope that the quality of the code, the thoughtfulness of the architecture, and the creativity in problem-solving shine through in this project.

Thank you for your understanding and for taking the time to review my work. I'm excited about the potential of working at Atlan and would be thrilled to discuss it further.

Made with ❤️ by Anas Khan for Atlan
