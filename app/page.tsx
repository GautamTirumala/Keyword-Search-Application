"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Truck,
  Shield,
  Zap,
  CheckCircle,
  MapPin,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Filter,
  Disc,
} from "lucide-react"

interface Product {
  id: number
  name: string
  description: string
  features: string[]
  image: string
  category: "brake-pads" | "filters"
}

export default function AmanMarketingLanding() {
  const [products, setProducts] = useState<Product[]>([])
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [showConfetti, setShowConfetti] = useState(false)

  const { scrollYProgress } = useScroll()
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])

  // Mock product data - could be fetched from MERN backend
  useEffect(() => {
    const mockProducts: Product[] = [
      {
        id: 1,
        name: "Heavy-Duty Brake Pads",
        description: "Ceramic and semi-metallic brake pads designed for lorry trucks",
        features: ["Heat-resistant for lorry braking", "Extended lifespan", "Superior stopping power"],
        image: "/brake-pads-for-trucks.jpg",
        category: "brake-pads",
      },
      {
        id: 2,
        name: "High-Flow Air Filters",
        description: "Premium air filters for optimal engine performance",
        features: ["High-flow for dust-heavy roads", "Enhanced filtration", "Easy installation"],
        image: "/truck-air-filter.png",
        category: "filters",
      },
      {
        id: 3,
        name: "Premium Oil Filters",
        description: "Extended life oil filters for heavy-duty engines",
        features: ["Extended life for heavy-duty engines", "Superior filtration", "Corrosion resistant"],
        image: "/oil-filter-for-trucks.jpg",
        category: "filters",
      },
      {
        id: 4,
        name: "Fuel Filters",
        description: "Pure performance filters for fuel efficiency",
        features: ["Pure performance for fuel efficiency", "Water separation", "Long service intervals"],
        image: "/fuel-filter-for-trucks.jpg",
        category: "filters",
      },
    ]
    setProducts(mockProducts)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 3000)
    // Here you would typically send data to your MERN backend
    console.log("Form submitted:", formData)
  }

  const scrollToProducts = () => {
    document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Confetti Effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-accent rounded-full"
              initial={{
                x: Math.random() * window.innerWidth,
                y: -10,
                rotate: 0,
              }}
              animate={{
                y: window.innerHeight + 10,
                rotate: 360,
              }}
              transition={{
                duration: 3,
                delay: Math.random() * 2,
                ease: "easeOut",
              }}
            />
          ))}
        </div>
      )}

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-accent opacity-90"
          style={{ y: heroY, opacity: heroOpacity }}
        />
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/powerful-lorry-truck-on-highway-at-dusk.jpg')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-transparent to-secondary/80" />

        <motion.div
          className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-balance"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
          >
            Aman Marketing: Powering Your Fleet with Premium Brake Pads & Filters
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl lg:text-2xl mb-8 text-pretty opacity-90"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
          >
            Distributors of durable, high-performance parts for lorry trucks—ensuring safety and efficiency on every
            mile.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.1 }}
          >
            <Button
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-4 text-lg font-semibold shadow-2xl hover:shadow-accent/50 transition-all duration-300 hover:scale-105 active:scale-95"
              onClick={scrollToProducts}
            >
              <motion.span whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                Explore Our Products
              </motion.span>
            </Button>
          </motion.div>
        </motion.div>

        {/* Animated scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <motion.div
              className="w-1 h-3 bg-white rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            />
          </div>
        </motion.div>
      </section>

      {/* About Us Section */}
      <section className="py-20 px-4 bg-muted">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="flex justify-center"
            >
              <div className="w-48 h-48 bg-primary rounded-full flex items-center justify-center shadow-2xl">
                <Truck className="w-24 h-24 text-primary-foreground" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary">About Aman Marketing</h2>
              <div className="space-y-4 text-lg text-muted-foreground">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  Aman Marketing is a trusted distributor specializing in premium brake pads and filters for heavy-duty
                  vehicles. We focus on delivering ceramic and semi-metallic brake pads designed to handle the demanding
                  loads of lorry trucks.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  Our comprehensive range includes air, oil, and fuel filters that ensure optimal engine performance,
                  helping your fleet maintain efficiency and reliability on every journey.
                </motion.p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-20 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">Our Premium Products</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover our range of high-quality brake pads and filters designed specifically for heavy-duty trucks and
              lorries.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full group hover:shadow-2xl transition-all duration-300 border-2 hover:border-accent overflow-hidden">
                  <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
                    <div className="relative overflow-hidden">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute top-4 right-4">
                        <Badge variant="secondary" className="bg-secondary text-secondary-foreground">
                          {product.category === "brake-pads" ? (
                            <Disc className="w-4 h-4 mr-1" />
                          ) : (
                            <Filter className="w-4 h-4 mr-1" />
                          )}
                          {product.category === "brake-pads" ? "Brake Pads" : "Filters"}
                        </Badge>
                      </div>
                    </div>
                  </motion.div>

                  <CardHeader>
                    <CardTitle className="text-xl text-primary group-hover:text-accent transition-colors duration-300">
                      {product.name}
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">{product.description}</CardDescription>
                  </CardHeader>

                  <CardContent>
                    <ul className="space-y-2 mb-4">
                      {product.features.map((feature, featureIndex) => (
                        <motion.li
                          key={featureIndex}
                          className="flex items-center text-sm text-muted-foreground"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: featureIndex * 0.1 }}
                          viewport={{ once: true }}
                        >
                          <CheckCircle className="w-4 h-4 text-accent mr-2 flex-shrink-0" />
                          {feature}
                        </motion.li>
                      ))}
                    </ul>

                    <Button
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-300"
                      onClick={() => setShowConfetti(true)}
                    >
                      <motion.span whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        Learn More
                      </motion.span>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 px-4 bg-muted">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">Why Choose Aman Marketing?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We're committed to providing the highest quality parts and exceptional service for your fleet.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Truck,
                title: "Reliability",
                description: "Trusted by fleet operators nationwide for consistent quality and performance.",
                color: "text-primary",
              },
              {
                icon: Shield,
                title: "Quality Assurance",
                description: "Every product undergoes rigorous testing to meet industry standards.",
                color: "text-accent",
              },
              {
                icon: Zap,
                title: "Fast Distribution",
                description: "Quick delivery and efficient logistics to minimize your downtime.",
                color: "text-secondary",
              },
              {
                icon: MapPin,
                title: "Nationwide Coverage",
                description: "Serving customers across the country with comprehensive support.",
                color: "text-primary",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <motion.div
                  whileHover={{
                    scale: 1.1,
                    rotate: [0, -10, 10, -10, 0],
                    transition: { duration: 0.5 },
                  }}
                  className="mb-4 flex justify-center"
                >
                  <div
                    className={`w-16 h-16 rounded-full bg-background shadow-lg flex items-center justify-center group-hover:shadow-xl transition-all duration-300`}
                  >
                    <feature.icon
                      className={`w-8 h-8 ${feature.color} group-hover:scale-110 transition-transform duration-300`}
                    />
                  </div>
                </motion.div>

                <h3 className="text-xl font-semibold mb-2 text-primary group-hover:text-accent transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4 bg-background">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">Get In Touch</h2>
            <p className="text-lg text-muted-foreground">
              Ready to upgrade your fleet? Contact us for expert advice and premium parts.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="text-primary">Send us a message</CardTitle>
                  <CardDescription>Fill out the form and we'll get back to you within 24 hours.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Input
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="border-border focus:border-accent"
                      />
                    </div>
                    <div>
                      <Input
                        type="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        className="border-border focus:border-accent"
                      />
                    </div>
                    <div>
                      <Textarea
                        placeholder="Your Message"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        required
                        className="border-border focus:border-accent min-h-[120px]"
                      />
                    </div>
                    <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-xl font-semibold mb-4 text-primary">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 text-accent mr-3" />
                    <span className="text-muted-foreground">+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="w-5 h-5 text-accent mr-3" />
                    <span className="text-muted-foreground">info@amanmarketing.com</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 text-accent mr-3" />
                    <span className="text-muted-foreground">123 Industrial Drive, Auto City, AC 12345</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4 text-primary">Follow Us</h3>
                <div className="flex space-x-4">
                  {[
                    { icon: Facebook, href: "#" },
                    { icon: Twitter, href: "#" },
                    { icon: Instagram, href: "#" },
                  ].map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      whileHover={{
                        scale: 1.2,
                        rotate: 360,
                        transition: { duration: 0.3 },
                      }}
                      className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center hover:bg-accent transition-colors duration-300"
                    >
                      <social.icon className="w-5 h-5" />
                    </motion.a>
                  ))}
                </div>
              </div>

              <div className="bg-muted p-6 rounded-lg">
                <h4 className="font-semibold mb-2 text-primary">Business Hours</h4>
                <div className="text-sm text-muted-foreground space-y-1">
                  <div>Monday - Friday: 8:00 AM - 6:00 PM</div>
                  <div>Saturday: 9:00 AM - 4:00 PM</div>
                  <div>Sunday: Closed</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Truck className="w-8 h-8 mr-2" />
                <span className="text-xl font-bold">Aman Marketing</span>
              </div>
              <p className="text-primary-foreground/80 text-sm">
                Your trusted partner for premium brake pads and filters for heavy-duty vehicles.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Products</h4>
              <ul className="space-y-2 text-sm text-primary-foreground/80">
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    Brake Pads
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    Air Filters
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    Oil Filters
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    Fuel Filters
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-primary-foreground/80">
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    News
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-primary-foreground/80">
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    Warranty
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-sm text-primary-foreground/80">
            <p>&copy; 2024 Aman Marketing. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
