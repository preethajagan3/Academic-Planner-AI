const SUBJECT_KEYWORDS = {
  science: ['physics', 'chemistry', 'biology', 'science', 'lab', 'experiment'],
  mathematics: ['math', 'calculus', 'algebra', 'geometry', 'stats', 'formula'],
  humanities: ['history', 'literature', 'arts', 'social', 'philosophy', 'ethics'],
  technology: ['coding', 'programming', 'devops', 'software', 'database', 'frontend', 'backend', 'js', 'python'],
  professional: ['aptitude', 'professional', 'interview', 'career', 'resume', 'soft skills'],
};

const IMPORTANCE_WEIGHTS = {
  exam: 5,
  test: 4,
  quiz: 3,
  project: 5,
  assignment: 3,
  homework: 2,
  reading: 1,
  urgent: 5,
  critical: 5,
  important: 4,
};

module.exports.analyzeTask = (title = '', description = '', priority = 'medium') => {
  const text = `${title} ${description}`.toLowerCase();

  // Detect Subject
  let category = 'general';
  for (const [subject, keywords] of Object.entries(SUBJECT_KEYWORDS)) {
    if (keywords.some(kw => text.includes(kw))) {
      category = subject;
      break;
    }
  }

  // Calculate Importance
  let importance = priority === 'high' ? 5 : priority === 'medium' ? 3 : 1;
  for (const [kw, weight] of Object.entries(IMPORTANCE_WEIGHTS)) {
    if (text.includes(kw)) {
      importance = Math.max(importance, weight);
    }
  }

  // Detect Type
  let type = 'general';
  const typeKeywords = ['exam', 'test', 'quiz', 'project', 'assignment', 'class', 'lecture'];
  for (const kw of typeKeywords) {
    if (text.includes(kw)) {
      type = kw;
      break;
    }
  }

  return { category, importance, type };
};
