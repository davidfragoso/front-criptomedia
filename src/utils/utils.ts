export const formatTimeAgo = (timestamp: number): string => {
    const now = Date.now();
    const secondsAgo = Math.floor((now - timestamp) / 1000);

    if (secondsAgo < 60) {
        return 'hace un momento';
    } else if (secondsAgo < 3600) {
        const minutes = Math.floor(secondsAgo / 60);
        return `hace ${minutes} minuto${minutes > 1 ? 's' : ''}`;
    } else if (secondsAgo < 86400) {
        const hours = Math.floor(secondsAgo / 3600);
        return `hace ${hours} hora${hours > 1 ? 's' : ''}`;
    } else if (secondsAgo < 604800) {
        const days = Math.floor(secondsAgo / 86400);
        return `hace ${days} día${days > 1 ? 's' : ''}`;
    } else if (secondsAgo < 2592000) {
        const weeks = Math.floor(secondsAgo / 604800);
        return `hace ${weeks} semana${weeks > 1 ? 's' : ''}`;
    } else if (secondsAgo < 31536000) {
        const months = Math.floor(secondsAgo / 2592000);
        return `hace ${months} mes${months > 1 ? 'es' : ''}`;
    } else {
        const years = Math.floor(secondsAgo / 31536000);
        return `hace ${years} año${years > 1 ? 's' : ''}`;
    }
};

export const formatNumber = (num: number): string => {
    if (num >= 1000) {
        return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'mil';
    }
    return num.toString();
};
