import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Clock, FileText, Trophy, Star, ChevronRight, Filter,
  Play, CheckCircle, AlertCircle, Timer, BarChart3, BookOpen
} from 'lucide-react';

const Tests = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [filterExam, setFilterExam] = useState('All');

  const tabs = [
    { id: 'all', label: 'All Tests', icon: FileText },
    { id: 'free', label: 'Free Tests', icon: CheckCircle },
    { id: 'paid', label: 'Paid Tests', icon: Star },
    { id: 'weekly', label: 'Weekly Test', icon: Timer },
    { id: 'previous', label: 'Previous Papers', icon: BookOpen },
  ];

  const exams = ['All', 'SSC', 'Banking', 'Railway', 'UPSC', 'State PSC', 'UPSSSC', 'Defense'];

  const testSeries = [
    {
      id: 1, title: 'SSC CGL 2026 Mega Test Series', exam: 'SSC', type: 'paid',
      tests: 100, questions: 10000, duration: '60 mins', price: 499, originalPrice: 999,
      rating: 4.9, students: 15420, image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400',
      features: ['Full Length', 'Sectional', 'Topic-wise', 'Bilingual']
    },
    {
      id: 2, title: 'Bank PO Prelims + Mains 2026', exam: 'Banking', type: 'paid',
      tests: 80, questions: 8000, duration: '60 mins', price: 399, originalPrice: 799,
      rating: 4.8, students: 11200, image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400',
      features: ['Prelims', 'Mains', 'GA Capsules', 'Analysis']
    },
    {
      id: 3, title: 'Railway NTPC & Group D 2026', exam: 'Railway', type: 'paid',
      tests: 60, questions: 6000, duration: '90 mins', price: 349, originalPrice: 699,
      rating: 4.7, students: 15600, image: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=400',
      features: ['Technical', 'Non-Technical', 'Previous Year', 'Mock']
    },
    {
      id: 4, title: 'UPSSSC Lower PCS Test Series', exam: 'UPSSSC', type: 'paid',
      tests: 50, questions: 5000, duration: '120 mins', price: 299, originalPrice: 599,
      rating: 4.8, students: 9800, image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400',
      features: ['Complete', 'Hindi Medium', 'PYQs', 'Analysis']
    },
    {
      id: 5, title: 'Free Weekly Test - SSC CGL', exam: 'SSC', type: 'free',
      tests: 1, questions: 100, duration: '60 mins', price: 0, originalPrice: 0,
      rating: 4.6, students: 25000, image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400',
      features: ['Free', 'All India Rank', 'Analysis', 'Solutions']
    },
    {
      id: 6, title: 'SSC CGL Previous Year Papers', exam: 'SSC', type: 'previous',
      tests: 20, questions: 4000, duration: '60 mins', price: 199, originalPrice: 399,
      rating: 4.9, students: 18500, image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400',
      features: ['10 Years', 'Solved', 'Bilingual', 'Analysis']
    },
    {
      id: 7, title: 'UPSC CSAT Practice Tests', exam: 'UPSC', type: 'paid',
      tests: 40, questions: 4000, duration: '120 mins', price: 599, originalPrice: 1199,
      rating: 4.8, students: 6700, image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400',
      features: ['GS Paper', 'CSAT', 'Essay', 'Interview']
    },
    {
      id: 8, title: 'Free Weekly Test - Banking', exam: 'Banking', type: 'free',
      tests: 1, questions: 100, duration: '60 mins', price: 0, originalPrice: 0,
      rating: 4.7, students: 18000, image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400',
      features: ['Free', 'All India Rank', 'Analysis', 'Solutions']
    }
  ];

  const filteredTests = testSeries.filter(test => {
    const matchesTab = activeTab === 'all' || test.type === activeTab;
    const matchesExam = filterExam === 'All' || test.exam === filterExam;
    return matchesTab && matchesExam;
  });

  return (
    <div className="tests-page">
      <div className="tests-hero">
        <div className="container">
          <h1>Test Series</h1>
          <p>Practice with real exam pattern tests and boost your preparation</p>
        </div>
      </div>

      <div className="container">
        <div className="tests-tabs">
          {tabs.map(tab => (
            <button 
              key={tab.id}
              className={activeTab === tab.id ? 'active' : ''}
              onClick={() => setActiveTab(tab.id)}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="tests-filter">
          <div className="filter-label">
            <Filter size={16} /> Filter by Exam:
          </div>
          {exams.map(exam => (
            <button 
              key={exam}
              className={filterExam === exam ? 'active' : ''}
              onClick={() => setFilterExam(exam)}
            >
              {exam}
            </button>
          ))}
        </div>

        <div className="tests-grid">
          {filteredTests.map(test => (
            <div key={test.id} className="test-card">
              <div className="test-image">
                <img src={test.image} alt={test.title} />
                <span className={`test-type ${test.type}`}>{test.type === 'free' ? 'FREE' : test.type === 'previous' ? 'PYQ' : 'PAID'}</span>
              </div>
              <div className="test-content">
                <div className="test-exam">{test.exam}</div>
                <h3>{test.title}</h3>

                <div className="test-meta">
                  <span><FileText size={14} /> {test.tests} Tests</span>
                  <span><BarChart3 size={14} /> {test.questions} Qs</span>
                  <span><Clock size={14} /> {test.duration}</span>
                </div>

                <div className="test-features">
                  {test.features.map((f, i) => (
                    <span key={i}><CheckCircle size={10} /> {f}</span>
                  ))}
                </div>

                <div className="test-footer">
                  <div className="test-price">
                    {test.price === 0 ? (
                      <span className="free">FREE</span>
                    ) : (
                      <>
                        <span className="original">₹{test.originalPrice}</span>
                        <span className="current">₹{test.price}/-</span>
                      </>
                    )}
                  </div>
                  <button className={`btn ${test.price === 0 ? 'btn-secondary' : 'btn-primary'}`}>
                    {test.price === 0 ? 'Start Free' : 'Buy Now'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style >{`
        .tests-page {
          padding-top: 80px;
        }

        .tests-hero {
          background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%);
          padding: 3rem 0;
          color: white;
          text-align: center;
        }

        .tests-hero h1 {
          font-size: 2.5rem;
          font-weight: 800;
          margin-bottom: 0.5rem;
        }

        .tests-hero p {
          opacity: 0.9;
        }

        .tests-tabs {
          display: flex;
          gap: 0.5rem;
          padding: 1.5rem 0;
          overflow-x: auto;
          scrollbar-width: none;
        }

        .tests-tabs::-webkit-scrollbar {
          display: none;
        }

        .tests-tabs button {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.25rem;
          border: 2px solid var(--border);
          border-radius: 0.75rem;
          background: white;
          cursor: pointer;
          font-weight: 600;
          font-size: 0.9rem;
          white-space: nowrap;
          transition: all 0.2s;
        }

        .tests-tabs button.active {
          background: var(--primary);
          color: white;
          border-color: var(--primary);
        }

        .tests-filter {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-wrap: wrap;
          padding: 1rem 0;
          margin-bottom: 1rem;
        }

        .filter-label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 600;
          color: var(--text-dark);
          margin-right: 0.5rem;
        }

        .tests-filter button {
          padding: 0.4rem 1rem;
          border: 1px solid var(--border);
          border-radius: 9999px;
          background: white;
          cursor: pointer;
          font-size: 0.85rem;
          transition: all 0.2s;
        }

        .tests-filter button.active {
          background: var(--primary);
          color: white;
          border-color: var(--primary);
        }

        .tests-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.5rem;
          padding-bottom: 3rem;
        }

        .test-card {
          background: white;
          border-radius: 1rem;
          overflow: hidden;
          box-shadow: var(--shadow-md);
          transition: all 0.3s ease;
        }

        .test-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-xl);
        }

        .test-image {
          position: relative;
          height: 160px;
          overflow: hidden;
        }

        .test-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .test-type {
          position: absolute;
          top: 10px;
          left: 10px;
          padding: 0.25rem 0.75rem;
          border-radius: 0.5rem;
          font-size: 0.7rem;
          font-weight: 700;
        }

        .test-type.free { background: #d1fae5; color: #059669; }
        .test-type.paid { background: #dbeafe; color: #1e40af; }
        .test-type.previous { background: #fef3c7; color: #d97706; }

        .test-content {
          padding: 1.25rem;
        }

        .test-exam {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--primary);
          text-transform: uppercase;
          margin-bottom: 0.5rem;
        }

        .test-content h3 {
          font-size: 1rem;
          font-weight: 700;
          margin-bottom: 0.75rem;
          line-height: 1.3;
        }

        .test-meta {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          margin-bottom: 0.75rem;
          font-size: 0.8rem;
          color: var(--text-light);
        }

        .test-meta span {
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        .test-features {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
          margin-bottom: 1rem;
        }

        .test-features span {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.7rem;
          padding: 0.2rem 0.5rem;
          background: var(--bg-light);
          border-radius: 0.25rem;
          color: var(--text-light);
        }

        .test-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 0.75rem;
          border-top: 1px solid var(--border);
        }

        .test-price {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .test-price .free {
          font-size: 1.1rem;
          font-weight: 800;
          color: var(--success);
        }

        .test-price .original {
          text-decoration: line-through;
          color: var(--text-light);
          font-size: 0.85rem;
        }

        .test-price .current {
          font-size: 1.25rem;
          font-weight: 800;
          color: var(--accent);
        }

        .test-footer .btn {
          padding: 0.5rem 1.25rem;
          font-size: 0.85rem;
        }
      `}</style>
    </div>
  );
};

export default Tests;
