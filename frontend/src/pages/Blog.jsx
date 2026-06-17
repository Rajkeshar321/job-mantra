import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, Clock, User, ChevronRight, Tag, TrendingUp,
  Bell, Briefcase, BookOpen, AlertCircle, Share2, Heart
} from 'lucide-react';

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Posts', icon: BookOpen },
    { id: 'job-alerts', label: 'Job Alerts', icon: Bell },
    { id: 'exam-tips', label: 'Exam Tips', icon: BookOpen },
    { id: 'current-affairs', label: 'Current Affairs', icon: TrendingUp },
    { id: 'success-stories', label: 'Success Stories', icon: Briefcase },
  ];

  const featuredPost = {
    title: 'SSC CGL 2026 Notification Released: Complete Details & Preparation Strategy',
    excerpt: 'Staff Selection Commission has released the official notification for SSC CGL 2026. Get complete details about vacancies, eligibility, exam pattern, and expert preparation strategy.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800',
    date: 'Jun 5, 2026',
    readTime: '8 min read',
    author: 'Rajesh Kumar',
    category: 'job-alerts',
    tags: ['SSC', 'CGL', 'Notification', '2026']
  };

  const posts = [
    {
      id: 1, title: 'Bank PO 2026: SBI & IBPS Exam Calendar Released',
      excerpt: 'Check out the complete exam calendar for SBI PO and IBPS exams in 2026. Important dates and preparation timeline.',
      date: 'Jun 4, 2026', readTime: '5 min', author: 'Priya Singh',
      category: 'job-alerts', tags: ['Banking', 'SBI', 'IBPS'], image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400'
    },
    {
      id: 2, title: '10 Tips to Crack Railway NTPC in First Attempt',
      excerpt: 'Expert tips and strategies to crack Railway NTPC exam in your first attempt. Time management and subject-wise approach.',
      date: 'Jun 3, 2026', readTime: '6 min', author: 'Amit Sharma',
      category: 'exam-tips', tags: ['Railway', 'NTPC', 'Tips'], image: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=400'
    },
    {
      id: 3, title: 'UPSSSC Lower PCS 2025: Syllabus Changes & New Pattern',
      excerpt: 'Important updates about UPSSSC Lower PCS exam pattern and syllabus changes for 2025 recruitment cycle.',
      date: 'Jun 2, 2026', readTime: '4 min', author: 'Vikram Patel',
      category: 'job-alerts', tags: ['UPSSSC', 'Lower PCS', 'Syllabus'], image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400'
    },
    {
      id: 4, title: 'Current Affairs: May 2026 Important Events',
      excerpt: 'Compilation of all important current affairs events from May 2026 for competitive exam preparation.',
      date: 'Jun 1, 2026', readTime: '10 min', author: 'Neha Gupta',
      category: 'current-affairs', tags: ['CA', 'May 2026', 'Events'], image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400'
    },
    {
      id: 5, title: 'How Rahul Cracked SSC CGL with AIR 245',
      excerpt: 'Inspiring success story of Rahul Kumar who achieved AIR 245 in SSC CGL 2025. His preparation strategy and daily routine.',
      date: 'May 30, 2026', readTime: '7 min', author: 'Rahul Kumar',
      category: 'success-stories', tags: ['SSC', 'Success', 'AIR 245'], image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400'
    },
    {
      id: 6, title: 'BSF RO RM 2025: Complete Application Guide',
      excerpt: 'Step-by-step guide to apply for BSF Radio Operator and Mechanic posts. Eligibility, documents, and important dates.',
      date: 'May 28, 2026', readTime: '5 min', author: 'Major Vikram',
      category: 'job-alerts', tags: ['BSF', 'Defense', 'RO RM'], image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400'
    }
  ];

  const jobAlerts = [
    { title: 'SSC CGL 2026', posts: '7500+', lastDate: 'Jul 15, 2026', status: 'Open' },
    { title: 'SBI PO 2026', posts: '2000+', lastDate: 'Jun 30, 2026', status: 'Open' },
    { title: 'Railway NTPC', posts: '35000+', lastDate: 'Jul 20, 2026', status: 'Open' },
    { title: 'UPSSSC Lower PCS', posts: '500+', lastDate: 'Jun 25, 2026', status: 'Closing Soon' },
    { title: 'BSF RO RM', posts: '300+', lastDate: 'Jul 10, 2026', status: 'Open' },
  ];

  const filteredPosts = activeCategory === 'all' 
    ? posts 
    : posts.filter(post => post.category === activeCategory);

  return (
    <div className="blog-page">
      <div className="blog-hero">
        <div className="container">
          <h1>Job Alerts & Blog</h1>
          <p>Latest government job notifications, exam tips, and success stories</p>
        </div>
      </div>

      <div className="container">
        {/* Job Alerts Ticker */}
        <div className="job-alerts-ticker">
          <div className="ticker-label">
            <Bell size={18} /> Latest Job Alerts
          </div>
          <div className="ticker-content">
            {jobAlerts.map((job, idx) => (
              <div key={idx} className={`ticker-item ${job.status === 'Closing Soon' ? 'urgent' : ''}`}>
                <span className="job-title">{job.title}</span>
                <span className="job-posts">{job.posts} Posts</span>
                <span className="job-date">Last: {job.lastDate}</span>
                <span className={`job-status ${job.status === 'Closing Soon' ? 'urgent' : ''}`}>{job.status}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Post */}
        <div className="featured-post">
          <div className="featured-image">
            <img src={featuredPost.image} alt={featuredPost.title} />
          </div>
          <div className="featured-content">
            <div className="featured-meta">
              <span className="featured-category">Job Alert</span>
              <span><Calendar size={14} /> {featuredPost.date}</span>
              <span><Clock size={14} /> {featuredPost.readTime}</span>
            </div>
            <h2>{featuredPost.title}</h2>
            <p>{featuredPost.excerpt}</p>
            <div className="featured-tags">
              {featuredPost.tags.map((tag, i) => (
                <span key={i} className="tag"><Tag size={12} /> {tag}</span>
              ))}
            </div>
            <div className="featured-footer">
              <span className="author"><User size={14} /> {featuredPost.author}</span>
              <button className="btn btn-primary">Read More <ChevronRight size={16} /></button>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="blog-categories">
          {categories.map(cat => (
            <button 
              key={cat.id}
              className={activeCategory === cat.id ? 'active' : ''}
              onClick={() => setActiveCategory(cat.id)}
            >
              <cat.icon size={18} />
              {cat.label}
            </button>
          ))}
        </div>

        {/* Posts Grid */}
        <div className="posts-grid">
          {filteredPosts.map(post => (
            <div key={post.id} className="post-card">
              <div className="post-image">
                <img src={post.image} alt={post.title} />
              </div>
              <div className="post-content">
                <div className="post-meta">
                  <span className="post-category">{post.category.replace('-', ' ')}</span>
                  <span className="post-date"><Calendar size={12} /> {post.date}</span>
                </div>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
                <div className="post-footer">
                  <span className="post-author"><User size={14} /> {post.author}</span>
                  <span className="post-read"><Clock size={14} /> {post.readTime}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style >{`
        .blog-page {
          padding-top: 80px;
        }

        .blog-hero {
          background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%);
          padding: 3rem 0;
          color: white;
          text-align: center;
        }

        .blog-hero h1 {
          font-size: 2.5rem;
          font-weight: 800;
          margin-bottom: 0.5rem;
        }

        .blog-hero p {
          opacity: 0.9;
        }

        .job-alerts-ticker {
          background: white;
          border-radius: 1rem;
          padding: 1rem;
          margin: 1.5rem 0;
          box-shadow: var(--shadow-md);
          display: flex;
          align-items: center;
          gap: 1rem;
          overflow-x: auto;
        }

        .ticker-label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 700;
          color: var(--accent);
          white-space: nowrap;
          padding-right: 1rem;
          border-right: 2px solid var(--border);
        }

        .ticker-content {
          display: flex;
          gap: 1.5rem;
          flex: 1;
        }

        .ticker-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          white-space: nowrap;
          font-size: 0.85rem;
        }

        .ticker-item.urgent {
          animation: pulse 2s infinite;
        }

        .job-title {
          font-weight: 700;
          color: var(--text-dark);
        }

        .job-posts {
          color: var(--primary);
          font-weight: 600;
        }

        .job-date {
          color: var(--text-light);
        }

        .job-status {
          padding: 0.2rem 0.5rem;
          background: #d1fae5;
          color: #059669;
          border-radius: 0.25rem;
          font-size: 0.75rem;
          font-weight: 700;
        }

        .job-status.urgent {
          background: #fee2e2;
          color: #dc2626;
        }

        .featured-post {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          background: white;
          border-radius: 1rem;
          overflow: hidden;
          box-shadow: var(--shadow-lg);
          margin-bottom: 2rem;
        }

        .featured-image {
          height: 100%;
          min-height: 300px;
        }

        .featured-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .featured-content {
          padding: 2rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .featured-meta {
          display: flex;
          gap: 1rem;
          margin-bottom: 1rem;
          font-size: 0.85rem;
          color: var(--text-light);
        }

        .featured-meta span {
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        .featured-category {
          color: var(--primary) !important;
          font-weight: 700;
          text-transform: uppercase;
        }

        .featured-content h2 {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 1rem;
          line-height: 1.3;
        }

        .featured-content p {
          color: var(--text-light);
          line-height: 1.7;
          margin-bottom: 1rem;
        }

        .featured-tags {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
          margin-bottom: 1.5rem;
        }

        .tag {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          padding: 0.25rem 0.75rem;
          background: var(--primary-light);
          color: var(--primary);
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 600;
        }

        .featured-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .author {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.9rem;
          color: var(--text-light);
        }

        .blog-categories {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
          margin-bottom: 2rem;
        }

        .blog-categories button {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.6rem 1.25rem;
          border: 2px solid var(--border);
          border-radius: 0.75rem;
          background: white;
          cursor: pointer;
          font-weight: 600;
          font-size: 0.9rem;
          transition: all 0.2s;
        }

        .blog-categories button.active {
          background: var(--primary);
          color: white;
          border-color: var(--primary);
        }

        .posts-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 1.5rem;
          padding-bottom: 3rem;
        }

        .post-card {
          background: white;
          border-radius: 1rem;
          overflow: hidden;
          box-shadow: var(--shadow-md);
          transition: all 0.3s ease;
        }

        .post-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-xl);
        }

        .post-image {
          height: 180px;
          overflow: hidden;
        }

        .post-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .post-card:hover .post-image img {
          transform: scale(1.1);
        }

        .post-content {
          padding: 1.25rem;
        }

        .post-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.75rem;
        }

        .post-category {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--primary);
          text-transform: uppercase;
        }

        .post-date {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.8rem;
          color: var(--text-light);
        }

        .post-content h3 {
          font-size: 1.05rem;
          font-weight: 700;
          margin-bottom: 0.75rem;
          line-height: 1.3;
        }

        .post-content p {
          font-size: 0.9rem;
          color: var(--text-light);
          line-height: 1.6;
          margin-bottom: 1rem;
        }

        .post-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 0.75rem;
          border-top: 1px solid var(--border);
          font-size: 0.85rem;
          color: var(--text-light);
        }

        .post-footer span {
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        @media (max-width: 768px) {
          .featured-post {
            grid-template-columns: 1fr;
          }

          .featured-image {
            min-height: 200px;
          }

          .job-alerts-ticker {
            flex-direction: column;
            align-items: flex-start;
          }

          .ticker-content {
            flex-direction: column;
            width: 100%;
          }

          .ticker-item {
            flex-wrap: wrap;
          }
        }
      `}</style>
    </div>
  );
};

export default Blog;
