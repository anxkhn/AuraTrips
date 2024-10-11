"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Map, Calendar, Star, Zap, Sparkles, Compass } from "lucide-react";

export default function LandingPage() {
  return (
    <main className="flex-1 bg-white text-black">
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-black text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">Aura Trip</h1>
              <h3 className="text-l tracking-tighter sm:text-xl md:text-xl lg:text-xl/none">Your Ultimate AI-Powered Travel Genie</h3>
              <br></br>
              <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl">
                Experience unforgettable journeys tailored just for you. From luxury escapes to budget-friendly adventures, Aura Trip delivers your
                dream vacation using cutting-edge AI technology.
              </p>
            </div>
            <div className="space-x-4">
              <Button asChild className="bg-white text-black hover:bg-gray-200">
                <a href="/signup">Get Started</a>
              </Button>
              <Button asChild variant="outline" className="text-black border-white hover:bg-gray-200">
                <a href="/signin">Sign In</a>
              </Button>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Why Choose Aura Trip?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-white">
              <CardHeader>
                <Zap className="w-8 h-8 mb-2 text-black" />
                <CardTitle>AI-Powered Planning</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Powered by cutting-edge RAG and LLM technology, Aura Trip curates your dream vacation from thousands of verified travelers'
                  experiences.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white">
              <CardHeader>
                <Sparkles className="w-8 h-8 mb-2 text-black" />
                <CardTitle>Personalized Experiences</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  From art galleries to street food tours, Aura Trip crafts the perfect itinerary based on your interests, cuisine preferences, and
                  budget.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white">
              <CardHeader>
                <Compass className="w-8 h-8 mb-2 text-black" />
                <CardTitle>Hassle-Free Adventures</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  No more guesswork or generic suggestions. Aura Trip ensures you have the best time ever, whether you're exploring Delhi's history or
                  Mumbai's nightlife.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">How Aura Trip Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center mb-4">1</div>
              <h3 className="text-xl font-bold mb-2">Share Your Travel Dreams</h3>
              <p className="text-gray-600">Tell us about your ideal Indian adventure, including cities, dates, and interests.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center mb-4">2</div>
              <h3 className="text-xl font-bold mb-2">AI Crafts Your Journey</h3>
              <p className="text-gray-600">Our advanced AI creates a personalized itinerary based on your input and thousands of traveler reviews.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center mb-4">3</div>
              <h3 className="text-xl font-bold mb-2">Rizz Up Your Trip</h3>
              <p className="text-gray-600">Fine-tune your plan and book your unforgettable journey through India with ease.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Suggested Trips</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <a href="/delhi-tour" className="block">
              <Card className="bg-white">
                <img
                  src="https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/09/97/90/12.jpg"
                  alt="Historical Delhi Tour"
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <CardContent className="p-4">
                  <h3 className="text-xl font-bold mb-2">Historical Delhi Tour</h3>
                  <p className="text-gray-600">Explore the rich history of India's capital, from ancient monuments to colonial architecture.</p>
                </CardContent>
              </Card>
            </a>
            <a href="/mumbai-life" className="block">
              <Card className="bg-white">
                <img
                  src="https://lashkariagroup.com/wp-content/uploads/2018/09/11.jpg"
                  alt="Mumbai City Life"
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <CardContent className="p-4">
                  <h3 className="text-xl font-bold mb-2">Mumbai City Life</h3>
                  <p className="text-gray-600">Experience the vibrant energy of Bombay, from Bollywood glamour to street food delights.</p>
                </CardContent>
              </Card>
            </a>
            <a href="/kolkata-culture" className="block">
              <Card className="bg-white">
                <img
                  src="https://tripjive.com/wp-content/uploads/2023/12/Kolkata-local-festivals-and-cultural-events-throughout-the-year-1068x610.jpg"
                  alt="Cultural Kolkata"
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <CardContent className="p-4">
                  <h3 className="text-xl font-bold mb-2">Cultural Kolkata</h3>
                  <p className="text-gray-600">Immerse yourself in the artistic soul of India, exploring literature, music, and Bengali cuisine.</p>
                </CardContent>
              </Card>
            </a>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-black text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl mb-4">Ready to Experience India?</h2>
          <p className="mx-auto max-w-[700px] text-gray-300 mb-8">
            Plan with ease and let Aura Trip craft your perfect Indian itinerary. From the bustling streets of Delhi to the cultural richness of
            Kolkata, your adventure awaits!
          </p>
          <Button asChild size="lg" className="bg-white text-black hover:bg-gray-200">
            <a href="/signup">Start Planning Your Indian Journey</a>
          </Button>
        </div>
      </section>
    </main>
  );
}
