import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { postAPI } from '../services/api';
import { 
  Search, 
  Calendar, 
  ArrowRight, 
  BookOpen, 
  Filter,
  ChevronLeft,
  ChevronRight,
  Clock,
  Eye
} from 'lucide-react';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalPosts: 0,
    hasNext: false,
    hasPrev: false
  });

  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    published: 'true'
  });

  useEffect(() => {
    fetchPosts();
  }, [filters.page, filters.limit, filters.published]);

  useEffect(() => {
    if (searchTerm) {
      const filtered = posts.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        `${post.author.firstName} ${post.author.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPosts(filtered);
    } else {
      setFilteredPosts(posts);
    }
  }, [searchTerm, posts]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await postAPI.getAllPosts(filters);
      const data = response?.data?.data;
      if (!data) {
        throw new Error(response?.data?.message || 'Invalid response from server');
      }
      setPosts(data.posts || []);
      setFilteredPosts(data.posts || []);
      setPagination(data.pagination || {
        currentPage: 1,
        totalPages: 1,
        totalPosts: 0,
        hasNext: false,
        hasPrev: false
      });
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Failed to fetch posts';
      setError(message);
      console.error('Error fetching posts:', message, error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    setFilters({ ...filters, page: newPage });
  };

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

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="h-8 w-8 rounded-full border-2 border-slate-200 border-t-indigo-600 dark:border-slate-800"
        />
        <span className="ml-3 text-sm text-slate-600 dark:text-slate-300">Loading posts…</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50">
            <Filter className="h-5 w-5 text-red-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-50">Could not load posts</h3>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{error}</p>
            <button
              onClick={fetchPosts}
              className="mt-4 inline-flex items-center justify-center rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-700"
              type="button"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold text-slate-900 dark:text-slate-50">Posts</h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Browse published posts from the community.</p>
        </div>

        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search posts…"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white py-2 pl-9 pr-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-600/20 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500"
          />
        </div>
      </motion.div>

      {searchTerm && (
        <div className="text-sm text-slate-600 dark:text-slate-300">
          Found {filteredPosts.length} {filteredPosts.length === 1 ? 'post' : 'posts'} for “{searchTerm}”.
        </div>
      )}

      {filteredPosts.length === 0 ? (
        <div className="rounded-xl border border-slate-200 bg-white p-10 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <BookOpen className="mx-auto h-8 w-8 text-slate-400" />
          <h3 className="mt-3 text-sm font-semibold text-slate-900 dark:text-slate-50">No posts found</h3>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Try a different search or create a new post.</p>
          <Link
            to="/create-post"
            className="mt-5 inline-flex items-center justify-center rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-700"
          >
            Create post
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      ) : (
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {filteredPosts.map((post) => (
              <motion.div key={post._id} variants={itemVariants} layout>
                <Link to={`/posts/${post._id}`} className="block h-full rounded-xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow dark:border-slate-800 dark:bg-slate-900">
                  {post.imageURL && (
                    <div className="mb-4 overflow-hidden rounded-lg border border-slate-200 dark:border-slate-800">
                      <img
                        src={post.imageURL}
                        alt={post.title}
                        className="h-40 w-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  )}
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-semibold text-slate-900 line-clamp-2 dark:text-slate-50">{post.title}</h3>
                    <ArrowRight className="mt-1 h-4 w-4 text-slate-400" />
                  </div>

                  <p className="mt-2 text-sm text-slate-600 line-clamp-3 dark:text-slate-300">
                    {post.content.length > 160 ? `${post.content.substring(0, 160)}...` : post.content}
                  </p>

                  <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-500 dark:text-slate-400">
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      {new Date(post.createdAt).toLocaleDateString()}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {Math.ceil(post.content.length / 250)} min read
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Eye className="h-3.5 w-3.5" />
                      {post.views ?? '—'}
                    </span>
                  </div>

                  <div className="mt-3 text-xs text-slate-600 dark:text-slate-300">
                    By {post.author.firstName} {post.author.lastName}
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {pagination.totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-2">
          <button
            onClick={() => handlePageChange(pagination.currentPage - 1)}
            disabled={!pagination.hasPrev}
            className="inline-flex items-center rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 disabled:opacity-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-900"
            type="button"
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Prev
          </button>

          <span className="text-sm text-slate-600 dark:text-slate-300">
            Page {pagination.currentPage} of {pagination.totalPages}
          </span>

          <button
            onClick={() => handlePageChange(pagination.currentPage + 1)}
            disabled={!pagination.hasNext}
            className="inline-flex items-center rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 disabled:opacity-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-900"
            type="button"
          >
            Next
            <ChevronRight className="ml-1 h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Posts;