import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { 
  PenTool, 
  BookOpen, 
  Users, 
  ArrowRight, 
  Sparkles, 
  Heart,
  TrendingUp,
  Star
} from 'lucide-react';

const Home = () => {
  const { isAuthenticated } = useAuth();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut'
      }
    }
  };

  const features = [
    {
      icon: PenTool,
      title: 'Create',
      description: 'Write and publish your blog posts with our intuitive editor',
      color: 'from-blue-500 to-cyan-500',
      delay: 0.1
    },
    {
      icon: BookOpen,
      title: 'Read',
      description: 'Discover amazing content from talented writers worldwide',
      color: 'from-purple-500 to-pink-500',
      delay: 0.2
    },
    {
      icon: Users,
      title: 'Share',
      description: 'Connect with other bloggers and grow your audience',
      color: 'from-green-500 to-emerald-500',
      delay: 0.3
    }
  ];

  const stats = [
    { icon: TrendingUp, label: 'Active Writers', value: '10K+' },
    { icon: BookOpen, label: 'Published Posts', value: '50K+' },
    { icon: Users, label: 'Happy Readers', value: '100K+' },
    { icon: Heart, label: 'Total Likes', value: '1M+' }
  ];

  return (
    <div className="space-y-16">
      <div className="relative">
        <div aria-hidden="true" className="pointer-events-none absolute -inset-6 -z-10 overflow-hidden">
          <div className="absolute left-1/2 top-0 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-indigo-400/25 via-fuchsia-400/20 to-sky-400/25 blur-3xl dark:from-indigo-500/25 dark:via-fuchsia-500/20 dark:to-sky-500/25" />
          <div className="absolute left-6 top-12 h-56 w-56 rounded-full bg-gradient-to-br from-emerald-300/20 to-cyan-300/20 blur-3xl dark:from-emerald-500/15 dark:to-cyan-500/15" />
          <div className="absolute right-6 bottom-0 h-56 w-56 rounded-full bg-gradient-to-tr from-purple-400/20 to-indigo-400/15 blur-3xl dark:from-purple-500/20 dark:to-indigo-500/15" />
        </div>

        <div className="relative rounded-2xl">
          <section
            className="relative rounded-2xl bg-white border-[2px] shadow-sm p-8 sm:p-12 dark:bg-slate-900 dark:border-slate-800"
            style={{
              borderImage: `linear-gradient(90deg, rgba(99,102,241,0.85), rgba(236,72,153,0.65), rgba(14,165,233,0.7), rgba(99,102,241,0.85)) 1`,
              animation: 'hueRotate 10s linear infinite',
            }}
          >
            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="max-w-3xl">
              <motion.div variants={itemVariants} className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                <Sparkles className="h-4 w-4" />
                Publish, share, and grow your audience.
              </motion.div>

              <motion.h1 variants={itemVariants} className="mt-4 text-3xl sm:text-5xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">
                A clean place for your ideas.
              </motion.h1>

              <motion.p variants={itemVariants} className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300">
                Write posts, keep them as drafts, or publish instantly. Simple, fast, and focused.
              </motion.p>
              <motion.div variants={itemVariants} className="mt-8 flex flex-col sm:flex-row gap-3">
                {!isAuthenticated ? (
                  <>
                    <Link
                      to="/register"
                      className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-indigo-700"
                    >
                      Get started
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                    <Link
                      to="/login"
                      className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-900 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:hover:bg-slate-900"
                    >
                      Sign in
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      to="/posts"
                      className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-indigo-700"
                    >
                      View posts
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                    <Link
                      to="/create-post"
                      className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-900 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:hover:bg-slate-900"
                    >
                      Create a post
                    </Link>
                  </>
                )}
              </motion.div>
            </motion.div>
          </section>
        </div>
      </div>

      <section>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="group rounded-xl bg-white border border-slate-200 p-4 shadow-sm transition-all duration-300 ease-out hover:scale-[1.03] hover:shadow-lg hover:shadow-indigo-500/10 hover:border-indigo-200 dark:bg-slate-900 dark:border-slate-800 dark:hover:shadow-indigo-500/10 dark:hover:border-indigo-700"
            >
              <div className="flex items-center justify-between">
                <stat.icon className="h-5 w-5 text-slate-500 transition-colors duration-300 group-hover:text-indigo-600 dark:text-slate-400 dark:group-hover:text-indigo-400" />
                <span className="text-lg font-semibold text-slate-900 dark:text-slate-50">{stat.value}</span>
              </div>
              <div className="mt-1 text-sm text-slate-600 dark:text-slate-300">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 dark:text-slate-50">Everything you need</h2>
            <p className="mt-1 text-sm sm:text-base text-slate-600 dark:text-slate-300">Write, publish, and manage your posts.</p>
          </div>
          <Star className="hidden sm:block h-5 w-5 text-slate-400 dark:text-slate-600" />
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              whileHover={{ scale: 1.03, y: -4 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <Link
                to={feature.title === 'Create' ? '/create-post' : feature.title === 'Read' ? '/posts' : '/profile'}
                className="group block rounded-xl bg-white border border-slate-200 p-6 shadow-sm transition-all duration-300 ease-out hover:shadow-lg hover:shadow-indigo-500/10 hover:border-indigo-200 dark:bg-slate-900 dark:border-slate-800 dark:hover:shadow-indigo-500/10 dark:hover:border-indigo-700"
              >
                <feature.icon className="h-6 w-6 text-indigo-600 transition-transform duration-300 group-hover:scale-110" />
                <h3 className="mt-3 font-semibold text-slate-900 dark:text-slate-50">{feature.title}</h3>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{feature.description}</p>
                <div className="mt-4 inline-flex items-center text-sm font-medium text-indigo-600 group-hover:text-indigo-700">
                  Learn more <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

Home.displayName = 'Home';

export default Home;