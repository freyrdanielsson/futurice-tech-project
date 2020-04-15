import { useState, useEffect } from "react";

import { postSubscription } from '../api'

// Needs error handling
export default function usePushNotifications() {
    const [userConsent, setSuserConsent] = useState(Notification.permission);
    const [pushServerSubscriptionId, setPushServerSubscriptionId] = useState();
    const [loading, setLoading] = useState(true);

    // Register service worker
    useEffect(() => {
        const register = async () => {
            if ('serviceWorker' in navigator && 'PushManager' in window) {
                setLoading(true);
                await navigator.serviceWorker.register("/sw.js");
                setLoading(false)
            }
        }
        register();
    }, []);

    // Ask for permission
    useEffect(() => {
        const askUserPermission = async () => {
            setLoading(true);
            const permission = await Notification.requestPermission();
            setSuserConsent(permission);
            setLoading(false);
        }
        askUserPermission();

    }, []);

    // Create (or get existing) push subscription and send to push server
    useEffect(() => {
        const subscribe = async () => {
            setLoading(true);
            const serviceWorker = await navigator.serviceWorker.ready;
            const existingSub = await serviceWorker.pushManager.getSubscription();

            const subscription = existingSub || await serviceWorker.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: 'BIEFQJ0uWcoNDGFm65HFEKjTsSgGgwaaGi-Hz4jASPLF4wY0Py8fn_gwJChrKsBXyS7WNC-INuNhvEB3456_gnY'
            });
            const response = await postSubscription(subscription);
            setPushServerSubscriptionId(response.id);
        }
        subscribe();
    }, [])

    
    return {
        userConsent,
        pushServerSubscriptionId,
        loading
    };
}