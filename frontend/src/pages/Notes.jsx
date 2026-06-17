import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, Download, BookOpen, Search, Filter, ChevronRight,
  FileQuestion, Calendar, Clock, Star, CheckCircle, Lock, Unlock
} from 'lucide-react';

const Notes = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', label: 'All Notes', icon: FileText },
    { id: 'pdf', label: 'PDF Notes', icon: FileText },
    { id: 'previous', label: 'Previous Papers', icon: FileQuestion },
    { id: 'books', label: 'Books', icon: BookOpen },
    { id: 'syllabus', label: 'Syllabus', icon: CheckCircle },
  ];

  const notes = [
    {
      id: 1, title: 'SSC CGL Complete Study Material', category: 'pdf', exam: 'SSC',
      pages: 500, size: '25 MB', downloads: 45000, rating: 4.9, isFree: true,
      description: 'Complete study material covering all subjects for SSC CGL exam preparation'
    },
    {
      id: 2, title: 'Bank PO Quantitative Aptitude Notes', category: 'pdf', exam: 'Banking',
      pages: 200, size: '12 MB', downloads: 32000, rating: 4.8, isFree: true,
      description: 'Comprehensive quantitative aptitude notes with shortcuts and tricks'
    },
    {
      id: 3, title: 'SSC CGL 2025 Previous Year Paper', category: 'previous', exam: 'SSC',
      pages: 50, size: '5 MB', downloads: 28000, rating: 4.9, isFree: true,
      description: 'Last year SSC CGL paper with detailed solutions and explanations'
    },
    {
      id: 4, title: 'Railway NTPC General Awareness', category: 'pdf', exam: 'Railway',
      pages: 150, size: '8 MB', downloads: 25000, rating: 4.7, isFree: true,
      description: 'Complete general awareness notes for Railway NTPC exam'
    },
    {
      id: 5, title: 'UPSC CSAT Reasoning Book', category: 'books', exam: 'UPSC',
      pages: 300, size: '18 MB', downloads: 15000, rating: 4.8, isFree: false, price: 199,
      description: 'Comprehensive reasoning book for UPSC CSAT preparation'
    },
    {
      id: 6, title: 'UPSSSC Lower PCS Syllabus 2025', category: 'syllabus', exam: 'UPSSSC',
      pages: 10, size: '1 MB', downloads: 18000, rating: 4.6, isFree: true,
      description: 'Detailed syllabus and exam pattern for UPSSSC Lower PCS 2025'
    },
    {
      id: 7, title: 'SSC CHSL Previous 5 Years Papers', category: 'previous', exam: 'SSC',
      pages: 250, size: '15 MB', downloads: 35000, rating: 4.9, isFree: false, price: 99,
      description: 'Last 5 years SSC CHSL solved papers with detailed explanations'
    },
    {
      id: 8, title: 'Banking Current Affairs 2026', category: 'pdf', exam: 'Banking',
      pages: 100, size: '6 MB', downloads: 22000, rating: 4.7, isFree: true,
      description: 'Monthly current affairs compilation for banking exams'
    }
  ];

  const filteredNotes = notes.filter(note => {
    const matchesCategory = activeCategory === 'all' || note.category === activeCategory;
    const matchesSearch = note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         note.exam.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="notes-page">
      <div className="notes-hero">
        <div className="container">
          <h1>Study Material</h1>
          <p>Download PDF notes, previous papers, books, and syllabus</p>
        </div>
      </div>

      <div className="container">
        <div className="notes-search">
          <div className="search-box-large">
            <Search size={20} />
            <input 
              type="text" 
              placeholder="Search notes, papers, books, syllabus..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="notes-categories">
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

        <div className="notes-grid">
          {filteredNotes.map(note => (
            <div key={note.id} className="note-card">
              <div className="note-icon">
                <FileText size={32} />
              </div>
              <div className="note-content">
                <div className="note-header">
                  <span className="note-exam">{note.exam}</span>
                  <span className={`note-badge ${note.isFree ? 'free' : 'paid'}`}>
                    {note.isFree ? <Unlock size={12} /> : <Lock size={12} />}
                    {note.isFree ? 'FREE' : `₹${note.price}`}
                  </span>
                </div>
                <h3>{note.title}</h3>
                <p className="note-description">{note.description}</p>

                <div className="note-meta">
                  <span><FileText size={14} /> {note.pages} pages</span>
                  <span><Download size={14} /> {note.size}</span>
                  <span><Star size={14} fill="#f59e0b" color="#f59e0b" /> {note.rating}</span>
                </div>

                <div className="note-footer">
                  <span className="downloads">{note.downloads.toLocaleString()} downloads</span>
                  <button className={`btn ${note.isFree ? 'btn-primary' : 'btn-secondary'}`}>
                    {note.isFree ? 'Download Free' : 'Buy Now'} <Download size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style >{`
        .notes-page {
          padding-top: 80px;
        }

        .notes-hero {
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
          padding: 3rem 0;
          color: white;
          text-align: center;
        }

        .notes-hero h1 {
          font-size: 2.5rem;
          font-weight: 800;
          margin-bottom: 0.5rem;
        }

        .notes-hero p {
          opacity: 0.8;
        }

        .notes-search {
          padding: 2rem 0;
        }

        .search-box-large {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem 1.5rem;
          background: white;
          border: 2px solid var(--border);
          border-radius: 1rem;
          box-shadow: var(--shadow-sm);
        }

        .search-box-large input {
          flex: 1;
          border: none;
          outline: none;
          font-size: 1rem;
        }

        .notes-categories {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
          margin-bottom: 2rem;
        }

        .notes-categories button {
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

        .notes-categories button.active {
          background: var(--primary);
          color: white;
          border-color: var(--primary);
        }

        .notes-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 1.5rem;
          padding-bottom: 3rem;
        }

        .note-card {
          display: flex;
          gap: 1rem;
          background: white;
          padding: 1.25rem;
          border-radius: 1rem;
          box-shadow: var(--shadow-md);
          transition: all 0.3s ease;
        }

        .note-card:hover {
          transform: translateY(-3px);
          box-shadow: var(--shadow-xl);
        }

        .note-icon {
          width: 56px;
          height: 56px;
          background: var(--primary-light);
          border-radius: 0.75rem;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--primary);
          flex-shrink: 0;
        }

        .note-content {
          flex: 1;
        }

        .note-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.5rem;
        }

        .note-exam {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--primary);
          text-transform: uppercase;
        }

        .note-badge {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          padding: 0.2rem 0.6rem;
          border-radius: 0.5rem;
          font-size: 0.75rem;
          font-weight: 700;
        }

        .note-badge.free {
          background: #d1fae5;
          color: #059669;
        }

        .note-badge.paid {
          background: #fee2e2;
          color: #dc2626;
        }

        .note-content h3 {
          font-size: 1rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          line-height: 1.3;
        }

        .note-description {
          font-size: 0.85rem;
          color: var(--text-light);
          margin-bottom: 0.75rem;
          line-height: 1.5;
        }

        .note-meta {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          margin-bottom: 0.75rem;
          font-size: 0.8rem;
          color: var(--text-light);
        }

        .note-meta span {
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        .note-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 0.75rem;
          border-top: 1px solid var(--border);
        }

        .downloads {
          font-size: 0.8rem;
          color: var(--text-light);
        }

        .note-footer .btn {
          padding: 0.5rem 1rem;
          font-size: 0.8rem;
        }

        @media (max-width: 768px) {
          .notes-grid {
            grid-template-columns: 1fr;
          }

          .note-card {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
};

export default Notes;
