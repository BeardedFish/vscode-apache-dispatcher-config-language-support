Use the `/filter` section to specify the HTTP requests that Dispatcher accepts. All other requests are sent back to the web server with a 404 error code (page not found). If no `/filter` section exists, all requests are accepted.

**NOTE**: Requests for the [statfile](https://experienceleague.adobe.com/docs/experience-manager-dispatcher/using/configuring/dispatcher-configuration.html?lang=en#naming-the-statfile) are always rejected.

**CAUTION**: See the [Dispatcher Security Checklist](https://experienceleague.adobe.com/docs/experience-manager-dispatcher/using/getting-started/security-checklist.html?lang=en) for further considerations when restricting access using Dispatcher. Also, read the [AEM Security Checklist](https://experienceleague.adobe.com/docs/experience-manager-65/administering/security/security-checklist.html?lang=en#security) for additional security details regarding an AEM installation.

The `/filter` section consists of a series of rules that either deny or allow access to content according to patterns in the request-line part of the HTTP request. Use an allowlist strategy for your `/filter` section:
- First, deny access to everything.
- Allow access to content as needed.

**NOTE**: Purge the cache whenever there is any change in the filter rules.

When multiple filters patterns apply to a request, the last applied filter pattern is effective.

---

[Source](https://experienceleague.adobe.com/docs/experience-manager-dispatcher/using/configuring/dispatcher-configuration.html?lang=en#configuring-access-to-content-filter)
