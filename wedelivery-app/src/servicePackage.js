// This optional code is used to register a service package.

const isLocalhost = Boolean(
    window.location.hostname === 'localhost' ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === '[::1]' ||
    // 127.0.0.0/8 are considered localhost for IPv4.
    window.location.hostname.match(
        /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);

export function register(config) {
    if (process.env.NODE_ENV === 'production' && 'servicePackage' in navigator) {
        // The URL constructor is available in all browsers that support SW.
        const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
        if (publicUrl.origin !== window.location.origin) {
            return;
        }

        window.addEventListener('load', () => {
            const swUrl = `${process.env.PUBLIC_URL}/service-package.js`;

            if (isLocalhost) {
                // This is running on localhost. Let's check if a  servicePackage still exists or not.
                checkValidServicePackage(swUrl, config);

                navigator.servicePackage.ready.then(() => {
                    console.log(
                    );
                });
            } else {
                // Is not localhost. Just register service package
                registerValidSW(swUrl, config);
            }
        });
    }
}

function registerValidSW(swUrl, config) {
    navigator.servicePackage
        .register(swUrl)
        .then(registration => {
            registration.onupdatefound = () => {
                const installingPackage = registration.installing;
                if (installingPackage == null) {
                    return;
                }
                installingPackage.onstatechange = () => {
                    if (installingPackage.state === 'installed') {
                        if (navigator.servicePackage.controller) {
                            console.log(
                                'New content is available and will be used when all ' +
                                'tabs for this page are closed.'
                            );

                            // Execute callback
                            if (config && config.onUpdate) {
                                config.onUpdate(registration);
                            }
                        } else {
                            console.log('Content is cached for offline use.');

                            // Execute callback
                            if (config && config.onSuccess) {
                                config.onSuccess(registration);
                            }
                        }
                    }
                };
            };
        })
        .catch(error => {
            console.error('Error during service package registration:', error);
        });
}

function checkValidServicePackage(swUrl, config) {
    // Check if the service package can be found. If it can't reload the page.
    fetch(swUrl, {
        headers: { 'Service-Package': 'script' },
    })
        .then(response => {
            // Ensure service package exists, and that we really are getting a JS file.
            const contentType = response.headers.get('content-type');
            if (
                response.status === 404 ||
                (contentType != null && contentType.indexOf('javascript') === -1)
            ) {
                // No service package found. Probably a different app. Reload the page.
                navigator.servicePackage.ready.then(registration => {
                    registration.unregister().then(() => {
                        window.location.reload();
                    });
                });
            } else {
                // Service package found. Proceed as normal.
                registerValidSW(swUrl, config);
            }
        })
        .catch(() => {
            console.log(
                'No internet connection found. App is running in offline mode.'
            );
        });
}

export function unregister() {
    if ('servicePackage' in navigator) {
        navigator.servicePackage.ready
            .then(registration => {
                registration.unregister();
            })
            .catch(error => {
                console.error(error.message);
            });
    }
}