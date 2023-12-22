The `/vanity_urls` property is used to configure Dispatcher to enable access to vanity URLs that are configured for your AEM pages.

When access to vanity URLs is enabled, Dispatcher periodically calls a service that runs on the render instance to obtain a list of vanity URLs. Dispatcher stores this list in a local file. When a request for a page is denied due to a filter in the `/filter` section, Dispatcher consults the list of vanity URLs. If the denied URL is on the list, Dispatcher allows access to the vanity URL.

To enable access to vanity URLs, add a `/vanity_urls` section to the `/farms` section, similar to the following example:

```
/vanity_urls {
	/url "/libs/granite/dispatcher/content/vanityUrls.html"
	/file "/tmp/vanity_urls"
	/delay 300
}
```

**NOTE**: If your render is an instance of AEM, you must install the [VanityURLS-Components package from Software Distribution](https://experience.adobe.com/#/downloads/content/software-distribution/en/aem.html?package=/content/software-distribution/en/details.html/content/dam/aem/public/adobe/packages/granite/vanityurls-components) to enable the vanity URL service (see [Software Distribution](https://experienceleague.adobe.com/docs/experience-manager-65/administering/contentmanagement/package-manager.html?lang=en#software-distribution) for more details).

---

**Source:**

https://experienceleague.adobe.com/docs/experience-manager-dispatcher/using/configuring/dispatcher-configuration.html?lang=en#enabling-access-to-vanity-urls-vanity-urls
