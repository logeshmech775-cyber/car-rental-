import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Car, 
  MapPin, 
  Phone, 
  Calendar, 
  Menu, 
  X, 
  MessageSquare, 
  ChevronRight, 
  Star, 
  Target, 
  Eye, 
  Clock,
  CheckCircle,
  Award
} from 'lucide-react';

// --- Data ---

const CARS = [
  {
    id: 1,
    name: "Mahindra XUV 300",
    color: "Red",
    type: "Compact SUV",
    desc: "Powerful 1.5L engine, perfect for hairpin bends and hill stations like Munnar.",
    price: "Custom based on mileage"
  },
  {
    id: 2,
    name: "Innova Crysta 2.5G",
    color: "White",
    type: "Premium Family Car",
    desc: "The king of comfort. Massive luggage space and supreme ride quality for long tours.",
    price: "Contact for Pricing"
  },
  {
    id: 3,
    name: "Maruti Ertiga",
    color: "White",
    type: "Budget 7-Seater",
    desc: "The most economical choice for groups of 6-7. Highly fuel-efficient and reliable.",
    price: "Economical Rates"
  },
  {
    id: 4,
    name: "Swift Dzire",
    color: "White",
    type: "Economy Sedan",
    desc: "Smooth gear shifts and great mileage. Best for couples and small families.",
    price: "Affordable Daily"
  }
];

// --- Components ---

const CarCard = ({ car }: { car: any }) => (
  <div className="group border border-slate-100 rounded-3xl p-8 hover:shadow-2xl transition-all duration-300 bg-white border-l-8 border-l-red-600 relative overflow-hidden">
    <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-full -mr-16 -mt-16 group-hover:bg-red-50 transition-colors" />
    
    <div className="relative z-10">
      <div className="flex justify-between items-start mb-6">
        <div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center text-white group-hover:bg-red-600 transition-colors duration-500 shadow-lg">
          <Car size={28} />
        </div>
        <div className="bg-slate-100 px-4 py-1 rounded-full text-[10px] font-bold text-slate-500 uppercase tracking-widest">
          {car.color}
        </div>
      </div>
      
      <span className="text-[10px] font-bold uppercase tracking-widest text-red-600 mb-2 block">{car.type}</span>
      <h3 className="text-2xl mb-4 font-display font-bold text-slate-900">{car.name}</h3>
      <p className="text-slate-500 leading-relaxed mb-8 h-18 overflow-hidden line-clamp-3">
        {car.desc}
      </p>
      
      <div className="pt-8 border-t border-slate-50 flex items-center justify-between">
        <div>
          <p className="text-[10px] text-slate-400 uppercase font-bold tracking-tighter">Budget Estimate</p>
          <p className="text-lg font-bold text-slate-900">{car.price}</p>
        </div>
        <Link to="/book" className="flex items-center gap-2 bg-slate-900 px-6 py-3 rounded-full text-white hover:bg-red-600 transition-all font-bold text-sm shadow-xl hover:translate-x-1">
          Rent Now <ChevronRight size={18} />
        </Link>
      </div>
    </div>
  </div>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Book Now', path: '/book' },
    { name: 'Our Fleet', path: '/fleet' },
    { name: 'Reviews', path: '/reviews' },
    { name: 'Our Mission', path: '/mission' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 glass shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
          <div className="bg-red-600 p-2 rounded-lg">
            <Car className="text-white w-6 h-6" />
          </div>
          <span className="text-2xl font-bold font-display tracking-tighter">THENI <span className="text-red-600">CARZ</span></span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-sm font-semibold transition-colors hover:text-red-600 ${
                location.pathname === link.path ? 'text-red-600 underline underline-offset-8' : 'text-gray-600'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <a 
            href="tel:9514707734" 
            className="bg-red-600 text-white px-5 py-2.5 rounded-full font-bold text-sm hover:bg-red-700 transition shadow-lg shadow-red-200"
          >
            Call Now
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-20 left-0 w-full bg-white border-b shadow-xl md:hidden flex flex-col p-4 gap-4"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`text-lg font-semibold ${location.pathname === link.path ? 'text-red-600' : 'text-gray-800'}`}
              >
                {link.name}
              </Link>
            ))}
            <a href="tel:9514707734" className="bg-red-600 text-white text-center py-3 rounded-lg font-bold">Call 9514707734</a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer = () => (
  <footer className="bg-slate-900 text-white pt-16 pb-8">
    <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12">
      <div>
        <div className="flex items-center gap-2 mb-6">
          <Car className="text-red-500 w-8 h-8" />
          <span className="text-2xl font-bold font-display tracking-tighter">THENI <span className="text-red-500">CARZ</span></span>
        </div>
        <p className="text-slate-400 leading-relaxed mb-6">
          Your trusted rental partner in South India. Providing safe, reliable, and smooth journeys across Tamil Nadu and Kerala.
        </p>
        <div className="flex gap-4">
          <a href="#" className="p-2 bg-slate-800 rounded-full hover:bg-red-600 transition tracking-tighter"><Phone size={18} /></a>
          <a href="#" className="p-2 bg-slate-800 rounded-full hover:bg-red-600 transition"><MessageSquare size={18} /></a>
          <a href="#" className="p-2 bg-slate-800 rounded-full hover:bg-red-600 transition"><MapPin size={18} /></a>
        </div>
      </div>
      
      <div>
        <h4 className="text-lg font-bold mb-6 underline decoration-red-600 underline-offset-8">Quick Links</h4>
        <ul className="space-y-4 text-slate-400">
          <li><Link to="/fleet" className="hover:text-white transition group flex items-center gap-2"><ChevronRight size={14}/> Available Fleet</Link></li>
          <li><Link to="/book" className="hover:text-white transition group flex items-center gap-2"><ChevronRight size={14}/> Booking Form</Link></li>
          <li><Link to="/reviews" className="hover:text-white transition group flex items-center gap-2"><ChevronRight size={14}/> Customer Reviews</Link></li>
          <li><Link to="/mission" className="hover:text-white transition group flex items-center gap-2"><ChevronRight size={14}/> Our Vision</Link></li>
        </ul>
      </div>
      
      <div>
        <h4 className="text-lg font-bold mb-6 underline decoration-red-600 underline-offset-8">Visit Us</h4>
        <div className="space-y-4 text-slate-400">
          <p className="flex gap-3">
            <MapPin className="text-red-500 shrink-0" />
            Manthaiamman Kovil Street, Ammapuram Road, Vadapudupatti, Theni, Tamil Nadu
          </p>
          <p className="flex gap-3">
            <Phone className="text-red-500 shrink-0" />
            9514707734
          </p>
          <p className="flex gap-3">
            <Clock className="text-red-500 shrink-0" />
            24/7 Available for Bookings
          </p>
        </div>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-4 mt-16 pt-8 border-t border-slate-800 text-center text-slate-500 text-sm">
      &copy; {new Date().getFullYear()} Theni Carz. All Rights Reserved.
    </div>
  </footer>
);

