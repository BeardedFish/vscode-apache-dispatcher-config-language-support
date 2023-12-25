The `/cache` section controls how Dispatcher caches documents. Configure several sub-properties to implement your caching strategies:

- `/docroot`
- `/statfile`
- `/serveStaleOnError`
- `/allowAuthorized`
- `/rules`
- `/statfileslevel`
- `/invalidate`
- `/invalidateHandler`
- `/allowedClients`
- `/ignoreUrlParams`
- `/headers`
- `/mode`
- `/gracePeriod`
- `/enableTTL`

An example cache section might look as follows:

```
/cache {
	/docroot "/opt/dispatcher/cache"
	/statfile "/tmp/dispatcher-website.stat"
	/allowAuthorized "0"
	/rules {
		# List of files that are cached
	}
	/invalidate {
    	# List of files that are auto-invalidated
	}
}
```

For permission-sensitive caching, read [Caching Secured Content](https://experienceleague.adobe.com/docs/experience-manager-dispatcher/using/configuring/permissions-cache.html?lang=en).

---

[Source](https://experienceleague.adobe.com/docs/experience-manager-dispatcher/using/configuring/dispatcher-configuration.html?lang=en#configuring-the-dispatcher-cache-cache)
