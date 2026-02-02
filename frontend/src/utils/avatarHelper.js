export const detectGender = (name) => {
    if (!name) return 'male';
    const femaleSuffixes = ['a', 'ia', 'ie', 'y', 'shree', 'ini', 'ika', 'ita', 'e', 'u', 'i'];
    const femaleNames = ['mary', 'susan', 'linda', 'sarah', 'karen', 'nancy', 'lily', 'rose', 'preetha', 'ananya', 'diya'];
    const lowerName = name.toLowerCase();
    if (femaleNames.includes(lowerName)) return 'female';
    if (femaleSuffixes.some(suffix => lowerName.endsWith(suffix))) return 'female';
    return 'male';
};

export const getAvatarUrl = (name) => {
    // big-smile is very close to the cute flat illustration style you shared!
    return `https://api.dicebear.com/7.x/big-smile/svg?seed=${name}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf&flip=true`;
};
