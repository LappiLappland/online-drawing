export default function fetcher<T>(url: string, init?: RequestInit) {
    return fetch('http://localhost:3000' + url, init).then((r) => {
        if (!r.ok) throw new Error('Network response was not ok');
        return r.json() as T;
    });
}
