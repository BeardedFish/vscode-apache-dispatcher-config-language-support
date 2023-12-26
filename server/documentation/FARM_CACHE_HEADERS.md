The `/headers` property allows you to define the HTTP header types that are going to be cached by the Dispatcher. On the first request to an uncached resource, all headers matching one of the configured values (see the configuration sample below) are stored in a separate file, next to the cache file. On subsequent requests to the cached resource, the stored headers are added to the response.

Presented below is a sample from the default configuration:

```
/cache {
	# ...
	/headers {
		"Cache-Control"
		"Content-Disposition"
		"Content-Type"
		"Expires"
		"Last-Modified"
		"X-Content-Type-Options"
		"Last-Modified"
	}
}
```

**NOTE**: File globbing characters are not allowed. For more details, see [Designing Patterns for glob Properties](https://experienceleague.adobe.com/docs/experience-manager-dispatcher/using/configuring/dispatcher-configuration.html?lang=en#designing-patterns-for-glob-properties).

**NOTE** If you need Dispatcher to store and deliver `ETag` response headers from AEM, do the following:
- Add the header name in the `/cache/headers` section.
- Add the following [Apache directive](https://httpd.apache.org/docs/2.4/mod/core.html#fileetag) in the Dispatcher-related section: `FileETag none`.

---

[Source](https://experienceleague.adobe.com/docs/experience-manager-dispatcher/using/configuring/dispatcher-configuration.html?lang=en#caching-http-response-headers)
