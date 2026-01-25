import { motion } from "motion/react";
import {
  Activity,
  Brain,
  Heart,
  Sparkles,
  Moon,
  Sun,
  Shield,
  Users,
  TrendingUp,
  PlayCircle,
  ArrowRight,
  Star,
  CheckCircle2,
  Zap,
  Target,
  Award,
} from "lucide-react";
import { useTheme } from "./ThemeProvider";

interface LandingPageProps {
  onGetStarted: () => void;
}

export default function LandingPage({ onGetStarted }: LandingPageProps) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  // Professional color palette
  const colors = {
    light: {
      bg: "#FAFBFF",
      bgSecondary: "#F0F4FF",
      card: "#FFFFFF",
      text: "#1E293B",
      textSecondary: "#64748B",
      accent: "#5B4FE9",
      accentLight: "#7C6FF7",
      accentSecondary: "#00C9A7",
      border: "#E2E8F0",
      gradientFrom: "#5B4FE9",
      gradientTo: "#00C9A7",
    },
    dark: {
      bg: "#0F0D1A",
      bgSecondary: "#1A1625",
      card: "#1E1A2E",
      text: "#F8FAFC",
      textSecondary: "#A0A3BD",
      accent: "#C9A227",
      accentLight: "#E9D5A1",
      accentSecondary: "#8B7DC8",
      border: "#2D2640",
      gradientFrom: "#C9A227",
      gradientTo: "#8B7DC8",
    },
  };

  const c = isDark ? colors.dark : colors.light;
  const gradientTextClass = isDark ? "gradient-text-dark" : "gradient-text-light";

  const features = [
    {
      icon: Brain,
      title: "AI Pose Detection",
      description: "Real-time skeletal tracking ensures correct exercise form with instant accuracy feedback.",
      gradient: isDark ? ["#8B7DC8", "#6B5B9A"] : ["#5B4FE9", "#7C6FF7"],
    },
    {
      icon: Heart,
      title: "Personalized Plans",
      description: "Custom treatment and nutrition plans tailored to your specific recovery goals.",
      gradient: isDark ? ["#C9A227", "#E9D5A1"] : ["#00C9A7", "#34D399"],
    },
    {
      icon: TrendingUp,
      title: "Progress Analytics",
      description: "Comprehensive dashboards with detailed insights into your recovery journey.",
      gradient: isDark ? ["#9F7AEA", "#B794F4"] : ["#8B5CF6", "#A78BFA"],
    },
    {
      icon: Zap,
      title: "Instant Feedback",
      description: "Get real-time corrections during exercise sessions for optimal results.",
      gradient: isDark ? ["#F6AD55", "#ED8936"] : ["#F59E0B", "#FBBF24"],
    },
    {
      icon: Users,
      title: "Doctor Connect",
      description: "Secure messaging and video calls with your healthcare providers.",
      gradient: isDark ? ["#63B3ED", "#4299E1"] : ["#3B82F6", "#60A5FA"],
    },
    {
      icon: Target,
      title: "Goal Tracking",
      description: "Set recovery milestones and celebrate achievements as you progress.",
      gradient: isDark ? ["#FC8181", "#F56565"] : ["#EF4444", "#F87171"],
    },
  ];

  const testimonials = [
    {
      quote: "PhysioAI transformed my recovery journey. The AI feedback helped me maintain proper form even without a therapist present.",
      author: "Sarah Mitchell",
      role: "Knee Surgery Recovery",
    },
    {
      quote: "As a physiotherapist, this platform allows me to monitor my patients' progress remotely while ensuring they exercise correctly.",
      author: "Dr. James Chen",
      role: "Senior Physiotherapist",
    },
    {
      quote: "The personalized treatment plan and daily exercises helped me recover from my sports injury 40% faster than expected.",
      author: "Michael Torres",
      role: "Professional Athlete",
    },
  ];

  return (
    <div
      style={{ backgroundColor: c.bg }}
      className="min-h-screen transition-colors duration-500"
    >
      {/* Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ 
          backgroundColor: isDark ? "rgba(15,13,26,0.9)" : "rgba(250,251,255,0.9)",
          backdropFilter: "blur(12px)",
          borderBottom: `1px solid ${c.border}`,
        }}
        className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <motion.div className="flex items-center gap-3" whileHover={{ scale: 1.02 }}>
            <div
              style={{
                background: `linear-gradient(135deg, ${c.gradientFrom}, ${c.gradientTo})`,
              }}
              className="p-2.5 rounded-xl shadow-lg"
            >
              <Activity className="w-6 h-6 text-white" />
            </div>
            <span style={{ color: c.text }} className="text-2xl font-bold tracking-tight">
              Physio<span style={{ color: c.accent }}>AI</span>
            </span>
          </motion.div>

          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              style={{
                backgroundColor: c.card,
                border: `1px solid ${c.border}`,
              }}
              className="p-2.5 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              {isDark ? (
                <Sun style={{ color: c.accent }} className="w-5 h-5" />
              ) : (
                <Moon style={{ color: c.textSecondary }} className="w-5 h-5" />
              )}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 px-4 overflow-hidden">
        {/* Background gradient orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 8, repeat: Infinity }}
            style={{
              background: `radial-gradient(circle, ${c.gradientFrom}20, transparent 70%)`,
            }}
            className="absolute -top-1/4 -left-1/4 w-[800px] h-[800px] rounded-full"
          />
          <motion.div
            animate={{ 
              scale: [1, 1.15, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{ duration: 10, repeat: Infinity, delay: 2 }}
            style={{
              background: `radial-gradient(circle, ${c.gradientTo}20, transparent 70%)`,
            }}
            className="absolute -bottom-1/4 -right-1/4 w-[700px] h-[700px] rounded-full"
          />
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              backgroundColor: isDark ? "rgba(201,162,39,0.1)" : "rgba(91,79,233,0.08)",
              border: `1px solid ${isDark ? "rgba(201,162,39,0.2)" : "rgba(91,79,233,0.15)"}`,
            }}
            className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full mb-10"
          >
            <motion.div
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Sparkles style={{ color: c.accent }} className="w-4 h-4" />
            </motion.div>
            <span style={{ color: c.accent }} className="text-sm font-semibold">
              AI-Powered Rehabilitation Platform
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{ color: c.text }}
            className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-8 leading-[1.05] tracking-tight"
          >
            Transform Your
            <br />
            <span className={gradientTextClass}>
              Recovery Journey
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ color: c.textSecondary }}
            className="text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Experience personalized physiotherapy with real-time AI pose detection,
            custom treatment plans, and seamless doctor-patient collaboration.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.98 }}
              onClick={onGetStarted}
              style={{
                background: `linear-gradient(135deg, ${c.gradientFrom}, ${c.gradientTo})`,
                boxShadow: `0 20px 40px ${c.gradientFrom}40`,
              }}
              className="group px-8 py-4 text-white rounded-2xl text-lg font-semibold flex items-center gap-3 transition-all duration-300"
            >
              Get Started Free
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight className="w-5 h-5" />
              </motion.span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              style={{
                backgroundColor: c.card,
                border: `2px solid ${c.border}`,
                color: c.text,
              }}
              className="px-8 py-4 rounded-2xl text-lg font-semibold flex items-center gap-3 hover:shadow-lg transition-all duration-300"
            >
              <PlayCircle style={{ color: c.accent }} className="w-5 h-5" />
              Watch Demo
            </motion.button>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap justify-center items-center gap-8"
          >
            {[
              { icon: Shield, text: "HIPAA Compliant" },
              { icon: Users, text: "10K+ Patients" },
              { icon: Award, text: "Award Winning" },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -2 }}
                style={{
                  backgroundColor: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
                  border: `1px solid ${c.border}`,
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-full"
              >
                <item.icon style={{ color: c.accent }} className="w-4 h-4" />
                <span style={{ color: c.textSecondary }} className="text-sm font-medium">
                  {item.text}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ borderColor: c.border }}
            className="w-6 h-10 border-2 rounded-full flex justify-center pt-2"
          >
            <motion.div
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ backgroundColor: c.accent }}
              className="w-1.5 h-1.5 rounded-full"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section style={{ backgroundColor: c.bgSecondary }} className="py-28 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.span
              style={{
                backgroundColor: isDark ? "rgba(201,162,39,0.1)" : "rgba(91,79,233,0.08)",
                color: c.accent,
              }}
              className="inline-block px-4 py-1.5 rounded-full text-sm font-bold tracking-wider mb-6"
            >
              FEATURES
            </motion.span>
            <h2 style={{ color: c.text }} className="text-4xl md:text-5xl font-bold mb-6">
              Cutting-Edge Healthcare
              <br />
              <span className={gradientTextClass}>Technology</span>
            </h2>
            <p style={{ color: c.textSecondary }} className="text-lg max-w-2xl mx-auto">
              AI-powered tools combined with medical expertise for exceptional rehabilitation outcomes.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                style={{
                  backgroundColor: c.card,
                  border: `1px solid ${c.border}`,
                }}
                className="p-8 rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-400"
              >
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  style={{
                    background: `linear-gradient(135deg, ${feature.gradient[0]}, ${feature.gradient[1]})`,
                  }}
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-lg"
                >
                  <feature.icon className="w-7 h-7 text-white" />
                </motion.div>
                <h3 style={{ color: c.text }} className="text-xl font-bold mb-3">
                  {feature.title}
                </h3>
                <p style={{ color: c.textSecondary }} className="leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            background: `linear-gradient(135deg, ${c.gradientFrom}, ${c.gradientTo})`,
          }}
          className="max-w-5xl mx-auto rounded-3xl p-12 shadow-2xl"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "98%", label: "Recovery Rate" },
              { value: "10K+", label: "Happy Patients" },
              { value: "500+", label: "Expert Doctors" },
              { value: "24/7", label: "Support" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                  {stat.value}
                </div>
                <p className="text-white/80 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* How It Works */}
      <section style={{ backgroundColor: c.bgSecondary }} className="py-28 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <span
              style={{
                backgroundColor: isDark ? "rgba(139,125,200,0.1)" : "rgba(0,201,167,0.08)",
                color: isDark ? "#8B7DC8" : "#00C9A7",
              }}
              className="inline-block px-4 py-1.5 rounded-full text-sm font-bold tracking-wider mb-6"
            >
              HOW IT WORKS
            </span>
            <h2 style={{ color: c.text }} className="text-4xl md:text-5xl font-bold">
              Three Simple <span className={gradientTextClass}>Steps</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-10 relative">
            {/* Connecting Line */}
            <div
              style={{
                background: `linear-gradient(90deg, ${c.gradientFrom}, ${c.gradientTo})`,
              }}
              className="hidden md:block absolute top-[60px] left-[16%] right-[16%] h-1 rounded-full opacity-30"
            />

            {[
              { step: "01", title: "Create Account", description: "Sign up and complete your health profile.", icon: Users },
              { step: "02", title: "Connect with Doctor", description: "Get matched with a specialist for your plan.", icon: Heart },
              { step: "03", title: "Start Exercising", description: "Follow AI-guided sessions with real-time feedback.", icon: Activity },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="text-center relative z-10"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  style={{
                    background: `linear-gradient(135deg, ${c.gradientFrom}, ${c.gradientTo})`,
                    boxShadow: `0 15px 40px ${c.gradientFrom}30`,
                  }}
                  className="w-20 h-20 mx-auto rounded-2xl flex items-center justify-center mb-6"
                >
                  <item.icon className="w-10 h-10 text-white" />
                </motion.div>
                <div
                  style={{ color: isDark ? c.border : "#E2E8F0" }}
                  className="text-6xl font-black absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 opacity-50"
                >
                  {item.step}
                </div>
                <h3 style={{ color: c.text }} className="text-xl font-bold mb-2 relative z-10">
                  {item.title}
                </h3>
                <p style={{ color: c.textSecondary }} className="relative z-10">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-28 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span
              style={{
                backgroundColor: isDark ? "rgba(201,162,39,0.1)" : "rgba(139,92,246,0.08)",
                color: isDark ? c.accent : "#8B5CF6",
              }}
              className="inline-block px-4 py-1.5 rounded-full text-sm font-bold tracking-wider mb-6"
            >
              TESTIMONIALS
            </span>
            <h2 style={{ color: c.text }} className="text-4xl md:text-5xl font-bold">
              Trusted by <span className={gradientTextClass}>Thousands</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                style={{
                  backgroundColor: c.card,
                  border: `1px solid ${c.border}`,
                }}
                className="p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all"
              >
                <div className="flex gap-1 mb-5">
                  {[...Array(5)].map((_, j) => (
                    <Star
                      key={j}
                      style={{ color: isDark ? "#C9A227" : "#F59E0B" }}
                      className="w-5 h-5 fill-current"
                    />
                  ))}
                </div>
                <p style={{ color: c.textSecondary }} className="text-lg italic mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <div>
                  <p style={{ color: c.text }} className="font-bold">
                    {testimonial.author}
                  </p>
                  <p style={{ color: c.textSecondary }} className="text-sm">
                    {testimonial.role}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ backgroundColor: c.bgSecondary }} className="py-28 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.div
            animate={{
              boxShadow: [
                `0 0 0 0 ${c.gradientFrom}50`,
                `0 0 0 30px ${c.gradientFrom}00`,
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{
              background: `linear-gradient(135deg, ${c.gradientFrom}, ${c.gradientTo})`,
            }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-3xl mb-10"
          >
            <Sparkles className="w-10 h-10 text-white" />
          </motion.div>

          <h2 style={{ color: c.text }} className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Start Your
            <br />
            <span className={gradientTextClass}>Recovery Journey?</span>
          </h2>
          <p style={{ color: c.textSecondary }} className="text-lg mb-10 max-w-xl mx-auto">
            Join thousands of patients who have transformed their rehabilitation experience with PhysioAI.
          </p>

          <motion.button
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.98 }}
            onClick={onGetStarted}
            style={{
              background: `linear-gradient(135deg, ${c.gradientFrom}, ${c.gradientTo})`,
              boxShadow: `0 20px 50px ${c.gradientFrom}40`,
            }}
            className="px-12 py-5 text-white rounded-2xl text-xl font-bold inline-flex items-center gap-3 mb-8"
          >
            Get Started Now
            <ArrowRight className="w-6 h-6" />
          </motion.button>

          <div className="flex flex-wrap justify-center gap-6">
            {["Free 14-day trial", "No credit card", "Cancel anytime"].map((text, i) => (
              <span key={i} style={{ color: c.textSecondary }} className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                {text}
              </span>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer
        style={{
          backgroundColor: c.bg,
          borderTop: `1px solid ${c.border}`,
        }}
        className="py-12 px-4"
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div
              style={{
                background: `linear-gradient(135deg, ${c.gradientFrom}, ${c.gradientTo})`,
              }}
              className="p-2 rounded-lg"
            >
              <Activity className="w-5 h-5 text-white" />
            </div>
            <span style={{ color: c.text }} className="text-xl font-bold">
              Physio<span style={{ color: c.accent }}>AI</span>
            </span>
          </div>
          <p style={{ color: c.textSecondary }} className="text-sm">
            © 2024 PhysioAI. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy", "Terms", "Contact"].map((link) => (
              <a
                key={link}
                href="#"
                style={{ color: c.textSecondary }}
                className="text-sm hover:underline transition-all"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
