# 🌟 AuraTrips:

## AI-Powered Personalized Travel Itinerary Generator




![image](https://github.com/user-attachments/assets/6c105ea9-fba4-4b09-b144-75f4547c5bdc)

![image](https://github.com/user-attachments/assets/08fb84ed-c0dd-404e-9b08-b75a6156872b)

![image](https://github.com/user-attachments/assets/b6f22df6-23f3-4379-8253-852149c2fa99)

![image](https://github.com/user-attachments/assets/c185bf85-776f-4188-afc5-8532b4648aec)


## 📚 Table of Contents

- [Introduction](#-introduction)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#🏗-Architecture)
- [Setup and Installation](#-setup-and-installation)
- [Usage](#-usage)
- [AI and Data Processing](#-ai-and-data-processing)
- [Design Choices](#-design-choices)
- [Challenges and Solutions](#-challenges-and-solutions)
- [Future Improvements](#-future-improvements)
- [Deployment](#-deployment)
- [Personal Note](#-personal-note)

## 🌈 Introduction

AuraTrips is an innovative, **AI-powered travel itinerary generator** designed to create personalized travel experiences based on user preferences. Leveraging cutting-edge AI technologies, including **RAG (Retrieval-Augmented Generation)** and **LLM (Large Language Models)**, AuraTrips curates dream vacations by synthesizing data from thousands of verified travelers' experiences.

This solution addresses the Atlan Engineering Fellowship Task - 2024, focusing on creating a web application that generates tailored travel itineraries. AuraTrips goes beyond the basic requirements, offering a seamless, user-friendly interface coupled with powerful backend processing to deliver dynamic, detailed itineraries that cater to individual needs and preferences.

## ✨ Features

- 🖥️ User-friendly interface for inputting travel preferences
- 🤖 AI-powered itinerary generation using RAG and LLM technologies
- 💡 Personalized recommendations based on budget, interests, and trip duration
- 🗺️ Integration with Google Maps API for location visualization
- 📱 Responsive design for seamless use across devices
- 🔐 User authentication and itinerary saving functionality

## 🛠️ Tech Stack

### Backend

![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![SQLAlchemy](https://img.shields.io/badge/SQLAlchemy-ED2226?style=for-the-badge&logo=sqlalchemy&logoColor=white)
![Pydantic](https://img.shields.io/badge/Pydantic-2A9D8F?style=for-the-badge&logo=pydantic&logoColor=white)
![Groq API](https://img.shields.io/badge/Groq_API-262626?style=for-the-badge&logo=python&logoColor=white)
![Python](https://img.shields.io/badge/Python_3.9+-3776AB?style=for-the-badge&logo=python&logoColor=white)



- **FastAPI**: High-performance, easy-to-use framework for building APIs
- **SQLAlchemy**: SQL toolkit and ORM for database operations
- **Pydantic**: Data validation and settings management
- **Groq API**: For accessing the LLaMA 3 language model
- **Python 3.9+**

### Frontend

![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-262626?style=for-the-badge&logo=radix-ui&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)


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

## 🏗️ Architecture

AuraTrips follows a modern, scalable architecture:

1. **Frontend**: built with React, providing a responsive and interactive user interface.
2. **Backend API**: FastAPI-powered RESTful API handling user requests, authentication, and AI processing.
3. **Database**: SQLite for development, with easy file based makes it easy to deploy with backend.
4. **AI Processing**: Integration with Groq API for accessing the LLaMA 3 model, enhanced with RAG for personalized recommendations.
5. **External Services**: Google Maps API for location visualization and mapping features.

## 🚀 Setup and Installation

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

Signup Page
![image](https://github.com/user-attachments/assets/d2caabf5-f3aa-410e-9f03-6241a1289dec)

Trips Planner Page
![image](https://github.com/user-attachments/assets/bf8e22c7-4a43-46a5-89e1-de4a57420bea)

Travel Page
![image](https://github.com/user-attachments/assets/3321d408-33d9-4df9-a09a-4d5aeac1683e)
![image](https://github.com/user-attachments/assets/6be16b49-c5cc-4c5b-a715-8ece8dfb0537)
![image](https://github.com/user-attachments/assets/04787bae-914d-4817-b70a-31022b6b9e04)



Looks good right? Time to set it up!

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

## 📖 Usage

1. Open your browser and navigate to `http://localhost:5173` (or the port specified by Vite).
2. Sign up or log in to your AuraTrips account.
3. Fill in your travel preferences, including destination, budget, interests, and trip duration.
4. Click "Generate Itinerary" to receive your personalized travel plan.
5. Explore and customize your itinerary as needed.

## 🧠 AI and Data Processing

AuraTrips implements a **RAG (Retrieval-Augmented Generation) model** to leverage data from a local CSV file containing information about the best travel destinations. This approach allows us to provide more accurate and up-to-date recommendations by combining the power of large language models with real-world data.

The **open-source LLaMA 3 model** is used for curating and generating personalized itineraries. By utilizing this advanced language model, we can create more natural and context-aware travel plans that truly reflect the user's preferences and interests.

The RAG implementation involves the following steps:

1. **Data Ingestion**: We process a CSV file containing verified travel destination data sourced from [Kaggle](https://www.kaggle.com/datasets/saketk511/travel-dataset-guide-to-indias-must-see-places). This dataset has information about 300+ destinations, and user ratings, providing a rich source of information for generating personalized itineraries.
2. **Retrieval**: When a user inputs their preferences, we use this data to retrieve relevant information about potential destinations and activities.
3. **Generation**: The LLaMA 3 model then uses this retrieved information, along with the user's preferences, to generate a tailored itinerary.

## 🎨 Design Choices

1. **FastAPI for Backend**: Chosen for its high performance, easy-to-use async capabilities, and built-in support for OpenAPI documentation.
2. **React with Vite for Frontend**: React provides a robust ecosystem for building interactive UIs, while Vite offers lightning-fast build times and hot module replacement.
3. **Tailwind CSS and shadcn/ui**: Allow for rapid UI development with a consistent design language.
4. **RAG Implementation**: Ensures AI-generated itineraries are grounded in real-world data and up-to-date information.
5. **LLaMA 3 via Groq API**: Offers more control over the AI's outputs and potential for future fine-tuning.
6. **CSV Data Integration**: Maintains a curated, high-quality dataset that can be easily updated and expanded.

## 🚧 Challenges and Solutions

1. **Challenge**: Integrating RAG with LLaMA 3 for accurate travel recommendations.
   **Solution**: Developed a custom pipeline that retrieves relevant information from our CSV dataset based on user preferences, then uses this context to guide the LLaMA 3 model in generating personalized itineraries.

2. **Challenge**: Unable to share with friends and family.
   **Solution**: Added a feature to share the itinerary by downloading it as a PDF file or printing it. Additionally, the unique link can be shared via email.

3. **Challenge**: Expensive to keep using LLaMA 3 model.
   **Solution**: Implemented caching of responses from the LLM to reduce the cost of using the model. Subsequent requests for the same itinerary are essentially free as they are hashed to get a unique id and stored in the database.

## 🔮 Future Improvements

1. Implement user feedback loops to continuously improve AI recommendations.
2. Integrate real-time pricing and availability data from travel APIs.
3. Develop a mobile app for on-the-go itinerary access and updates.
4. Enable sharing of entire itinerary PDF with friends and family via email.

## 🚀 Deployment

### Backend

The backend is deployed on Railway and can be accessed at

[https://auratrips-backend-pvt-production.up.railway.app](https://auratrips-backend-pvt-production.up.railway.app).

### Frontend

The frontend is deployed on Vercel and can be accessed at

[https://auratrips.vercel.app](https://auratrips.vercel.app).

## Personal Note

I want to extend my sincere apologies for the delay in completing this project and for submitting it as a single commit. Due to unforeseen circumstances and time constraints, I wasn't able to follow my usual development process of making regular, smaller commits.

Despite these limitations, I've put my best effort into creating a comprehensive and innovative solution that meets the requirements of the Atlan Engineering Fellowship Task. I hope that the quality of the code, the thoughtfulness of the architecture, and the creativity in problem-solving shine through in this project.

Thank you for your understanding and for taking the time to review my work. I'm excited about the potential of working at Atlan and would be thrilled to discuss it further.

Made with ❤️ by Anas Khan for Atlan
