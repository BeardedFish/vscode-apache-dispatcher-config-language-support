Time-based cache invalidation depends on the `/enableTTL` property and the presence of regular expiration headers from the HTTP standard. If you set the property to 1 (`/enableTTL "1"`), it evaluates the response headers from the backend. If the headers contain a `Cache-Control`, `max-age` or `Expires` date, an auxiliary, empty file next to the cached file is created, with the modification time equal to the expiry date. When the cached file is requested past the modification time, it is automatically re-requested from the backend.

Before Dispatcher 4.3.5, the TTL invalidation logic was based only on the configured TTL value. With Dispatcher 4.3.5, both the set TTL and the Dispatcher cache invalidation rules are accounted for. As such, for a cached file:
- If `/enableTTL` is set to `1`, the file expiration is checked. If the file has expired according to the set TTL, no other checks are performed and the cached file is re-requested from the backend.
- If the file has either not expired, or `/enableTTL` is not configured, then the standard cache invalidation rules are applied such as those rules that are set by [/statfileslevel](https://experienceleague.adobe.com/docs/experience-manager-dispatcher/using/configuring/dispatcher-configuration.html?lang=en#invalidating-files-by-folder-level) and [/invalidate](https://experienceleague.adobe.com/docs/experience-manager-dispatcher/using/configuring/dispatcher-configuration.html?lang=en#automatically-invalidating-cached-files). This flow means that Dispatcher can invalidate files for which the TTL has not expired.

This new implementation supports use cases where files have a longer TTL (for example, on the CDN) but can still be invalidated even if the TTL has not expired. It favors content freshness over cache-hit ratio on the Dispatcher.

Conversely, in case you need only the expiration logic applied to a file then set `/enableTTL` to `1` and exclude that file from the standard cache invalidation mechanism. For example, you can:

- To ignore the file, configure the [invalidation rules](https://experienceleague.adobe.com/docs/experience-manager-dispatcher/using/configuring/dispatcher-configuration.html?lang=en#automatically-invalidating-cached-files) in the cache section. In the snippet below, all files ending in .example.html are ignored and expire only when the set TTL has passed.
	```
	/invalidate {
		/0000 { /glob "*" /type "deny" }
		/0001 { /glob "*.html" /type "allow" }
		/0002 { /glob "*.example.html" /type "deny" }
	}
	```
- Design the content structure in such a way that you can set a high [/statfilelevel](https://experienceleague.adobe.com/docs/experience-manager-dispatcher/using/configuring/dispatcher-configuration.html?lang=en#invalidating-files-by-folder-level) so the file is not automatically invalidated.

Doing so ensures that `.stat` file invalidation is not used and only TTL expiration is active for the specified files.

**NOTE:** Keep in mind that setting `/enableTTL` to `1` enables TTL caching only on the dispatcher side. As such, the TTL information contained in the additional file (see above) is not provided to any other useragent requesting such a file type from the dispatcher. If you want to provide caching headers to downstream systems like a CDN or a browser, you should configure the `/cache/headers` section accordingly.

**NOTE:** This feature is available in version **4.1.11** or later of the Dispatcher.

---

[Source](https://experienceleague.adobe.com/docs/experience-manager-dispatcher/using/configuring/dispatcher-configuration.html?lang=en#configuring-time-based-cache-invalidation-enablettl)
