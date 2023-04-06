export default function getCookie(name: string) {
    const cookieStr = document.cookie;
    const cookies = cookieStr.split("; ");

    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].split("=");
        if (cookie[0] === name) {
            return cookie[1];
        }
    }

    return null;
}