module.exports.generateRecommendations = (user, tasks, progressLogs = []) => {
  const tips = [];
  const pending = tasks.filter(t => !t.completed);

  // 1. Productivity Insight
  const totalHours = progressLogs.reduce((sum, p) => sum + (parseFloat(p.hours || p.studyHours || 0)), 0);
  if (totalHours > 0) {
    tips.push({
      title: "Productivity Pulse",
      content: `You've studied a total of ${totalHours.toFixed(1)} hours. Based on your logs, you are most productive during the ${user.preferredStudyTime}.`,
      category: "insight"
    });
  }

  // 2. High-Importance Focus
  const highPriority = pending
    .sort((a, b) => (b.importance || 1) - (a.importance || 1) || new Date(a.deadline) - new Date(b.deadline))
    .slice(0, 2);

  highPriority.forEach(task => {
    tips.push({
      title: `Priority: ${task.title}`,
      content: `This ${task.category || 'task'} has high importance. Try to allocate at least ${task.studyHours || 1} hour(s) before its deadline on ${new Date(task.deadline).toLocaleDateString()}.`,
      category: "recommendation"
    });
  });

  // 3. Subject Affinity Tip
  if (user.topSubjects && user.topSubjects.length > 0) {
    tips.push({
      title: "Subject Affinity",
      content: `You've been focusing a lot on ${user.topSubjects[0]}. Don't forget to balance your other subjects!`,
      category: "tip"
    });
  }

  if (tips.length === 0) {
    tips.push({
      title: "Keep it up!",
      content: "You are doing great. Keep tracking your progress to get more personalized tips!",
      category: "motivation"
    });
  }

  return tips;
};
