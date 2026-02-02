module.exports.calculatePreferences = (tasks, progressEntries = []) => {
  let evening = 0;
  let morning = 0;
  let totalMinutes = 0;
  let taskCount = 0;

  const subjectDistribution = {};
  const productivityLogs = {}; // Hour -> total hours studied

  // Analyze Tasks for basic stats
  tasks.forEach(t => {
    if (t.studyHours) {
      totalMinutes += t.studyHours * 60;
      taskCount++;
    }
  });

  // Analyze Progress for subject distribution and hourly productivity
  progressEntries.forEach(p => {
    const subject = p.subject || 'General';
    const hours = parseFloat(p.hours || p.studyHours || 0);
    subjectDistribution[subject] = (subjectDistribution[subject] || 0) + hours;

    const hour = new Date(p.date || p.createdAt).getHours();
    const hourStr = String(hour).padStart(2, '0');
    productivityLogs[hourStr] = (productivityLogs[hourStr] || 0) + hours;

    // Explicitly count morning vs evening from logs
    hour >= 18 || hour < 5 ? evening++ : morning++;
  });

  // Fallback to tasks if no logs
  if (progressEntries.length === 0) {
    tasks.forEach(t => {
      const hour = (t.deadline ? new Date(t.deadline) : new Date()).getHours();
      hour >= 18 ? evening++ : morning++;
    });
  }

  // Sort subjects by study time
  const topSubjects = Object.entries(subjectDistribution)
    .sort(([, a], [, b]) => b - a)
    .map(([name]) => name)
    .slice(0, 3);

  return {
    preferredStudyTime: evening > morning ? "Evening" : "Morning",
    avgStudyDuration: taskCount ? Math.round(totalMinutes / taskCount) : 60,
    topSubjects,
    productivityLogs
  };
};
