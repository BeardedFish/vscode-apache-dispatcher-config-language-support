With the default `/invalidate` property, every activation effectively invalidates all .html files (when their path matches the `/invalidate` section). On a website with considerable traffic, multiple, subsequent activations increase the CPU load on the backend. In such a scenario, it is desirable to "throttle" `.stat` file touching to keep the website responsive. You can accomplish this action by using the `/gracePeriod` property.

The `/gracePeriod` property defines the number of seconds a stale, auto-invalidated resource may still be served from the cache after the last occurring activation. The property can be used in a setup where a batch of activations would otherwise repeatedly invalidate the entire cache. The recommended value is **2 seconds**.

For additional details, also read the [/invalidate](https://experienceleague.adobe.com/docs/experience-manager-dispatcher/using/configuring/dispatcher-configuration.html?lang=en#automatically-invalidating-cached-files) and [/statfileslevel](https://experienceleague.adobe.com/docs/experience-manager-dispatcher/using/configuring/dispatcher-configuration.html?lang=en#invalidating-files-by-folder-level) documentation.

---

[Source](https://experienceleague.adobe.com/docs/experience-manager-dispatcher/using/configuring/dispatcher-configuration.html?lang=en#throttling-stat-file-touching)
