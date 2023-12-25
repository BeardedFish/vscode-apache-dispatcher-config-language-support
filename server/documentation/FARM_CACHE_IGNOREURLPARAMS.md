The `ignoreUrlParams` section defines which URL parameters are ignored when determining whether a page is cached or delivered from cache:
- When a request URL contains parameters that are all ignored, the page is cached.
- When a request URL contains one or more parameters that are not ignored, the page is not cached.

When a parameter is ignored for a page, the page is cached the first time that the page is requested. Subsequent requests for the page are served the cached page, regardless of the value of the parameter in the request.

It is recommended that you configure the `ignoreUrlParams` setting in an allowlist manner. As such, all query parameters are ignored and only known or expected query parameters are exempt ("denied") from being ignored. For more details and examples, see [this page](https://github.com/adobe/aem-dispatcher-optimizer-tool/blob/main/docs/Rules.md#dot---the-dispatcher-publish-farm-cache-should-have-its-ignoreurlparams-rules-configured-in-an-allow-list-manner).

To specify which parameters are ignored, add glob rules to the `ignoreUrlParams` property:
- To cache a page despite the request containing a URL parameter, create a glob property that allows the parameter (to be ignored).
- To prevent the page from being cached, create a glob property that denies the parameter (to be ignored).

When configuring the glob property, it should match the query parameter name. For example, if you want to ignore the `p1` parameter from the following URL http://example.com/path/test.html?p1=test&p2=v2, then the glob property should be:

```
/0002 { /glob "p1" /type "allow" }
```

The following example causes Dispatcher to ignore all parameters, except the `nocache` parameter. As such, request URLs that include the nocache parameter are never cached by the Dispatcher:

```
/ignoreUrlParams {
    # Allow the URL parameter `nocache` to bypass Dispatcher on every request
    /0001 { /glob "nocache" /type "deny" }
    # All other url parameters are ignored by dispatcher and requests are cached
    /0002 { /glob "*" /type "allow" }
}
```

In the context of the `ignoreUrlParams` configuration example above, the following HTTP request causes the page to be cached because the `willbecached` parameter is ignored:

> GET /mypage.html?willbecached=true

In the context of the ignoreUrlParams configuration example, the following HTTP request causes the page to not be cached because the nocache parameter is not ignored:

> GET /mypage.html?nocache=true
> GET /mypage.html?nocache=true&willbecached=true

For information about glob properties, see [Designing Patterns for glob Properties](https://experienceleague.adobe.com/docs/experience-manager-dispatcher/using/configuring/dispatcher-configuration.html?lang=en#designing-patterns-for-glob-properties).

---

[Source](https://experienceleague.adobe.com/docs/experience-manager-dispatcher/using/configuring/dispatcher-configuration.html?lang=en#ignoring-url-parameters)
