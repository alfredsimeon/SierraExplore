import { Navigation } from "/components/navigation"

export const metadata = {
  title: "About Us - Sierra Explore",
  description: "Learn about Sierra Explore and our mission to showcase the beauty of Sierra Leone.",
}

export default function AboutPage() {
  return (
    <main>
      <Navigation />
      <div className="pt-16">
        <div className="container px-4 py-12 mx-auto">
          <div className="p-6 rounded-lg card-overlay">
            <h1 className="mb-8 text-4xl font-bold text-center">About Sierra Explore</h1>

            <div className="max-w-4xl mx-auto space-y-8">
              <section>
                <h2 className="mb-4 text-2xl font-semibold">Our Mission</h2>
                <p className="text-lg">
                  Sierra Explore is dedicated to showcasing the natural beauty, rich culture, and warm hospitality of
                  Sierra Leone. Our mission is to promote sustainable tourism that benefits local communities while
                  providing unforgettable experiences for travelers from around the world.
                </p>
              </section>

              <section>
                <h2 className="mb-4 text-2xl font-semibold">Our Story</h2>
                <p className="mb-4">
                  Founded in 2020 by a group of passionate Sierra Leoneans and international tourism experts, Sierra
                  Explore was born from a desire to change the narrative about Sierra Leone and highlight its potential
                  as a premier tourist destination in West Africa.
                </p>
                <p>
                  After years of civil war and the Ebola crisis, Sierra Leone has emerged as a peaceful, stable country
                  with incredible untapped tourism potential. Our team recognized the opportunity to create a platform
                  that would connect travelers with authentic experiences while contributing to the country's economic
                  development.
                </p>
              </section>

              <section>
                <h2 className="mb-4 text-2xl font-semibold">What We Offer</h2>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="p-4 border rounded-lg">
                    <h3 className="mb-2 text-xl font-medium">Curated Experiences</h3>
                    <p>
                      We carefully select and vet all accommodations, tours, and activities to ensure they meet our
                      standards for quality, authenticity, and sustainability.
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h3 className="mb-2 text-xl font-medium">Local Expertise</h3>
                    <p>
                      Our team includes local guides and tourism professionals with deep knowledge of Sierra Leone's
                      history, culture, and natural attractions.
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h3 className="mb-2 text-xl font-medium">Community Impact</h3>
                    <p>
                      We prioritize partnerships with locally-owned businesses and community-based tourism initiatives
                      to ensure tourism benefits reach local people.
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h3 className="mb-2 text-xl font-medium">Personalized Service</h3>
                    <p>
                      From the moment you book until the end of your journey, our team provides personalized support to
                      ensure your Sierra Leone experience exceeds expectations.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="mb-4 text-2xl font-semibold">Our Values</h2>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="inline-block w-6 h-6 mr-2 text-center text-white bg-green-600 rounded-full">
                      1
                    </span>
                    <div>
                      <h3 className="font-medium">Sustainability</h3>
                      <p>We promote environmentally responsible tourism practices and support conservation efforts.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-6 h-6 mr-2 text-center text-white bg-green-600 rounded-full">
                      2
                    </span>
                    <div>
                      <h3 className="font-medium">Community Empowerment</h3>
                      <p>
                        We believe tourism should create opportunities and improve livelihoods for local communities.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-6 h-6 mr-2 text-center text-white bg-green-600 rounded-full">
                      3
                    </span>
                    <div>
                      <h3 className="font-medium">Cultural Respect</h3>
                      <p>We encourage respectful cultural exchange and the preservation of Sierra Leone's heritage.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-6 h-6 mr-2 text-center text-white bg-green-600 rounded-full">
                      4
                    </span>
                    <div>
                      <h3 className="font-medium">Excellence</h3>
                      <p>We strive for excellence in all our services and continuously seek to improve.</p>
                    </div>
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="mb-4 text-2xl font-semibold">Meet Our Team</h2>
                <div className="grid gap-6 md:grid-cols-3">
                  <div className="text-center">
                    <div className="w-32 h-32 mx-auto mb-4 overflow-hidden rounded-full bg-gray-200">
                      <img src="/images/team-1.jpg" alt="Team Member" className="object-cover w-full h-full" />
                    </div>
                    <h3 className="font-medium">Aminata Kamara</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Founder & CEO</p>
                  </div>
                  <div className="text-center">
                    <div className="w-32 h-32 mx-auto mb-4 overflow-hidden rounded-full bg-gray-200">
                      <img src="/images/team-2.jpg" alt="Team Member" className="object-cover w-full h-full" />
                    </div>
                    <h3 className="font-medium">Mohamed Bangura</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Head of Operations</p>
                  </div>
                  <div className="text-center">
                    <div className="w-32 h-32 mx-auto mb-4 overflow-hidden rounded-full bg-gray-200">
                      <img src="/images/team-3.jpg" alt="Team Member" className="object-cover w-full h-full" />
                    </div>
                    <h3 className="font-medium">Sarah Johnson</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Marketing Director</p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="mb-4 text-2xl font-semibold">Contact Us</h2>
                <div className="p-6 border rounded-lg">
                  <p className="mb-4">
                    Have questions or ready to plan your Sierra Leone adventure? Get in touch with our team!
                  </p>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <h3 className="font-medium">Email</h3>
                      <p>info@sierraexplore.com</p>
                    </div>
                    <div>
                      <h3 className="font-medium">Phone</h3>
                      <p>+232 76 123456</p>
                    </div>
                    <div>
                      <h3 className="font-medium">Office</h3>
                      <p>15 Wilkinson Road, Freetown, Sierra Leone</p>
                    </div>
                    <div>
                      <h3 className="font-medium">Hours</h3>
                      <p>Monday-Friday: 9am-5pm</p>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
