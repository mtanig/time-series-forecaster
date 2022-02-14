export class WindowHelper {
    static setLocationHref(href: string) {
        window.location.href = href;
        return;
    }

    static btoa(str: string) {
        return window.btoa(str);
    }

    static atob(str: string) {
        return window.atob(str);
    }
}