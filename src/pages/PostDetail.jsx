import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { postAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { AlertCircle, ArrowLeft, Pencil, Trash2 } from 'lucide-react';

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    try {
      setLoading(true);
      const response = await postAPI.getPostById(id);
      setPost(response.data.data);
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        'Failed to fetch post';
      setError(message);
      console.error('Error fetching post:', message, error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await postAPI.deletePost(id);
        navigate('/posts');
      } catch (error) {
        setError('Failed to delete post');
        console.error('Error deleting post:', error);
      }
    }
  };

  if (loading) {
    return <div className="text-sm text-slate-600">Loading…</div>;
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-600" />
          <div className="text-sm text-red-700">{error}</div>
        </div>
      </div>
    );
  }

  if (!post) {
    return <div>Post not found</div>;
  }

  const canEdit = user && (user._id === post.author._id || user.role === 'admin');

  return (
    <div className="mx-auto w-full max-w-3xl space-y-4">
      <div>
        <Link to="/posts" className="inline-flex items-center text-sm font-medium text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to posts
        </Link>
      </div>

      <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 dark:border-slate-800 dark:bg-slate-900">
        {post.imageURL && (
          <div className="mb-6 overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800">
            <img
              src={post.imageURL}
              alt={post.title}
              className="h-64 w-full object-cover"
              loading="lazy"
            />
          </div>
        )}
        <header>
          <h1 className="text-xl sm:text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">{post.title}</h1>
          <div className="mt-3 text-sm text-slate-600 dark:text-slate-300">
            <div>By {post.author.firstName} {post.author.lastName}</div>
            <div>Published on {new Date(post.createdAt).toLocaleDateString()}</div>
            {post.publishedAt && post.publishedAt !== post.createdAt && (
              <div>Updated on {new Date(post.publishedAt).toLocaleDateString()}</div>
            )}
          </div>
        </header>

        <div className="mt-6 prose prose-slate max-w-none dark:prose-invert">
          <p>{post.content}</p>
        </div>

        <footer className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Link
            to="/posts"
            className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-900 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:hover:bg-slate-900"
          >
            Back
          </Link>

          {canEdit && (
            <div className="flex gap-3">
              <Link
                to={`/edit-post/${post._id}`}
                className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-indigo-700"
              >
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </Link>
              <button
                onClick={handleDelete}
                type="button"
                className="inline-flex items-center justify-center rounded-lg border border-red-300 bg-white px-4 py-2.5 text-sm font-medium text-red-700 hover:bg-red-50 dark:border-red-800 dark:bg-red-950/30 dark:text-red-400 dark:hover:bg-red-950/50"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </button>
            </div>
          )}
        </footer>
      </article>
    </div>
  );
};

export default PostDetail;