Syndication requests are intended for Dispatcher only, so by default they are not sent to the renderer (for example, an AEM instance).

If necessary, set the `/propagateSyndPost` property to `1` to forward syndication requests to Dispatcher. If set, you must make sure that `POST` requests are not denied in the filter section.

---

**Source:**

https://experienceleague.adobe.com/docs/experience-manager-dispatcher/using/configuring/dispatcher-configuration.html?lang=en#forwarding-syndication-requests-propagatesyndpost
