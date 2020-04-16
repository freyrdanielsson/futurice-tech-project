function receivePushNotification(event) {
    console.log("[Service Worker] Push Received.");

    const { image, tag, url, title, text } = event.data.json();

    const options = {
        data: url,
        body: text,
        icon: image,
        vibrate: [200, 100, 200],
        tag: tag,
        image: image,
        actions: [{ action: "Detail", title: "View"}]
    };
    event.waitUntil(this.registration.showNotification(title, options));
}

function openPushNotification(event) {
    console.log("[Service Worker] Notification click Received.", event.notification.data);

    event.notification.close();
    if (event.notification.data) {
        event.waitUntil(this.clients.openWindow(event.notification.data));
    }
}

this.addEventListener("push", receivePushNotification);
this.addEventListener("notificationclick", openPushNotification);
