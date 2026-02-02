module.exports.findSmartSlots = (timetableEntries, pendingTasks) => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const suggestions = [];

    days.forEach(day => {
        const dayEntries = timetableEntries
            .filter(e => e.day === day)
            .sort((a, b) => (a.startTime || '').localeCompare(b.startTime || ''));

        // Simple gap analysis: Assume study slots are between 08:00 and 22:00
        // If there's a gap of > 1 hour, suggest it.
        let lastEnd = "08:00";

        dayEntries.forEach(entry => {
            if (entry.startTime > lastEnd) {
                suggestions.push({
                    day,
                    start: lastEnd,
                    end: entry.startTime,
                    type: 'gap'
                });
            }
            lastEnd = entry.endTime > lastEnd ? entry.endTime : lastEnd;
        });

        if (lastEnd < "22:00") {
            suggestions.push({
                day,
                start: lastEnd,
                end: "22:00",
                type: 'evening'
            });
        }
    });

    // Pick top 3 slots that are soon
    return suggestions.slice(0, 3).map(slot => ({
        ...slot,
        message: `You have a free slot on ${slot.day} from ${slot.start} to ${slot.end}. Perfect for a study session!`
    }));
};
