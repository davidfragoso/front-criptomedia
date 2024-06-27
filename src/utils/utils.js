// se formatea la diferencia de tiempo en una cadena legible
export const formatTimeAgo = (timestamp) => {
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

export const formatNumber = (num) => {
    if (num === undefined || num === null) return '0'; 
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'mil';
    }
    return num.toString();
};

// Trunca un texto a un límite de caracteres especificado
export const truncateText = (text, limit) => {
    if (text.length <= limit) {
        return text;
    }
    return text.slice(0, limit) + '...';
};

// Valida si un email tiene un formato válido
export const isValidEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
};

// Convierte una fecha en formato legible
export const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
};

// Genera una cadena de caracteres aleatoria
export const generateRandomString = (length) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
};

// Nueva función para formatear el tiempo en formato HH:MM
export const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
};

// Función para formatear el encabezado de fecha en los mensajes
export const formatDateHeader = (timestamp) => {
    const messageDate = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    if (messageDate.toDateString() === today.toDateString()) {
        return 'Hoy';
    } else if (messageDate.toDateString() === yesterday.toDateString()) {
        return 'Ayer';
    } else {
        return messageDate.toLocaleDateString();
    }
};
