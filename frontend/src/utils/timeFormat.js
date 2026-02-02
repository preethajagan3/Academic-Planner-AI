// Utility function to convert 24-hour time to 12-hour AM/PM format
export const formatTimeTo12Hour = (time24) => {
    if (!time24) return '';

    // Handle both "HH:MM" and "HH:MM:SS" formats
    const [hours, minutes] = time24.split(':');
    let hour = parseInt(hours, 10);
    const minute = minutes || '00';

    const period = hour >= 12 ? 'PM' : 'AM';

    // Convert to 12-hour format
    if (hour === 0) {
        hour = 12; // Midnight
    } else if (hour > 12) {
        hour = hour - 12;
    }

    return `${hour}:${minute} ${period}`;
};

// Convert 12-hour AM/PM time to 24-hour format (for form inputs)
export const formatTimeTo24Hour = (time12) => {
    if (!time12) return '';

    const match = time12.match(/(\d+):(\d+)\s*(AM|PM)/i);
    if (!match) return time12; // Return as-is if not in expected format

    let [, hours, minutes, period] = match;
    let hour = parseInt(hours, 10);

    if (period.toUpperCase() === 'PM' && hour !== 12) {
        hour += 12;
    } else if (period.toUpperCase() === 'AM' && hour === 12) {
        hour = 0;
    }

    return `${String(hour).padStart(2, '0')}:${minutes}`;
};
