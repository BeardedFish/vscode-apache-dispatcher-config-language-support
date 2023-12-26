The `/serveStaleOnError` property controls whether Dispatcher returns invalidated documents when the render server returns an error. By default, when a statfile is touched and invalidates cached content, Dispatcher deletes the cached content the next time it is requested.

If `/serveStaleOnError` is set to `1`, Dispatcher does not delete invalidated content from the cache unless the render server returns a successful response. A `5xx` response from the instance or a connection timeout causes Dispatcher to serve the outdated content and respond with and HTTP Status of `111` (Revalidation Failed).

---

[Source](https://experienceleague.adobe.com/docs/experience-manager-dispatcher/using/configuring/dispatcher-configuration.html?lang=en#serving-stale-documents-when-errors-occur)
