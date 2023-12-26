The `/homepage` parameter (IIS only) no longer works. Instead, you should use the [IIS URL Rewrite Module](https://learn.microsoft.com/en-us/iis/extensions/url-rewrite-module/using-the-url-rewrite-module).

If you are using Apache, you should use the `mod_rewrite` module. See the Apache web site documentation for information about `mod_rewrite` (for example, [Apache 2.4](https://httpd.apache.org/docs/current/mod/mod_rewrite.html)). When using `mod_rewrite`, it is advisable to use the flag `passthrough|PT` (pass through to next handler) to force the rewrite engine to set the `uri` field of the internal `request_rec` structure to the value of the file name field.

---

[Source](https://experienceleague.adobe.com/docs/experience-manager-dispatcher/using/configuring/dispatcher-configuration.html?lang=en#specify-a-default-page-iis-only-homepage)