// --- Pages ---

const Home = () => {
  const images = [
    'https://images.unsplash.com/photo-1510674485131-dc88d96369b4?auto=format&fit=crop&q=80&w=2070', // Munnar Tea Gardens
    'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80&w=2042', // Kerala Backwaters
    'https://images.unsplash.com/photo-1593693397690-362ae9666ec2?auto=format&fit=crop&q=80&w=2069', // Western Ghats
    'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=1983' // Road trip view
  ];
  
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent((prev) => (prev + 1) % images.length), 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${images[current]})` }}
          >
            <div className="absolute inset-0 bg-black/50 overflow-hidden" />
          </motion.div>
        </AnimatePresence>
        
        <div className="max-w-7xl mx-auto px-4 w-full relative z-10 text-white">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="max-w-2xl"
          >
            <h1 className="text-5xl md:text-7xl mb-6 leading-tight">
              Drive Your Journey <span className="text-red-500">Your Way.</span>
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-slate-300 font-light max-w-xl">
              Self Drive or With Expert Driver. Reliable cars for the ultimate South Indian exploration.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/book" className="bg-red-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-red-700 transition-all transform hover:scale-105 shadow-xl shadow-red-900/20">
                Book My Car
              </Link>
              <Link to="/fleet" className="bg-white/10 backdrop-blur-md border border-white/20 px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-black transition-all">
                Explore Fleet
              </Link>
            </div>
          </motion.div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((_, i) => (
            <div key={i} className={`h-1.5 rounded-full transition-all duration-500 ${current === i ? 'w-10 bg-red-600' : 'w-4 bg-white/30'}`} />
          ))}
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl mb-4">Our Premium Services</h2>
            <p className="text-slate-600 max-w-2xl mx-auto italic text-lg">"Making every mile a memory since 2015"</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            <div className="bg-white p-10 rounded-3xl shadow-xl hover:shadow-2xl transition group relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-red-50 rounded-bl-full -mr-8 -mt-8 transition-all group-hover:bg-red-100" />
               <div className="relative z-10">
                <div className="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-red-200">
                  <Car className="text-white w-8 h-8" />
                </div>
                <h3 className="text-2xl mb-4 group-hover:text-red-600 transition">Self Drive Cars</h3>
                <p className="text-slate-600 leading-relaxed mb-6">
                  Rent a car and drive on your own. Total freedom, flexible timing, and well-maintained vehicles for the explorer in you.
                </p>
                <Link to="/book" className="inline-flex items-center gap-2 font-bold text-red-600">Get Started <ChevronRight size={18}/></Link>
               </div>
            </div>
            
            <div className="bg-white p-10 rounded-3xl shadow-xl hover:shadow-2xl transition group relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -mr-8 -mt-8 transition-all group-hover:bg-blue-100" />
               <div className="relative z-10">
                <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-slate-200">
                  <Award className="text-white w-8 h-8" />
                </div>
                <h3 className="text-2xl mb-4 group-hover:text-blue-600 transition">With Professional Driver</h3>
                <p className="text-slate-600 leading-relaxed mb-6">
                  Experienced, safe, and courteous drivers. Perfect for family trips, corporate commutes, and local tourism.
                </p>
                <Link to="/book" className="inline-flex items-center gap-2 font-bold text-blue-600">Book Driver <ChevronRight size={18}/></Link>
               </div>
            </div>
          </div>

          {/* Quick Fleet Preview on Home Page */}
          <div className="mt-20">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
              <div>
                <h2 className="text-3xl md:text-4xl mb-4">Choose Your Ride</h2>
                <p className="text-slate-500">Real cars for real journeys. Explore our active fleet.</p>
              </div>
              <Link to="/fleet" className="text-red-600 font-bold border-b-2 border-red-200 hover:border-red-600 transition pb-1">View Full Fleet Details</Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {CARS.map((car) => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const Booking = () => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    pickUp: '',
    dropOff: '',
    date: '',
    carType: 'Mahindra XUV 300'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `*Booking Request - Theni Carz*%0A%0A*Name:* ${formData.name}%0A*Mobile:* ${formData.mobile}%0A*Pick-up:* ${formData.pickUp}%0A*Drop-off:* ${formData.dropOff}%0A*Date:* ${formData.date}%0A*Car Preferred:* ${formData.carType}`;
    window.open(`https://wa.me/919514707734?text=${text}`, '_blank');
  };

  return (
    <div className="pt-32 pb-24 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
          <div className="bg-red-600 md:w-1/3 p-10 text-white flex flex-col justify-center">
            <h2 className="text-3xl mb-6">Book Your Ride</h2>
            <p className="text-red-100 mb-8 font-light">Fill the form and we'll connect with you instantly on WhatsApp to finalize the pricing.</p>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center"><CheckCircle size={20}/></div>
                <p className="text-sm">Verified Vehicles</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center"><Phone size={20}/></div>
                <p className="text-sm">24/7 Support</p>
              </div>
            </div>
          </div>
          
          <div className="p-10 md:w-2/3">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-full">
                <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
                <input 
                  required
                  type="text" 
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition" 
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Mobile Number</label>
                <input 
                  required
                  type="tel" 
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-red-500 outline-none" 
                  placeholder="95147 XXXXX"
                  value={formData.mobile}
                  onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Booking Date</label>
                <input 
                  required
                  type="date" 
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-red-500 outline-none" 
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Pick-up Location</label>
                <input 
                  required
                  type="text" 
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-red-500 outline-none" 
                  placeholder="e.g. Theni, Madurai"
                  value={formData.pickUp}
                  onChange={(e) => setFormData({...formData, pickUp: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Drop-off Location</label>
                <input 
                  required
                  type="text" 
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-red-500 outline-none" 
                  placeholder="Any district in TN/Kerala"
                  value={formData.dropOff}
                  onChange={(e) => setFormData({...formData, dropOff: e.target.value})}
                />
              </div>
              <div className="col-span-full">
                <label className="block text-sm font-bold text-slate-700 mb-2">Vehicle Preferred</label>
                <select 
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-red-500 outline-none"
                  value={formData.carType}
                  onChange={(e) => setFormData({...formData, carType: e.target.value})}
                >
                  <option>Mahindra XUV 300 (Red)</option>
                  <option>Innova Crysta 2.5G (White)</option>
                  <option>Ertiga Mid Variant (White)</option>
                  <option>Swift Dzire (White)</option>
                </select>
              </div>
              <div className="col-span-full pt-4">
                <button type="submit" className="w-full bg-red-600 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-red-700 transform hover:-translate-y-1 transition active:translate-y-0 flex items-center justify-center gap-2">
                  <MessageSquare size={20}/> Confirm via WhatsApp
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const Fleet = () => {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl mb-4">Our Available Fleet</h2>
          <p className="text-slate-500 max-w-xl text-lg font-light leading-relaxed">
            Choose the vehicle that fits your style and group size. All our cars are sanitised, fully serviced, and ready for your next adventure in Tamil Nadu or Kerala.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {CARS.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>

        <div className="mt-20 bg-slate-900 rounded-[3rem] p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 rounded-full blur-3xl -mr-32 -mt-32" />
            <div className="relative z-10 max-w-xl">
              <h3 className="text-3xl mb-4 font-display">Can't decide on a vehicle?</h3>
              <p className="text-slate-400 text-lg leading-relaxed font-light">
                Our expert rental team can help you pick the right car based on your group size, luggage requirements, and the terrain of your destination.
              </p>
            </div>
            <a href="tel:9514707734" className="relative z-10 bg-red-600 px-10 py-5 rounded-full font-bold text-lg hover:bg-red-700 transition shadow-xl shadow-red-900/40">
              Talk to Specialist
            </a>
        </div>
      </div>
    </div>
  );
};

const Reviews = () => {
  const testimonials = [
    { name: "Arjun Kumar", location: "Theni", comment: "Excellent self-drive service. The XUV 300 was in perfect condition. Highly recommended for weekend trips!", stars: 5 },
    { name: "Priya Dharshini", location: "Chennai", comment: "Booked an Innova with driver for a family tour to Munnar. The driver was very professional and knew the best scenic spots.", stars: 5 },
    { name: "Ramesh Raj", location: "Madurai", comment: "The most transparent pricing in Theni. No hidden charges. Very friendly staff.", stars: 5 },
    { name: "Suresh", location: "Kochi", comment: "Needed a car urgent, and they delivered it in 30 minutes to my location. Reliable and fast.", stars: 4 }
  ];

  return (
    <div className="pt-32 pb-24 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-20">
          <span className="text-red-600 font-bold tracking-widest uppercase text-sm mb-4 block">Testimonials</span>
          <h2 className="text-4xl md:text-6xl mb-8">What Our Customers <span className="italic font-light">Truly Say</span></h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((t, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              key={i} 
              className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 flex flex-col justify-between"
            >
              <div>
                <div className="flex gap-1 mb-6 text-yellow-400">
                  {[...Array(t.stars)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <p className="text-lg text-slate-700 leading-relaxed italic mb-8">"{t.comment}"</p>
              </div>
              <div className="flex items-center gap-4 border-t pt-6">
                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center font-bold text-slate-500 uppercase tracking-tighter">
                  {t.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="font-bold text-slate-900">{t.name}</p>
                  <p className="text-sm text-slate-500">{t.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-24 bg-white rounded-[3rem] p-12 md:p-20 shadow-2xl overflow-hidden relative">
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none -mr-20 -mt-20">
            <Award size={400} />
          </div>
          <div className="relative z-10 max-w-2xl">
            <h3 className="text-3xl font-display mb-8">Positive Highlights</h3>
            <div className="space-y-6">
              <div className="flex gap-4">
                <CheckCircle className="text-red-600 shrink-0" />
                <p className="text-slate-600"><strong>Cleanliness First:</strong> Every car undergoes a 30-point hygiene check.</p>
              </div>
              <div className="flex gap-4">
                <CheckCircle className="text-red-600 shrink-0" />
                <p className="text-slate-600"><strong>Roadside Assistance:</strong> 24/7 technical support anywhere in TN and Kerala.</p>
              </div>
              <div className="flex gap-4">
                <CheckCircle className="text-red-600 shrink-0" />
                <p className="text-slate-600"><strong>Flexible Plans:</strong> Hourly, Daily, or Monthly - Choose what fits your budget.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MissionVision = () => (
  <div className="pt-32 pb-24 bg-white min-h-screen">
    <div className="max-w-7xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
        <div>
           <span className="text-red-600 font-bold uppercase tracking-widest text-sm mb-4 block">Who We Are</span>
           <h2 className="text-4xl md:text-5xl mb-8 leading-tight">Driving Innovation in <span className="text-slate-500">Local Travel</span></h2>
           <p className="text-slate-600 text-lg leading-relaxed mb-10">
            Based in the heart of Theni, Theni Carz was founded with a single goal: To liberate travel for locals and tourists alike. We believe reaching your destination should be as pleasurable as the destination itself.
           </p>
           
           <div className="space-y-8">
              <div className="flex gap-6 p-6 rounded-2xl bg-slate-50 hover:bg-red-50 transition">
                <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center shrink-0">
                  <Target className="text-white" />
                </div>
                <div>
                  <h4 className="text-xl mb-2">Our Mission</h4>
                  <p className="text-slate-600 italic">To provide reliable, high-quality, and affordable car rental services that empower our customers to explore South India with absolute peace of mind.</p>
                </div>
              </div>
              <div className="flex gap-6 p-6 rounded-2xl bg-slate-50 hover:bg-slate-100 transition">
                <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center shrink-0">
                  <Eye className="text-white" />
                </div>
                <div>
                  <h4 className="text-xl mb-2">Our Vision</h4>
                  <p className="text-slate-600 italic">To become the leading self-drive and tourism transport provider in Tamil Nadu by 2028, setting the gold standard for vehicle maintenance and customer service.</p>
                </div>
              </div>
           </div>
        </div>
        <div className="relative">
          <div className="aspect-square bg-slate-200 rounded-[4rem] overflow-hidden rotate-3 hover:rotate-0 transition-all duration-700 shadow-2xl">
            <img src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover scale-110" alt="Driving" />
          </div>
          <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-3xl shadow-xl flex items-center gap-4 max-w-xs -rotate-3">
             <div className="bg-green-100 p-3 rounded-full text-green-600"><CheckCircle /></div>
             <p className="font-bold text-slate-800">TRUSTED BY 10,000+ TRAVELERS</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Contact = () => (
  <div className="pt-32 pb-24 bg-slate-50 min-h-screen">
    <div className="max-w-7xl mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-1 space-y-8">
           <h2 className="text-4xl md:text-5xl mb-8">Get In Touch</h2>
           <div className="bg-white p-8 rounded-3xl shadow-xl space-y-8 border border-slate-100">
              <div className="flex gap-6">
                <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center text-red-600 shrink-0"><MapPin /></div>
                <div>
                  <p className="font-bold text-sm text-slate-400 uppercase tracking-widest mb-1">Our Address</p>
                  <p className="text-slate-800 leading-relaxed text-sm">
                    Manthaiamman Kovil Street,<br/>
                    Ammapuram Road, Vadapudupatti,<br/>
                    Theni, Tamil Nadu
                  </p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 shrink-0"><Phone /></div>
                <div>
                  <p className="font-bold text-sm text-slate-400 uppercase tracking-widest mb-1">Call Us</p>
                  <a href="tel:9514707734" className="text-xl font-bold text-slate-900 border-b-2 border-blue-200">9514707734</a>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center text-green-600 shrink-0"><MessageSquare /></div>
                <div>
                  <p className="font-bold text-sm text-slate-400 uppercase tracking-widest mb-1">WhatsApp</p>
                  <a href="https://wa.me/919514707734" className="text-xl font-bold text-slate-900 border-b-2 border-green-200">+91 95147 07734</a>
                </div>
              </div>
           </div>
        </div>
        
        <div className="lg:col-span-2 space-y-12">
          {/* Map Placeholder */}
          <div className="bg-slate-200 rounded-[2rem] h-[400px] overflow-hidden relative shadow-inner group">
             <div className="absolute inset-0 flex flex-col items-center justify-center">
                <MapPin size={48} className="text-red-500 mb-4 animate-bounce" />
                <p className="font-bold text-slate-500 text-lg uppercase tracking-widest">Find us in Theni</p>
                <div className="mt-6">
                  <a href="https://www.google.com/maps/search/Manthaiamman+Kovil+Street,+Ammapuram+Road,+Vadapudupatti,+Theni" target="_blank" className="bg-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-red-600 hover:text-white transition group-hover:scale-105">Open Google Maps</a>
                </div>
             </div>
             {/* Actual map iframe would go here - using placeholder style for design */}
             <div className="absolute inset-0 bg-gradient-to-t from-slate-300/50 block pointer-events-none" />
          </div>
          
          <div className="bg-white p-10 rounded-[2rem] shadow-xl border border-dotted border-slate-200">
             <h3 className="text-2xl mb-6">About Our Location</h3>
             <p className="text-slate-600 leading-relaxed italic">
              Located conveniently in Vadapudupatti, Theni, we are strategically positioned to serve travelers heading towards Munnar, Bodinayakkanur, and Madurai. Our office is open 24/7 for car pickups and drop-offs.
             </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// --- Layout ---

const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-col min-h-screen">
    <Navbar />
    <main className="flex-grow">
      {children}
    </main>
    <Footer />
    
    {/* Floating WhatsApp fab */}
    <a 
      href="https://wa.me/919514707734" 
      target="_blank" 
      className="fixed bottom-8 right-8 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300"
    >
      <MessageSquare size={28} />
    </a>
  </div>
);

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/book" element={<Booking />} />
          <Route path="/fleet" element={<Fleet />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/mission" element={<MissionVision />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Layout>
    </Router>
  );
}
